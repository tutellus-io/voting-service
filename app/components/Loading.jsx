import React from 'react'

import {
  Progress
} from 'react-bulma-components'

import Section from './Section'

const Loading = () => (
  <Section>
    <Progress max={100} color='info' size='medium' />
  </Section>
)

export default Loading
