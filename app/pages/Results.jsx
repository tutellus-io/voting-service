import React from 'react'
import Helmet from 'react-helmet-async'

import Hero from '../components/Hero'
import PollInfo, {PollVotes} from '../components/Poll'

const Results = () => (
  <>
    <Helmet>
      <title>Resultados | dAPP de votación de Tutellus</title>
    </Helmet>
    <Hero color='primary' size='medium'>
      Resultados Demo Day
    </Hero>
    <PollInfo renderAs={PollVotes} />
  </>
)

export default Results
