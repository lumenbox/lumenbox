const pick = require('lodash/pick')
const changeCase = require('change-case-object')

const prepareDomain = domain => changeCase.camelCase(pick(domain, ['id', 'domain', 'limit', 'system']))
const sendDomain = (res, domain) =>
  res.status(200).send({
    domain: prepareDomain(domain)
  })

module.exports = ({ app, pool, config, authorise }) => {
  app.get('/api/domains', authorise, (req, res) => {
    pool.query('select * from "domain" where user_id = $1 or system = true', [req.user.id], (err, result) => {
      if (err) {
        console.error('failed to get domains', err)
        return res.status(500).send({ error: 'Unxpected Error' })
      }
      const domains = result.rows.map(prepareDomain)
      res.send({ domains })
    })
  })

  app
    .route('/api/domain/:id')
    .get(authorise, (req, res) => {
      pool.query(
        'select * from "domain" where (user_id = $1 or system = true) and id = $2',
        [req.user.id, req.params.id],
        (err, result) => {
          if (err) {
            console.error('failed to get domain', err)
            return res.status(500).send({ error: 'Unxpected Error' })
          }
          sendDomain(res, result.rows[0])
        }
      )
    })
    .post(authorise, (req, res) => {
      const execPost = () =>
        pool.query(
          'insert into "domain" (domain, user_id) values ($1, $2) returning *',
          [req.body.domain, req.user.id],
          (err, result) => {
            if (err) {
              console.error('failed to add domain', err)
              return res.status(500).send({ error: 'Unxpected Error' })
            }
            sendDomain(res, result.rows[0])
          }
        )
      if (req.user.limit > 0) {
        pool.query('select count(*) as count from "domain" where user_id = $1', [req.user.id], (err, result) => {
          if (err) {
            console.error('failed to add domain', err)
            return res.status(500).send({ error: 'Unxpected Error' })
          }
          if (result.rows[0].count >= req.user.limit) {
            return res.status(400).send({ error: 'limit exceeded' })
          }
          execPost()
        })
      } else {
        execPost()
      }
    })
    .put(authorise, (req, res) => {
      pool.query(
        'update "domain" set domain = $1 where user_id = $2 and id = $3',
        [req.body.domain, req.user.id, req.params.id],
        (err, result) => {
          if (err) {
            console.error('failed to update domain', err)
            return res.status(500).send({ error: 'Unxpected Error' })
          }
          res.sendStatus(200)
        }
      )
    })
    .delete(authorise, (req, res) => {
      pool.query('delete from "domain" where user_id = $1 and id = $2', [req.user.id, req.params.id], (err, result) => {
        if (err) {
          console.error('failed to delete domain', err)
          return res.status(500).send({ error: 'Unxpected Error' })
        }
        res.sendStatus(200)
      })
    })
}
