import { useState, useEffect } from 'react'

const useForm = (defaultValues = {}, validate) => {
  const [values, setValues] = useState(defaultValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  let callback = values => {
    console.log('NOT asigned callback', values)
  }

  // TODO Monitorize values for update... cuando haya errores
  // useEffect(() => {
  //   if (values === defaultValues) {
  //     internalValidation()
  //   }
  // }, [values])

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      try {
        Promise.resolve(callback(values))
          .then(() => {
            setSuccess(true)
            setTimeout(() =>
              setSuccess(false)
            , 10000)
            setValues(defaultValues)
          })
      } catch (err) {
        // console.log('Controlamos el error')
      }
    } else {
      setIsSubmitting(false)
    }
  }, [errors])

  const assignCallback = newCallback => { callback = newCallback }

  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
    }
    setIsSubmitting(true)
    return internalValidation()
  }

  const internalValidation = () =>
    Promise.resolve(validate(values))
      .then(errors => {
        setErrors(errors)
      })

  const handleChange = (event) => {
    event.persist()

    const name = event.target.name
    const value = event.target.type === 'checkbox'
      ? event.target.checked
      : event.target.value

    setValues(values => ({ ...values, [name]: value }))
  }

  return {
    handleChange,
    handleSubmit,
    assignCallback,
    values,
    errors,
    success
  }
}

export default useForm
