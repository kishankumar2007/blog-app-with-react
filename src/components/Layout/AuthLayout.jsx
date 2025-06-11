import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function AuthLayout({ children, authantication = true }) {
  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate()

  useEffect(() => {
    authStatus ? navigate('/') : navigate('/login')
  }, [navigate, authantication, authStatus])

  return (
    <div className='w-full min-h-screen' >
      {children}
    </div>
  )
}

export default AuthLayout