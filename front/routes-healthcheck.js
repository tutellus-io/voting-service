const express = require('express')
const axios = require('axios')

const router = express.Router()

module.exports = router

router.get('/_healthcheck', (req, res) => {
  const graphqlUrl = req.query.graphql || process.env.GRAPHQL_URL
  axios
    .post(graphqlUrl, {
      query: `
        query HEALTHCHECK_QUERY {
          __schema {
            types {
              name
            }
          }
        }
      `
    })
    .then(() => {
      res.json({ health: 'OK' })
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})
