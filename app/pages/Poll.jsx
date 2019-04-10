import React from 'react'
import Helmet from 'react-helmet-async'

import PollInfo from '../components/Poll'

const Poll = () => (
  <>
    <Helmet>
      <title>Votación | dAPP de votación de Tutellus</title>
    </Helmet>
    <PollInfo />
  </>
)

export default Poll
