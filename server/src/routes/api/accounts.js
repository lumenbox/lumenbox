const pick = require('lodash/pick')
const changeCase = require('change-case-object')

const prepareAccount = account =>
  changeCase.camelCase(
    pick(account, ['id', 'account', 'name', 'domain_id', 'memo', 'memo_type', 'signature', 'rev_signature'])
  )
const sendAccount = (res, account) =>
  res.status(200).send({
    account: prepareAccount(account)
  })
const values = (object, ...keys) => keys.map(key => object[key])

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

  app
    .route('/api/account/:id')
    .get(authorise, (req, res) => {
      pool.query(
        'select * from "account" where user_id = $1 && id = $2',
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
    .post(authorise, verifyDomain, (req, res) => {
      const execPost = () => {
        const params = req.domain.system
          ? [...values(req.body, 'account', 'name', 'domainId', 'memo', 'memoType'), '', '', req.user.id]
          : [
              ...values(req.body, 'account', 'name', 'domainId', 'memo', 'memoType', 'signature', 'revSignature'),
              req.user.id
            ]
        pool.query(
          'insert into "account" (account, name, domain_id, memo, memo_type, signature, rev_signature, user_id) ' +
            'values ($1, $2, $3, $4, $5, $6) returning *',
          params,
          (err, result) => {
            if (err) {
              console.error('failed to add account', err)
              return res.status(500).send({ error: 'Unxpected Error' })
            }
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
    .put(authorise, verifyDomain, (req, res) => {
      const params = req.domain.system
        ? [...values(req.body, 'id', 'account', 'name', 'domainId', 'memo', 'memoType'), '', '', req.user.id]
        : [
            ...values(req.body, 'id', 'account', 'name', 'domainId', 'memo', 'memoType', 'signature', 'revSignature'),
            req.user.id
          ]
      pool.query(
        'update "account" ' +
          'set account = $2, name = $3, domain_id = $4, memo = $5, ' +
          'memo_type = $6, signature = $7, rev_signature = $8) ' +
          'where user_id = $9 && id = $1',
        params,
        (err, result) => {
          if (err) {
            console.error('failed to update account', err)
            return res.status(500).send({ error: 'Unxpected Error' })
          }
          res.sendStatus(200)
        }
      )
    })
    .delete(authorise, (req, res) => {
      pool.query('delete from "account" where user_id = $1 && id = $2', [req.user.id, req.params.id], (err, result) => {
        if (err) {
          console.error('failed to delete account', err)
          return res.status(500).send({ error: 'Unxpected Error' })
        }
        res.sendStatus(200)
      })
    })
}
