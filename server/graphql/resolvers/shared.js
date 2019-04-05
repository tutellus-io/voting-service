const { PubSub } = require('apollo-server-express')
const pubsub = new PubSub()
const TOPICS = {
  'RESULTS': 'RESULTS'
}

module.exports = {
  pubsub,
  TOPICS
}
