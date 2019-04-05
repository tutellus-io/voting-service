import React from 'react'
import styled from 'styled-components'

import {
  Container,
  Hero,
  Heading
} from 'react-bulma-components'

const MyHero = styled(({ children, ...props }) =>
  <Hero {...props}>
    <Container>
      <Hero.Body>
        <Heading
          className='hero_title'
          spaced
          renderAs='h1'
          size={1}
        >
          {children}
        </Heading>
      </Hero.Body>
    </Container>
  </Hero>
)`
  background: url(//lib.tutellus.com/masterbc/bc.jpg);
  background-size: cover;

  & .hero_title {
    text-shadow: rgba(0, 0, 0, 0.6) 0px 0px 9px;
    text-align: center;
  }
`

export default MyHero
