import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../../../index'
import authService from '../../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/authSlice'
import { toast } from 'react-toastify'
function Signup() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.userData)
  const createUserAccount = async (data) => {
    try {
      setLoading(true)
      setError('')
      const userData = await authService.createAccount(data)
      if (userData) {
        navigate('/login')
        toast.success('Account created successfully ✅', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            width: "200px",
            height: " 40px"
          }
        });
        reset()
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='w-full min-h-screen px-2 sm:pt-30 pt-15'>
      <h1 className='text-white text-center text-3xl mb-3'>Sign up</h1>
      <div className="signup max-w-sm mx-auto  bg-gray-900 w-full rounded">
        <form className='w-full p-4 min-h-96  justify-center flex flex-col items-center' onSubmit={handleSubmit(createUserAccount)}>
          <Input className='py-3' label="Name" placeholder='Enter your name' {...register('name', {
            required: { value: true, message: "Name field cannot be empty" },
          })} />
          {errors?.name && <p className='text-red-600 text-sm mb-1'>{errors.name?.message}</p>}
          <Input className='py-3' label="Email" type="email" placeholder='Enter your email' {...register('email', {
            required: { value: true, message: "Email field cannot be empty" },
            pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Enter a valid email" }
          })} />
          {errors?.email && <p className='text-red-600 text-sm mb-1'>{errors.email?.message}</p>}
          <Input className='py-3' label="Password" type="password" placeholder='Enter your password' {...register('password', {
            required: { value: true, message: "Password field cannot be empty" },
            minLength: { value: 8, message: "Password must be minimum length of 8 " }
          })} />
          {errors?.password && <p className='text-red-600 text-sm mb-1'>{errors.password?.message}</p>}
          {error && <p className='text-red-600 text-sm mb-1'>{error}</p>}

          <button className='py-2  mt-5 px-10 rounded bg-violet-700 text-white' type='submit'>{loading ? "Please wait..." : "Create Account"}</button>
          <h1 className='text-white/50 mt-5'>Already have an Account ? <Link to='/login' className='text-white'>Login</Link></h1>
        </form>
      </div>
    </div>
  )
}

export default Signup
