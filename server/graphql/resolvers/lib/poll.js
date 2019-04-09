const { BroadcastedPoll } = require('nem-voting')
const { BlockchainListener, Address } = require('nem-library')

const {
  pubsub,
  TOPICS
} = require('../shared')

const POLLS = {}
let CHAIN_MONITOR

function composeResult (address, options, results) {
  const {
    totalVotes,
    options: resultOptions
  } = results

  const votesOptions = options.map(option => {
    const finded = resultOptions.find(result => result.text === option.text)
    option.votes = finded.votes
    return option
  })

  return {
    address,
    totalVotes,
    options: votesOptions
  }
}

async function getResultFromPoll (poll, suscriptionFn) {
  return poll.getResults().toPromise()
}

function composePollInfo (poll, results) {
  const {
    address: {
      value: address
    },
    data: {
      formData: {
        title,
        doe
      },
      description
    },
    optionAddresses: pollOptions
  } = poll

  const options = Object.keys(pollOptions).map(key => {
    const address = pollOptions[key]
    return {
      text: key,
      address: address.value
    }
  })

  return {
    address,
    title,
    doe,
    description,
    options,
    results: composeResult(address, options, results)
  }
}

const getPollFromCache = address => POLLS[address] || {}

const savePollToCache = (address, poll) => {
  POLLS[address] = poll
}

const alreadyObserved = address => POLLS.hasOwnProperty(address)

const observePoll = async (address) => {
  if (alreadyObserved(address)) {
    return
  }

  const pollAddress = new Address(address)
  const poll = await BroadcastedPoll.fromAddressPromise(pollAddress)

  savePollToCache(address, poll)
  monitorizeChain()
}

const monitorizeChain = () => {
  if (CHAIN_MONITOR) {
    return
  }

  const blockchainListener = new BlockchainListener()
  blockchainListener.newBlock()
    .subscribe(async block => {
      console.error('- New BLOCK', block.height)
      await Promise.all(Object.keys(POLLS).map(address => {
        const cachedPoll = POLLS[address]
        return getResultFromPoll(cachedPoll)
          .then(results => {
            const pollInfo = composePollInfo(cachedPoll, results)
            pubsub.publish(TOPICS.RESULTS, { 'getResults': pollInfo.results })
          })
      }))
    }, err => {
      console.error('- New BLOCK', err)
    })

  CHAIN_MONITOR = blockchainListener
}

module.exports = {
  observePoll,

  getPollInfo: async (address) => {
    if (!alreadyObserved(address)) {
      await observePoll(address)
    }
    const cached = getPollFromCache(address)
    const results = await getResultFromPoll(cached)

    const pollInfo = composePollInfo(cached, results)

    pubsub.publish(TOPICS.RESULTS, { 'getResults': pollInfo.results })

    return pollInfo
  }
}
