import React from 'react'
import Helmet from 'react-helmet-async'

import Section from '../components/Section'
import PollInfo from '../components/Poll'

const Poll = () => (
  <>
    <Helmet>
      <title>Poll Page</title>
    </Helmet>
    <Section>
      <PollInfo />
    </Section>
  </>
)

export default Poll
