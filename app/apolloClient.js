import { ApolloClient } from 'apollo-client'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'

module.exports = () => {
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_URL
  })

  const wsLink = new WebSocketLink({
    uri: process.env.GRAPHQL_URL_WS,
    options: {
      reconnect: true
    }
  })

  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )

  const link = ApolloLink.from([terminatingLink])

  const cache = new InMemoryCache()
  return new ApolloClient({
    link,
    cache
  })
}
