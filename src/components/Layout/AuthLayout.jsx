import React, { Children, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({ children, authantication = true }) {
  
  const [loading, setLoading] = useState(true)
  const authStates = useSelector(state => state.auth.status)
  const navigate = useNavigate()

  useEffect(() => {
    authStates ? navigate('/') : navigate('/login')
    setLoading(false)
  }, [navigate, authantication, authStates])
  return (
    <div className='w-full min-h-screen' >
      {loading ? <p>Blog's are loading...</p>:<>{children}</>}
    </div>
  )
}

export default AuthLayout