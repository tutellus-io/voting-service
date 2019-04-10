import React from 'react'
import Helmet from 'react-helmet-async'

import PollInfo from '../components/Poll'

const Poll = () => (
  <>
    <Helmet>
      <title>Votación Demo Day</title>
    </Helmet>
    <PollInfo />
  </>
)

export default Poll
