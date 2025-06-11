import { Link, } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import { useState } from 'react';
import navlogo from '../../assets/navlogo.png'
import { FiMenu } from 'react-icons/fi';
import { FaUserCircle } from "react-icons/fa";
const Navbar = () => {
  const authStatus = useSelector(state => state.auth.status)
  const userData = useSelector(state => state.auth.userData)
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const navItems = [
    {
      name: "Home",
      path: '/',
      active: true
    },
    {
      name: "Explore",
      path: '/blogs',
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
    <nav className="bg-slate-900 shadow-md h-16 flex fixed top-0 right-0 z-999 left-0 items-center justify-between w-full p-4 md:px-35">
      <button
        onClick={toggleSidebar}
        className="fixed  top-4 left-4 z-50 text-white text-3xl md:hidden"
      >
        {!isOpen && <FiMenu className='text-teal-400' />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden`}
      >
        {authStatus && <div className="py-6 px-3 flex flex-col gap-2 text-xl font-semibold border-b border-gray-700">
          <h1 className='flex items-center gap-2 truncate'><FaUserCircle /><span className='text-teal-600'>{userData.name}</span></h1>
          <p className='text-xs font-light tracking-wider truncate'>Email: {userData.email}</p>
        </div>}
        <nav className="flex flex-col p-4 gap-4">
          {navItems.map((item) => (
            item.active && <li className='text-white p-2 rounded list-none hover:text-teal-500 transition-all delay-100' key={item.name}><Link to={item.path}>{item.name}</Link></li>
          ))}
          {authStatus &&
            <>
              <li className=' list-none text-white p-2 rounded hover:text-teal-500 transition-all delay-100'>
                <Link to="/mypost">My Post</Link>
              </li>
              <li className=' list-none text-white p-2 rounded hover:text-teal-500 transition-all delay-100'>
                <Link to="/addpost">Add Post</Link>
              </li>
            </>}
        </nav>
        {authStatus && <LogoutBtn className='w-52 py-2 m-2' />}
      </div>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30"
        />
      )}

      <div className="md:flex w-full justify-between space-x-4 hidden">
        <div className="logo w-12 border border-white/10 rounded overflow-hidden"><img className='w-full object-center h-full' src={navlogo} alt="navlogo" /></div>
        <ul className='md:flex items-center gap-5'>
          {navItems.map((item) => (
            item.active && <li className='text-white/70 hover:text-teal-500 transition-all delay-100' key={item.name}><Link to={item.path}>{item.name}</Link></li>
          ))}
          {authStatus && <div className='group cursor-pointer'>
            <h1 className='flex items-center gap-2 text-teal-400 font-medium text-sm sm:text-base hover:text-teal-700 transition-all delay-100 '>
              <FaUserCircle className='text-2xl ' />
              {userData.name}
            </h1>
            <div className='absolute rounded-xl transition-opacity ease-in-out duration-300 group-hover:opacity-100 hidden group-hover:block opacity-0 w-30 h-fit'>
              <ul className='mt-2  bg-slate-800 text-white flex flex-col items-center space-y-2 py-2'>
                <li>
                  <Link to="/mypost" className="hover:text-teal-400 transition-color delay-100">My Post</Link>
                </li>
                <li>
                  <Link to="/addpost" className="hover:text-teal-400 transition-color delay-100">Add Post</Link>
                </li>
                <li><LogoutBtn className='bg-transparent cursor-pointer hover:text-teal-400 transition-color delay-100' /></li>
              </ul>
            </div>
          </div>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
