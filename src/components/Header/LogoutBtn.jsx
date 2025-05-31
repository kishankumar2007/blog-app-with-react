import React from 'react'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
function LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutUser = async () => {
    try {
      await authService.logout()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <button onClick={logoutUser} className='border-none bg-violet-500 text-white rounded-lg py-1 px-2'>Logout</button>

  )
}

export default LogoutBtn
