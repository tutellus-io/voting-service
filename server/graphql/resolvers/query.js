const libpoll = require('./lib/poll')

module.exports = {
  getPoll: async (parent, { address }, context, info) =>
    libpoll.getPoll(address),
  getPollWithResults: async (parent, { address }, context, info) =>
    libpoll.getPollWithResults(address)
}
