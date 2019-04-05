import React from 'react'
import styled from 'styled-components'

import {
  Section,
  Container
} from 'react-bulma-components'

const MySection = styled(({ className, children }) => (
  <Section className={className}>
    <Container>
      {children}
    </Container>
  </Section>
))`
  padding: 1rem;
  margin: 2rem 0.5rem;
`

export default MySection
