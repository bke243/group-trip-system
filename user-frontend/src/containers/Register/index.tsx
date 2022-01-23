import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { $register } from '../../redux/user.reducer';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});
const images = [
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1519&q=80',
    'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
]
export const Register = () => {
    const dispatch = useDispatch()
    return <div className='fixed w-full h-screen max-h-screen'>
        <img src={images[Math.floor(Math.random() * 4)]} className='absolute inset-0 h-screen w-full object-cover brightness-50' alt="" />
        <div className='absolute z-10 left-0 right-0 lg:left-20 w-full p-2 md:p-10 lg:p-0  md:w-full lg:w-1/3 flex items-center justify-center h-screen my-auto top-auto bottom-auto'>
            <div className='w-full h-auto bg-white rounded-lg shadow-md py-4 px-4'>
                <h1 className='text-5xl font-semibold text-gray-600'>Sign Up</h1>
                <Formik
                    initialValues={{
                        password: '',
                        firstName: '',
                        lastName: '',
                        telephone: '',
                        email: '',
                        birthDate: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        dispatch($register({ ...values, birthDate: '10-1-2000' }))
                    }}
                >
                    {({ errors, touched, handleBlur, handleChange, values: { birthDate, email = '', firstName = '', lastName = '', password = '', telephone = '' } }) => (
                        <Form>
                            <div className='w-full h-auto flex flex-col space-y-2 mt-4'>
                                <TextInput label='First Name' onChange={handleChange} onBlur={handleBlur} value={firstName} required placeholder='First Name' radius={'md'} size='md' name='firstName' error={errors.firstName && touched.firstName ? (
                                    <div>{errors.firstName}</div>
                                ) : null} />
                                <TextInput label='Last Name' placeholder='Last Name' onChange={handleChange} onBlur={handleBlur} value={lastName} radius={'md'} size='md' name='lastName' error={errors.lastName && touched.lastName ? (
                                    <div>{errors.lastName}</div>
                                ) : null} />
                                <TextInput label='Email' placeholder='Email' required onChange={handleChange} onBlur={handleBlur} value={email} radius={'md'} type='email' size='md' name='email' error={errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null} />
                                <TextInput label='Telephone' placeholder='Telephone' onChange={handleChange} onBlur={handleBlur} value={telephone} radius={'md'} type='tel' size='md' name='telephone' error={errors.telephone && touched.telephone ? (
                                    <div>{errors.telephone}</div>
                                ) : null} />
                                <TextInput label='Password' placeholder='Password' required type='password' onChange={handleChange} onBlur={handleBlur} value={password} radius={'md'} size='md' name='password' error={errors.password && touched.password ? (
                                    <div>{errors.password}</div>
                                ) : null} />

                                <button type="submit" className='w-full rounded-lg text-white bg-sky-600 hover:bg-sky-700 transition-colors py-2 mt-2 shadow-md'>Sign Up</button>
                                <p className='text-center'>Already have an account? <Link to='/' className='text-sky-700 cursor-pointer'>Log In</Link></p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
};
