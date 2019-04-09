const { ApolloServer, gql } = require('apollo-server-express')
const { NEMLibrary, NetworkTypes } = require('nem-library')

const Query = require('./resolvers/query')
const Subscription = require('./resolvers/subscription')
const Mutation = require('./resolvers/mutation')

// Initializae NEMLibrary
NEMLibrary.bootstrap(process.env.NODE_ENV === 'production'
  ? NetworkTypes.MAIN_NET
  : NetworkTypes.TEST_NET)

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type PollOptions {
    text: ID!
    address: String!
  }

  type Poll {
    address: ID!
    title: String
    doe: Float
    description: String
    options: [PollOptions!]!
    results: Result
  }

  type ResultOptions {
    text: ID!
    votes: Int!
  }

  type Result {
    address: ID!
    totalVotes: Int!
    options: [ResultOptions!]!
  }

  type Query {
    getPoll(address: ID!): Poll
  }
  type Subscription {
    getResults(address: ID!): Result
  }
  type Mutation {
    addAttendee(email: String!, address: String!): Boolean
  }
`

module.exports = {
  configureGraphQL: () => {
    return new ApolloServer({
      typeDefs,
      resolvers: {
        Query,
        Mutation,
        Subscription
      },
      // directiveResolvers,
      tracing: process.env.NODE_ENV !== 'production',
      engine: process.env.GRAPHQL_ENGINE ? {
        apiKey: process.env.GRAPHQL_ENGINE
      } : false,
      introspection: true,
      context: ({ req, res }) => ({
        req,
        res
      })
    })
  }
}
