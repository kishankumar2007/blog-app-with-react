import React from 'react'

function Footer() {
    const date = new Date().getFullYear()
  return (
    <div className='w-full text-center py-3 text-xs bg-slate-900 text-gray-300/50'>
         <h1>&copy; {date} Kishan All right reserved. </h1>
    </div>
  )
}

export default Footer
