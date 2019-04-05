import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import * as yup from 'yup'
import NEM from 'nem-sdk'

import {
  Form,
  Button,
  Notification
} from 'react-bulma-components'

import useForm from './useForm'

yup.addMethod(yup.string, 'nemAddress', function (prefix, message) {
  return this.test('nemAddress', message, value => {
    return NEM.model.address.isValid(value) && value.startsWith(prefix)
  })
})

const ADD_ATTENDEE_MUTATION = gql`
  mutation ADD_ATTENDEE_MUTATION($email: String!, $address: String!) {
    addAttendee(email: $email, address: $address)
  }
`

const NEM_PREFIX = process.env.VALID_NEM_ADDRESS_PREFIX

const MyForm = () => {
  const { values, errors, success, assignCallback, handleChange, handleSubmit } = useForm({
    email: '',
    address: '',
    termsAccepted: false
  }, values => {
    const schema = yup.object({
      email: yup.string()
        .required('Escribe tu email')
        .email('Escribe un email válido'),
      address: yup.string()
        .required('Escribe tu NEM address')
        .nemAddress(NEM_PREFIX, 'Escribe una NEM Address válida'),
      termsAccepted: yup.boolean().oneOf([true], 'Debes aceptar los Términos y Condiciones')
    })

    return schema
      .validate(values, { abortEarly: false })
      .then(() => ({}))
      .catch(errors => {
        return errors.inner.reduce((acu, item) => {
          if (!acu[item.path]) {
            acu[item.path] = item.message
          }
          return acu
        }, {})
      })
  })

  return (
    <Mutation mutation={ADD_ATTENDEE_MUTATION} variables={values}>
      {(addAttendee, status) => {
        assignCallback(addAttendee)
        return (
          <BasicForm {...status}
            values={values}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            success={success}
          />
        )
      }}
    </Mutation>
  )
}

const BasicForm = styled(({ className, success, onChange, onSubmit, errors, values, loading, error }) => {
  return (
    <div className={className}>
      <Form.Field>
        <Form.Label size='medium'>E-mail</Form.Label>
        <Form.Control>
          <Form.Input
            onChange={onChange}
            name='email'
            type='email'
            placeholder='E-mail'
            value={values.email}
            size='large'
          />
        </Form.Control>
        {errors.email && <Form.Help color='danger'>{errors.email}</Form.Help>}
      </Form.Field>
      <Form.Field>
        <Form.Label>NEM Address</Form.Label>
        <Form.Control>
          <Form.Input
            onChange={onChange}
            name='address'
            type='text'
            placeholder='NEM Address'
            value={values.address}
            size='large'
          />
        </Form.Control>
        {errors.address && <Form.Help color='danger'>{errors.address}</Form.Help>}
      </Form.Field>
      <Form.Field>
        <Form.Control className='form-checkbox'>
          <Form.Checkbox name='termsAccepted' onChange={onChange} checked={values.termsAccepted}>
            Acepto los <a href='#' target='_blank'>Términos y condiciones</a>
          </Form.Checkbox>
        </Form.Control>
        {errors.termsAccepted && <Form.Help color='danger'>{errors.termsAccepted}</Form.Help>}
      </Form.Field>
      <Form.Field>
        <Form.Control className='form-buttons'>
          <Button size='large' color='primary' loading={loading}
            onClick={() => {
              onSubmit()
              return false
            }}
          >
            Enviar
          </Button>
        </Form.Control>
      </Form.Field>
      {error && <Notification color='danger'>Ups! Hubo un problema, inténtalo de nuevo</Notification>}
      {success && <Notification color='success'>Registro realizado, XEM enviado, listo para votar </Notification>}
    </div>
  )
})`
  & .field {
    margin-bottom: 1.5rem
  }

  & .label {
    font-size: 1.7rem;
    font-weight: 400;
  }

  & .form-buttons {
    text-align: right;
  }

  & .button {
    font-weight: 700;
    text-transform: uppercase;
  }

  & .help {
    font-size: 1.25rem;
  }

  & pre {
    font-size: 1rem;
  }

  & .form-checkbox {
    font-size: 1.7rem;
    & input {
      margin: 0 .5rem 0 0;
    }
  }

`

export default MyForm
