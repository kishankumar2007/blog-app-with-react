import { Link, } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import { useState } from 'react';
import navlogo from '../../assets/navlogo.png'
const Navbar = () => {
  const authStatus = useSelector(state => state.auth.status)
  const [isClicked, setisClicked] = useState(false)

  const handleClick = () => {
    setisClicked(!isClicked)
  }
  const closeSlider = () => {
    setisClicked(!isClicked)
  }

  const navItems = [
    {
      name: "Home",
      path: '/',
      active: true
    },
    {
      name: "All Post",
      path: '/',
      active: authStatus,
    },
    {
      name: "Add Post",
      path: '/addpost',
      active: authStatus,
    },
    {
      name: "Login",
      path: '/login',
      active: !authStatus,
    },
    {
      name: "Sign up",
      path: '/signup',
      active: !authStatus,
    },
  ]
  return (
    <nav className="bg-slate-900 shadow-md h-16 flex items-center justify-between w-full p-4 md:px-35">
      <div className="container  mx-auto flex justify-between items-center md:hidden">
       <div className="logo w-10 border border-white/10 rounded overflow-hidden"><img className='w-full object-center h-full' src={navlogo} alt="navlogo" /></div>
        <div onClick={handleClick} className="text-[#e2d3fd] text-2xl">&#9776;</div>
      </div>

      <div className={`menu z-10 ${isClicked ? 'top-0' : '-top-full'} sm:hidden transition-all ease duration-500 ease-in-out absolute flex pt-5 flex-col w-screen items-center bg-slate-900 left-0 right-0`}>
        <h1 onClick={closeSlider} className="closeSlider absolute right-5 top-5 text-white/90 font-bold">X</h1>
        <ul className='flex flex-col items-center gap-5'>
          {navItems.map((item) => (
            item.active && <li className='text-white/70' key={item.name}><Link to={item.path}>{item.name}</Link></li>
          ))}
          {authStatus && <LogoutBtn />}
        </ul>
      </div>

      <div className="md:flex w-full justify-between space-x-4 hidden">
       <div className="logo w-12 border border-white/10 rounded overflow-hidden"><img className='w-full object-center h-full' src={navlogo} alt="navlogo" /></div>
        <ul className='md:flex items-center gap-5'>
          {navItems.map((item) => (
            item.active && <li className='text-white/70 hover:text-white' key={item.name}><Link to={item.path}>{item.name}</Link></li>
          ))}
          {authStatus && <LogoutBtn />}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
