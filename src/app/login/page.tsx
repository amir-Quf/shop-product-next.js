import Container from '@/components/Container'
import React from 'react'
import FormSubmitting from './components/formSubmitting'
const Login = () => {
  return (
    <section>
      <Container>
        <div className='flex items-center justify-center h-[100vh] mt-[-50]'>
        <FormSubmitting/>
        </div>
      </Container>
    </section>
  )
}

export default Login
