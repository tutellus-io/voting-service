import React from 'react'

import {
  Notification
} from 'react-bulma-components'

import Section from './Section'

const Error = () => (
  <Section>
    <Notification color='danger'>Ups! Hubo un problema, inténtalo de nuevo</Notification>
  </Section>
)

export default Error
