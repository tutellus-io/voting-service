const libpoll = require('./lib/poll')

module.exports = {
  getPoll: async (parent, { address }, context, info) =>
    libpoll.getPollInfo(address)
}
