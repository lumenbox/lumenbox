const sendMail = require('../../sendMail')
const accountCreated = require('../../mail/accountCreated')
const accountUpdated = require('../../mail/accountUpdated')
const accountDeleted = require('../../mail/accountDeleted')
const pick = require('lodash/pick')
const changeCase = require('change-case-object')
const StrKey = require('stellar-base/lib/strkey').StrKey

const prepareAccount = account =>
  changeCase.camelCase(pick(account, ['id', 'account', 'name', 'domain_id', 'memo', 'memo_type', 'signature']))

const sendAccount = (res, account) =>
  res.status(200).send({
    account: prepareAccount(account)
  })

const values = (object, ...keys) => keys.map(key => object[key])

const validateAccount = (req, res, next) => {
  const account = req.body
  if (
    !/^[a-z0-9.@-]{4,32}$/.test(account.name) ||
    !StrKey.isValidEd25519PublicKey(account.account) ||
    !account.domainId ||
    typeof account.memo !== 'string' ||
    typeof account.memoType !== 'string'
  ) {
    return res.sendStatus(400)
  }
  next()
}

module.exports = ({ app, pool, config, authorise }) => {
  const verifyDomain = (req, res, next) =>
    pool.query('select * from "domain" where id = $1', [req.body.domainId], (err, result) => {
      if (err) {
        console.error('failed to lookup domain', err)
        return res.status(500).send({ error: 'Unxpected Error' })
      }
      const domain = changeCase.camelCase(result.rows[0])
      if (!result.rows[0] || (!domain.system && domain.userId !== req.user.id)) {
        console.warn('attemping to lookup unauthorised domain')
        return res.sendStatus(401)
      }
      req.domain = domain
      next()
    })

  app.get('/api/accounts', authorise, (req, res) => {
    pool.query('select * from "account" where user_id = $1', [req.user.id], (err, result) => {
      if (err) {
        console.error('failed to get accounts', err)
        return res.status(500).send({ error: 'Unxpected Error' })
      }
      const accounts = result.rows.map(prepareAccount)
      res.send({ accounts })
    })
  })

  app.post('/api/verify-account', authorise, verifyDomain, (req, res) => {
    pool.query(
      `select count(*) as count from "account" where name like $1 and domain_id = $2${
        req.body.accountId ? ' and id <> $3' : ''
      }`,
      req.body.accountId ? [req.body.name, req.body.domainId, req.body.accountId] : [req.body.name, req.body.domainId],
      (err, result) => {
        if (err) {
          console.error('failed to verify account', err)
          return res.status(500).send({ error: 'Unxpected Error' })
        }
        res.sendStatus(result.rows[0].count > 0 ? 200 : 404)
      }
    )
  })

  app.post('/api/account', authorise, verifyDomain, validateAccount, (req, res) => {
    const execPost = () => {
      const params = req.domain.system
        ? [...values(req.body, 'account', 'name', 'domainId', 'memo', 'memoType'), '', req.user.id]
        : [...values(req.body, 'account', 'name', 'domainId', 'memo', 'memoType', 'signature'), req.user.id]
      pool.query(
        'insert into "account" (account, name, domain_id, memo, memo_type, signature, user_id) ' +
          'values ($1, $2, $3, $4, $5, $6, $7) returning *',
        params,
        (err, result) => {
          if (err) {
            console.error('failed to add account', err)
            return res.status(500).send({ error: 'Unxpected Error' })
          }
          sendMail(req.user, accountCreated, { system: req.domain.system, domain: req.domain.domain, ...req.body })
          sendAccount(res, result.rows[0])
        }
      )
    }
    if (req.domain.limit > 0) {
      pool.query('select count(*) as count from "account" where user_id = $1', [req.user.id], (err, result) => {
        if (err) {
          console.error('failed to add account', err)
          return res.status(500).send({ error: 'Unxpected Error' })
        }
        if (result.rows[0].count >= req.domain.limit) {
          return res.status(400).send({ error: 'limit exceeded' })
        }
        execPost()
      })
    } else {
      execPost()
    }
  })

  app
    .route('/api/account/:id')
    .get(authorise, (req, res) => {
      pool.query(
        'select * from "account" where user_id = $1 and id = $2',
        [req.user.id, req.params.id],
        (err, result) => {
          if (err) {
            console.error('failed to get account', err)
            return res.status(500).send({ error: 'Unxpected Error' })
          }
          sendAccount(res, result.rows[0])
        }
      )
    })
    .put(authorise, verifyDomain, validateAccount, (req, res) => {
      const memo = req.body.memoType.length > 0 ? req.body.memo : ''
      const params = req.domain.system
        ? [...values(req.body, 'id', 'account', 'name', 'domainId', 'memoType'), '', memo, req.user.id]
        : [...values(req.body, 'id', 'account', 'name', 'domainId', 'memoType', 'signature'), memo, req.user.id]
      pool.query(
        'update "account" ' +
          'set "account" = $2, name = $3, domain_id = $4, memo_type = $5, signature = $6, memo = $7, updated_at = now() ' +
          'where user_id = $8 and id = $1',
        params,
        (err, result) => {
          if (err) {
            console.error('failed to update account', err)
            return res.status(500).send({ error: 'Unxpected Error' })
          }
          sendMail(req.user, accountUpdated, { system: req.domain.system, domain: req.domain.domain, ...req.body })
          res.sendStatus(200)
        }
      )
    })
    .delete(authorise, (req, res) => {
      pool.query(
        'select "account".name, "account"."account", domain.domain from "account", domain ' +
          'where "account".domain_id = domain.id and "account".user_id = $1 and "account".id = $2',
        [req.user.id, req.params.id],
        (err, result) => {
          if (err) {
            console.error('failed to delete account', err)
            return res.status(500).send({ error: 'Unxpected Error' })
          }
          const account = result.rows[0]
          pool.query(
            'delete from "account" where user_id = $1 and id = $2',
            [req.user.id, req.params.id],
            (err, result) => {
              if (err) {
                console.error('failed to delete account', err)
                return res.status(500).send({ error: 'Unxpected Error' })
              }
              sendMail(req.user, accountDeleted, account)
              res.sendStatus(200)
            }
          )
        }
      )
    })
}
