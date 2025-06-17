import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar, Footer } from '../index'
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

  return (
    <>
      <div className="bg-slate-950 min-h-screen" >
        <ScrollToTop />
        <Navbar />
        <div className='w-full min-h-screen mt-15'>
          <Outlet />
        </div>

        <Footer />
      </div >
      <ToastContainer />
    </>
  );
}

export default App;
