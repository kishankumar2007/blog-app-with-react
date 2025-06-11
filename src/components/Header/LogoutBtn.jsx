import React from 'react'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { toast } from 'react-toastify'
function LogoutBtn({className=''}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutUser = async () => {
    try {
      await authService.logout()
      dispatch(logout())
      toast.success('Logout success', {
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
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <button onClick={logoutUser} className={`border-none ${className} bg-teal-600 text-white rounded-lg py-1 px-2`}>Logout</button>

  )
}

export default LogoutBtn
