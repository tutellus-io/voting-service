import React from 'react'
import { render } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import 'core-js/fn/object/assign'
import 'core-js/es6/promise'
import 'core-js/es6/set'
import 'core-js/es6/map'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import '@mdi/font/css/materialdesignicons.min.css'

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App'
import { GlobalStyles } from './styles'

// const client = new ApolloClient({ uri: process.env.GRAPHQL_URL })
const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL,
});

const wsLink = new WebSocketLink({
  uri: process.env.GRAPHQL_URL_WS,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

const app = (
  <ApolloProvider client={client} >
    <HelmetProvider>
      <BrowserRouter>
        <>
          <GlobalStyles />
          <App />
        </>
      </BrowserRouter>
    </HelmetProvider>
  </ApolloProvider>
)

render(app, document.getElementById('app'))

// Enable Hot Module Reloading
if (module.hot) {
  module.hot.accept()
}
