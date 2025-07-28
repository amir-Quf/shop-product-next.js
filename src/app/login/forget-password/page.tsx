'use client'
import { IUserData } from '@/app/register/components/FormRegister'
import Container from '@/components/Container'
import { validationSchemaForgetPassword } from '@/validations/validationSchema'
import axios from 'axios'
import { useFormik } from 'formik'
import Link from 'next/link'
import React from 'react'
import Swal from 'sweetalert2'

const ForgetPassword = () => {
  const form = useFormik({
    initialValues: {userInformation : ''},
    onSubmit: async (values ,{setSubmitting,resetForm}) => {
      const {data} : {data: IUserData[]} = await axios.get('http://localhost:4000/users')
      const IsUser = data.find(user => {
        if (user.username === values.userInformation || user.phone === values.userInformation || user.email === values.userInformation){
          return user
        }
      })
      if (IsUser) {
        Swal.fire({
          title : `your password is : ${IsUser.password}`,
          icon: 'success'
        })
      } else{
        Swal.fire({
          title: 'There is not user with this information',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    validationSchema : validationSchemaForgetPassword,
  })
  return (
    <div>
      <section>
      <Container>
        <div className='flex items-center justify-center h-[100vh] mt-[-50]'>
        <form onSubmit={form.handleSubmit} className='flex justify-center gap-5 flex-col max-w-md p-5 m-auto shadow-xl bg-blue-200' bindsubmit="">
            <label htmlFor='userInformation' className='font-bold '>email or phone number : </label>
            <input type="text" name='userInformation' value={form.values.userInformation} onChange={form.handleChange} onBlur={form.handleBlur} className='rounded bg-white p-2 focus:outline-0 ' placeholder='phone number or email...'/>
            {form.errors.userInformation ? <p className='font-bold text-red-500'>{form.errors.userInformation && form.touched.userInformation && form.errors.userInformation}</p> : ''}
            <button className='bg-emerald-500 rounded py-2 mt-5 text-white shadow shadow-emerald-700'>Get password</button>
            <p>you have a password ? <Link href='/login' className='font-bold text-blue-700'>Login</Link></p>
            <p>don`t have an account ? <Link href='/register ' className='font-bold text-blue-700'>sign up</Link></p>
        </form>
        </div>
      </Container>
    </section>
    </div>
  )
}

export default ForgetPassword
