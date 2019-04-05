const Mailchimp = require('mailchimp-api-v3')

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)
const DEFAULT_LIST = process.env.MAILCHIMP_LIST

module.exports = {
  addMember: async ({
    listId = DEFAULT_LIST,
    email,
    address
  }) => {
    return mailchimp.post({
      path: `/lists/${listId}/members`,
      body: {
        email_address: email,
        merge_fields: {
          NEMADDR: address
        },
        status: 'subscribed'
      }
    })
      .catch(() => {
        return {
          statusCode: -200
        }
      })
  }
}
