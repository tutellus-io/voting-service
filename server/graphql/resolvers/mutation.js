const libtransfer = require('./lib/transfer')
const libmail = require('./lib/mailchimp')

const transferDone = (result = {}) => result.message === 'SUCCESS'
const mailDone = (result = {}) =>
  result.statusCode === 200 || result.statusCode === -200

module.exports = {
  addAttendee: async (parent, { email, address }, context, info) => {
    const [ transfered, registered ] = await Promise.all([
      libtransfer.transfer({ address }),
      libmail.addMember({ email, address })
    ])

    if (!transferDone(transfered)) {
      throw new Error('Transfer NOT Done')
    }
    if (!mailDone(registered)) {
      throw new Error('Mailchimp NOT Done')
    }

    return true
  }
}
