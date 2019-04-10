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

import { ApolloProvider } from 'react-apollo'

import App from './App'
import getClient from './apolloClient'
import { GlobalStyles } from './styles'

const app = (
  <ApolloProvider client={getClient()} >
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
