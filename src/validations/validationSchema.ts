import * as Yup from 'yup'

const validationSchemaAddProduct = Yup.object().shape({
    title: Yup.string().min(3, 'You must enter at least 3 characters.').required('this filed is required.'),
    image: Yup.string().min(10, 'You must enter at least 10 characters.').required('this filed is required.'),
    price: Yup.number().min(0, 'the minimum price must be 0').required('this filed is required.'),
    discount: Yup.number().min(0, 'the minimum discount percentage must be 0').max(100, 'the maximum discount percentage must be 100').required('this filed is required.'),
    desc: Yup.string().min(20, 'You must enter at least 20 characters.').required('this filed is required.'),
})

export {validationSchemaAddProduct}