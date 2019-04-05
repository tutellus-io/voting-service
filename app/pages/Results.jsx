import React from 'react'
import Helmet from 'react-helmet-async'

import Hero from '../components/Hero'
import Section from '../components/Section'

const Results = () => (
  <>
    <Helmet>
      <title>Results Page</title>
    </Helmet>
    <Hero color='primary' size='medium'>
      Results Pages
    </Hero>
    <Section>
      Results
    </Section>
  </>
)

export default Results
