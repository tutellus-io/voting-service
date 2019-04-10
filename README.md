# Voting Service: voting over the NEM blockchain

Project used in the Tutellus Demo Day of the “Master in Blockchain” program to
facilitate the use of a public blockchain (NEM) and select the winner projects
between the public, in a democratic and decentralized way.

## Configuration

Before launching the project copy `env.sample` to `.env`, where we will indicate
all project variables.

The most important variables are:

* **ORIGIN_ADDRESS_PK**: Private key of the NEM account that will make the transfers
* **MAILCHIMP_LIST**: Mailchimp list identifier,registered users will be added
* **MAILCHIMP_API_KEY**: Valid Mailchimp API
* **POLL_ADDRESS**: Poll address displayed
* **VALID_NEM_ADDRESS_PREFIX**: Prefix of the NEM address T or N. Depends on
whether we are working with TESTnet or MAINnet. (highly improvable)

In Development: `npm run dev`

In production: `npm run build && npm run start`
