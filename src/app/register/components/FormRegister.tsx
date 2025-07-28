"use client";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import axios from "axios";
import { IOrders } from "@/app/dashboard/orders/page";
import Swal from "sweetalert2";
import { validationSchemaRegisterUser } from "@/validations/validationSchema";

export interface IUserData {
  id: string,
  password: string,
  email: string,
  address: string,
  username: string,
  phone: string,
  orders: IOrders[],
}

const FormRegister = () => {
    const [showPassword, setShowPassword] = useState(false)
    const form = useFormik({
      initialValues : {username: '',phone: '09',password: '',confirmPassword: ''},
      onSubmit: async (values, {setSubmitting,resetForm}) => {
        const newUser = {
          username: values.username,
          phone: values.phone,
          password: values.password,
          email: '',
          address: '',
          orders: [],
        }
        try{
          const {data} : {data : IUserData[]} = await axios.get('http://localhost:4000/users')
          data.map(user => {
            if(newUser.username === user.username){
              Swal.fire({
                title: 'A user with this username already exists',
                icon: 'error',
              }) 
            }else if(newUser.phone === user.phone){
              Swal.fire({
                title: 'A user with this phone number already exists',
                icon: 'error',
              })
            }else{
              axios.post('http://localhost:4000/users',newUser)
              Swal.fire({
                title: 'an account registered successfully',
                icon: 'success',
              })
              resetForm()
            }
          })
        } 
        catch (err) {
          Swal.fire({
            title: `registering encountered an error : ${err}`,
            icon: 'error'
          })
        }
        finally {
          setSubmitting(false)
        }
      },
      validationSchema : validationSchemaRegisterUser,
    })
  return (
    <form onSubmit={form.handleSubmit} className='flex justify-center gap-2 flex-col max-w-sm p-10 m-auto shadow-xl rounded bg-blue-300' bindsubmit="">
      <label className="font-bold" htmlFor="username">Username : </label>
        <input type="text" name='username' value={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} className='rounded bg-white p-2 focus:outline-0' placeholder='please enter username...'/>
        {form.errors.username ? <p className="font-bold text-red-500">{form.errors.username && form.touched.username && form.errors.username}</p> : ''}
      <label className="font-bold" htmlFor="phone number">Phone number : </label>
        <input type="text" name='phone' value={form.values.phone} onChange={form.handleChange} onBlur={form.handleBlur} className='rounded bg-white p-2 focus:outline-0' placeholder='please enter phone number...'/>
        {form.errors.phone ? <p className="font-bold text-red-500">{form.errors.phone && form.touched.phone && form.errors.phone}</p> : ''}
      <label className="font-bold" htmlFor="">Password : </label>
        <div className="rounded bg-white flex items-center justify-between">
            <input type={showPassword ? 'text' : 'password'} name='password' value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} className='p-2 focus:outline-0 w-full' placeholder='please enter password...'/>
            <button onClick={() => setShowPassword(!showPassword)} className="mr-3 font-bold text-xl">{showPassword ? <FaEye/> : <FaEyeSlash/>}</button>
        </div>
        {form.errors.password ? <p className="font-bold text-red-500">{form.errors.password && form.touched.password && form.errors.password}</p> : ''}
      <label className="font-bold" htmlFor="">Confirm password</label>
        <div className="rounded bg-white flex items-center justify-between">
            <input type={showPassword ? 'text' : 'password'} name='confirmPassword' value={form.values.confirmPassword} onChange={form.handleChange} onBlur={form.handleBlur} className='p-2 focus:outline-0 w-full' placeholder='please enter confirm password...'/>
            <button onClick={() => setShowPassword(!showPassword)} className="mr-3 font-bold text-xl">{showPassword ? <FaEye/> : <FaEyeSlash/>}</button>
        </div>
        {form.errors.confirmPassword ? <p className="font-bold text-red-500">{form.errors.confirmPassword && form.touched.confirmPassword && form.errors.confirmPassword}</p> : ''}
        <button className="bg-emerald-500 p-2 rounded mt-5 text-white font-bold">Sign up</button>
        <p className="mt-2 text-center">you have an account ? <Link href='/login' className="font-bold text-blue-700">Login</Link></p>
    </form>
  )
}

export default FormRegister
