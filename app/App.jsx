import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import importComponent from 'react-imported-component';

import Header from './components/Header'
import Home from './pages/Home'
import Loading from './components/Loading'
import Error from './components/Error'

const Signup = importComponent(() => import('./pages/Signup'), {
  Loading,
  Error
});

const Poll = importComponent(() => import('./pages/Poll'), {
  Loading,
  Error
});

const Results = importComponent(() => import('./pages/Results'), {
  Loading,
  Error
});

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' render={() => <Signup />} />
      <Route exact path='/poll' render={() => <Poll />} />
      <Route exact path='/results' render={() => <Results />} />
      <Redirect to='/' />
    </Switch>
  </>
)

export default App
