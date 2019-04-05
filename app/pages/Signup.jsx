import React from 'react'
import Helmet from 'react-helmet-async'
import styled from 'styled-components'

import {
  Columns,
  Heading
} from 'react-bulma-components'

import Section from '../components/Section'
import Form from '../components/Form'
import Hero from '../components/Hero'

const SignupForm = styled(({ className }) =>
  <Section className={className}>
    <Columns breakpoint='mobile'>
      <Columns.Column tablet={{
        size: 'half',
        offset: 'one-quarter'
      }}>
        <Heading className='signup_title'
          spaced
          renderAs='p'
          size={3}
        >
          Déjanos tus datos y te enviamos <b>0.05 XEM</b> para votar por tu proyecto favorito, con el Nanowallet. Solo puedes votar 1 vez (1 voto = 0.05 XEM), si votas más veces tu voto se anula
        </Heading>
        <Form />
      </Columns.Column>
    </Columns>
  </Section>
)`
  & .signup_title {
    line-height: 2.5rem;
    font-weight: 400;
  }
`

const Signup = () => (
  <>
    <Helmet>
      <title>Registro </title>
    </Helmet>
    <Hero color='primary' size='medium'>
      Registro
    </Hero>
    <SignupForm />
  </>
)
export default Signup
