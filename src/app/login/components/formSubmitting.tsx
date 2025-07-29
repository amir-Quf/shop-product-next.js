"use client";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import axios from "axios";
import { IUserData } from "@/app/register/components/FormRegister";
import Swal from "sweetalert2";
import { validationSchemaLoginUser } from "@/validations/validationSchema";
import useUserData from "@/zustand/userData/userData";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie'
const FormSubmitting = () => {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const {setUser} = useUserData()
    const form = useFormik({
      initialValues: {userInformation : '', password : ''},
      onSubmit: async (values, {setSubmitting, resetForm}) => {
        try{
          const {data} : {data : IUserData[]} = await axios.get('http://localhost:4000/users')
          const isUser = data.find(user => {
            if(user.username === values.userInformation || user.phone === values.userInformation || user.email === values.userInformation){
                return user
            }
          })
          if (isUser) {
            if(isUser.password === values.password){
              Swal.fire({
                title: 'Login was successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              const response = {
                token: `Token${isUser.username}`,
                expire: 7
              }
              Cookie.set('token', response.token, {expires: response.expire})
              resetForm()
              setUser(isUser)
              setTimeout(() => {
                router.push('/store')
              }, 500);
            } else {
              Swal.fire({
                title: 'password does not match.',
                icon: 'error'
              })
            }
          }else {
            Swal.fire({
              title: 'There is no user with this information.',
              icon: 'error'
            })
          }
        }
        catch (err) {
          Swal.fire({
            title: `the operation encountered an error ${err}`,
            icon: 'error'
          })
        }
        finally {
          setSubmitting(false)
        }
      },
      validationSchema : validationSchemaLoginUser,
    })
  return (
        <form onSubmit={form.handleSubmit} className='flex justify-center gap-2 flex-col max-w-sm p-5 m-auto shadow-xl bg-blue-200' bindsubmit="">
            <label className="font-bold" htmlFor=""> phone or username or email :</label>
            <input type="text" name='userInformation' value={form.values.userInformation} onChange={form.handleChange} onBlur={form.handleBlur} className='rounded bg-white p-2 focus:outline-0 ' placeholder='phone number, username, email...'/>
            {form.errors.userInformation ? <p className="font-bold text-red-500">{form.errors.userInformation && form.touched.userInformation && form.errors.userInformation}</p> : ''}
            <label className="font-bold" htmlFor="">password : </label>
            <div className="rounded bg-white flex items-center justify-between">
              <input type={showPassword ? 'text' : 'password'} name='password' value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} className='p-2 focus:outline-0 w-full' placeholder='please enter password...'/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="mr-3 font-bold text-xl">{showPassword ? <FaEye/> : <FaEyeSlash/>}</button>
            </div>
              {form.errors.password ? <p className="font-bold text-red-500">{form.errors.password && form.touched.password && form.errors.password}</p> : ''}
            <button className='bg-emerald-500 rounded py-2 mt-5 text-white shadow shadow-emerald-700'>Login</button>
            <p className="mt-2 text-center">you don`t hav an account ? <Link className="font-bold text-blue-700" href='/register'>Sing up</Link></p>
            <Link className="font-bold text-blue-700 mt-2 text-center" href='/login/forget-password'>Forget a password</Link>
        </form>
  )
}

export default FormSubmitting
