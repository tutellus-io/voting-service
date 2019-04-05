const { BroadcastedPoll } = require('nem-voting')
const { BlockchainListener, Address } = require('nem-library')

const {
  pubsub,
  TOPICS
} = require('../shared')

const POLLS = {}
const RESULTS = {}
let CHAIN_MONITOR

const isEquivalent = (a, b) => {
  // Create arrays of property names

  var aProps = Object.getOwnPropertyNames(a)
  var bProps = Object.getOwnPropertyNames(b)

  // If number of properties is different, objects are not equivalent

  if (aProps.length !== bProps.length) {
    return false
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]

    // If values of same property are not equal, objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false
    }
  }

  // If we made it this far, objects are considered equivalent
  return true
}

function publishResult (poll, results) {
  const {
    address: {
      value: address
    }
  } = poll

  const {
    options
  } = composePollInfo(poll)

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

function getResultFromPoll (poll, suscriptionFn) {
  return poll.getResults()
    .subscribe(results => {
      suscriptionFn(poll, results)
    })
}

function composePollInfo (poll) {
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
    options
  }
}

const getResult = address => RESULTS[address] || {}

const addResult = (address, results) => {
  RESULTS[address] = results
}

const getPollFromCache = address => POLLS[address] || {}

const savePollToCache = (address, poll) => {
  POLLS[address] = poll
}

const alreadyObserved = address => POLLS.hasOwnProperty(address)

const publishPollResults = (force = false) => (poll, results) => {
  const {
    address: {
      value: address
    }
  } = poll

  const resultsNow = publishResult(poll, results)
  if (force || !isEquivalent(resultsNow, getResult(address))) {
    addResult(address, resultsNow)
    pubsub.publish(TOPICS.RESULTS, { 'getResults': resultsNow })
  }
}

const observePoll = async (address) => {
  if (alreadyObserved(address)) {
    return
  }

  const pollAddress = new Address(address)
  const poll = await BroadcastedPoll.fromAddressPromise(pollAddress)

  getResultFromPoll(poll, publishPollResults(false))

  savePollToCache(address, poll)
  monitorizeChain()
}

const monitorizeChain = () => {
  if (CHAIN_MONITOR) {
    return
  }

  const blockchainListener = new BlockchainListener()
  blockchainListener.newBlock()
    .subscribe(block => {
      Object.keys(POLLS).map(address => {
        const cachedPoll = POLLS[address]
        getResultFromPoll(cachedPoll, publishPollResults(false))
      })
    }, err => {
      console.error('- Nem BLOCK', err)
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
    getResultFromPoll(cached, publishPollResults(true))

    return composePollInfo(cached)
  }
}
