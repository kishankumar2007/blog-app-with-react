import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import authService from './appwrite/auth';
import { Navbar, Footer } from '../index'
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    ;(async () => {
      try {
        const session = await authService.getCurrentUser()
        if (session) {
          dispatch(login(session))
          navigate('/')
        }
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [])

  return (
    <>
      <div className="bg-slate-950 min-h-screen" >
        <Navbar />
        <div className='w-full min-h-screen'><Outlet /> </div>
        <Footer />
      </div >

    </>
  );
}

export default App;
