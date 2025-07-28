import Container from '@/components/Container'
import React from 'react'
import FormRegister from './components/FormRegister'
const Login = () => {
  return (
    <section>
      <Container>
        <div className='flex items-center justify-center h-[100vh] mt-[-50]'>
        <FormRegister/>
        </div>
      </Container>
    </section>
  )
}

export default Login
