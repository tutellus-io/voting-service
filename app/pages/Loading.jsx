import React from 'react'

import {
  Progress
} from 'react-bulma-components'

import Section from '../components/Section'

const Loading = () => (
  <Section>
    <Progress max={100} color='primary' size='small' />
  </Section>
)

export default Loading
