import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { Input } from '../../../index'
import { Link } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors },reset } = useForm()
  const [loading, setLoading] = useState(false)
  const loginUser = async (data) => {
    try {
      setLoading(true)
      const userData = await authService.userLogin(data)
      if (userData) dispatch(login(userData))
        reset()
    } catch (error) {
      console.log(error.message)
    } finally { setLoading(false) }

  }
  return (
    <div className='w-full min-h-screen px-2 sm:pt-30 pt-15 '>
      <h1 className='text-white text-center text-3xl mb-3'>Login</h1>
      <div className="signup max-w-sm mx-auto  bg-gray-900 w-full rounded">
        <form className='w-full p-4 min-h-96 justify-center flex flex-col items-center' onSubmit={handleSubmit(loginUser)}>

          <Input className='py-3' label="Email" type="email" placeholder='Enter your email' {...register('email', {
            required: { value: true, message: "Email field cannot be empty" },
            pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "no user found with email in our database" }
          })} />
          {errors?.email && <p className='text-red-600 text-sm mb-1'>{errors.email?.message}</p>}
          <Input className='py-3' label="Password" type="password" placeholder='Enter your password' {...register('password', {
            required: { value: true, message: "Password field cannot be empty" },
            minLength: { value: 8, message: "invalid email or password" }
          })} />
          {errors?.password && <p className='text-red-600 text-sm mb-1'>{errors.password?.message}</p>}
          <button className='py-2  mt-5 px-10 rounded bg-violet-700 text-white' type='submit'>{loading ? "Please wait..." : "Login"}</button>
          <h1 className='text-white/50 mt-5'>Don't have an Account ? <Link to='/signup' className='text-white'>Signup</Link></h1>
        </form>
      </div>
    </div>
  )
}

export default Login
