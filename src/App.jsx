import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import authService from './appwrite/auth';
import { Navbar, Footer } from '../index'
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { ToastContainer } from 'react-toastify'

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
};

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
  }, [navigate, dispatch])

  return (
    <>
      <div className="bg-slate-950 min-h-screen" >
        <ScrollToTop />
        <Navbar />
        <div className='w-full min-h-screen'><Outlet /> </div>

        <Footer />
      </div >
      <ToastContainer />
    </>
  );
}

export default App;
