const { withFilter } = require('apollo-server-express')

const {
  pubsub,
  TOPICS
} = require('./shared')

module.exports = {
  getResults: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(TOPICS.RESULTS),
      (payload, { address }) => payload.getResults.address === address
    )
  }
}
