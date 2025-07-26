'use client'
import Container from '@/components/Container'
import { validationSchemaAddProduct } from '@/validations/validationSchema'
import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import Swal from 'sweetalert2'

const AddProduct = () => {
  const form = useFormik({
    initialValues : {title: '', image: '', price: 0, discount: 0, desc: ''},
    onSubmit: async (values,{setSubmitting,resetForm}) => {
      const newProduct = {
          id: 1,
          title: values.title,
          image: values.image,
          price: values.price,
          discount: values.discount,
          desc: values.desc
        }
      try {
        const res = await axios.post('http://localhost:4000/products', newProduct)
        if (res) {
          Swal.fire({
            title: 'product registered successfully',
            icon: 'success',
            confirmButtonText: 'ok'
          })
        } else {
          Swal.fire({
            title: `product registration encountered an error`,
            icon: 'error',
            confirmButtonText: 'ok'
          })
        }
        resetForm()
      }
      catch (err) {
        Swal.fire({
          title: `product registration encountered an error : ${err}`,
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
      finally{
        setSubmitting(false)
      }
    },
    validationSchema : validationSchemaAddProduct,
  })
  return (
    <Container>
      <form onSubmit={form.handleSubmit} className='bg-blue-200 grid gap-5 p-10 mt-5'>
        <label htmlFor='title'>product title : </label>
        <input name='title' value={form.values.title} className='bg-white row-span-3 rounded px-2' type="text" placeholder='please enter product title...' onChange={form.handleChange} onBlur={form.handleBlur}/>
        {form.errors.title ? <p className='text-red-500 mt-0 pt-0 text-lg'>{form.errors.title && form.touched.title && form.errors.title}</p> : ''}
        <label htmlFor='image'>product image : </label>
        <input name='image' value={form.values.image} className='bg-white row-span-3 rounded px-2' type="text" placeholder='please enter product image address...' onChange={form.handleChange} onBlur={form.handleBlur}/>
        {form.errors.image ? <p className='text-red-500 mt-0 pt-0 text-lg'>{form.errors.image && form.touched.image && form.errors.image}</p> : ''}
        <label htmlFor='price'>product price : </label>
        <input name='price' value={form.values.price} className='bg-white row-span-3 rounded px-2' type="number" placeholder='please enter product price...' onChange={form.handleChange} onBlur={form.handleBlur}/>
        {form.errors.price ? <p className='text-red-500 mt-0 pt-0 text-lg'>{form.errors.price && form.touched.price && form.errors.price}</p> : ''}
        <label htmlFor='discount'>product discount in percentage : </label>
        <input name='discount' value={form.values.discount} min='0' max='100' className='bg-white row-span-3 rounded px-2' type="number" placeholder='please enter product discount in percentage...' onChange={form.handleChange} onBlur={form.handleBlur}/>
        {form.errors.discount ? <p className='text-red-500 mt-0 pt-0 text-lg'>{form.errors.discount && form.touched.discount && form.errors.discount}</p> : ''}
        <label htmlFor='desc'>product description : </label>
        <textarea name='desc' value={form.values.desc} className='bg-white p-2 rounded h-30' placeholder='please enter product description...'  onChange={form.handleChange} onBlur={form.handleBlur}/>
        {form.errors.desc ? <p className='text-red-500 mt-0 pt-0 text-lg'>{form.errors.desc && form.touched.desc && form.errors.desc}</p> : ''}
        <button type='submit' className='bg-green-400 max-w-fit p-2 rounded shadow shadow-green-900 text-white text-shadow text-shadow-white'>Add product</button>
      </form>
    </Container>
  )
}

export default AddProduct
