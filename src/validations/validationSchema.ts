import * as Yup from 'yup'

const validationSchemaAddProduct = Yup.object().shape({
    title: Yup.string().min(3, 'You must enter at least 3 characters.').required('this filed is required.'),
    image: Yup.string().min(10, 'You must enter at least 10 characters.').required('this filed is required.'),
    price: Yup.number().min(0, 'the minimum price must be 0').required('this filed is required.'),
    discount: Yup.number().min(0, 'the minimum discount percentage must be 0').max(100, 'the maximum discount percentage must be 100').required('this filed is required.'),
    desc: Yup.string().min(20, 'You must enter at least 20 characters.').required('this filed is required.'),
})

const validationSchemaRegisterUser = Yup.object().shape({
    username : Yup.string().min(3,'Username must be at least 3 characters long.').max(20, 'Username can have a maximum of 20 characters').matches(/^[\w]+$/, 'Username can only contain uppercase A-Z, lowercase a-z, numbers and _ .').required('this field is required'),
    phone: Yup.string().matches(/[0-9]{11}/, 'The phone number must be entered using numbers and be 11 digits').required('this field is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters long.').max(20, 'Password can have a maximum of 20 characters').required('this field is required'),
    confirmPassword: Yup.string().min(4, 'Password must be at least 4 characters long.').max(20, 'Password can have a maximum of 20 characters').oneOf([Yup.ref('password')], 'The repetition does not match the password.').required('this field is required'),
})

const validationSchemaLoginUser = Yup.object().shape({
    userInformation : Yup.string().min(3,'Username or email or phone number must be at least 3 characters long.').max(40, 'Username or email or phone number can have a maximum of 40 characters').matches(/^[\w@\.]+$/, 'Username or email or phone number can only contain uppercase A-Z, lowercase a-z, numbers, @, . and _ .').required('this field is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters long.').max(20, 'Password can have a maximum of 20 characters').required('this field is required'),
})

const validationSchemaForgetPassword = Yup.object().shape({
    userInformation : Yup.string().min(10,'email or phone number must be at least 10 characters long.').max(40, 'or email or phone number can have a maximum of 40 characters').matches(/^[\w@\.]+$/, 'email or phone number can only contain uppercase A-Z, lowercase a-z, numbers, @, . and _ .').required('this field is required'),
})

export {validationSchemaAddProduct, validationSchemaRegisterUser , validationSchemaLoginUser, validationSchemaForgetPassword}
