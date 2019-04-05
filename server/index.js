require('dotenv').config()

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  process.exit(-1)
})

const path = require('path')
const express = require('express')
const http = require('http')
const helmet = require('helmet')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const { configureGraphQL } = require('./graphql')

const port = process.env.PORT || 4000

const configRegExCors = cors => {
  return cors.split(';').map(regexp => new RegExp(regexp))
}

const corsConfig = {
  origin: configRegExCors(process.env.CORS_ORIGIN),
  credentials: true
}

const app = express()
app.use(compression())
app.use(helmet())
app.use(cors(corsConfig))
app.use(cookieParser())

const server = configureGraphQL()

server.applyMiddleware({ app, cors: corsConfig })

app.use(express.static(path.join(__dirname, '../dist')))
app.use(require('./routes-healthcheck'))
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(port, '0.0.0.0', () =>
  console.log(`🚀 Server ready at http://<IP4>:${port}${server.graphqlPath}`)
)
