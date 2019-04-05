require('dotenv').config()

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  process.exit(-1)
})

const path = require('path')
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const port = process.env.PORT || 1234

express()
  .use(compression())
  .use(helmet())
  .use(express.static(path.join(__dirname, '../dist')))
  .use(require('./routes-healthcheck'))
  .use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
  .listen(port, '0.0.0.0', (err) => {
    if (err) throw err
    console.log(`> Using http://<IPv4>:${port}`)
  })
