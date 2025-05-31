import React,{ forwardRef , useId } from 'react'

const Input = forwardRef(function Input({
   label,
   type = 'text',
   placeholder = 'Enter placeholder',
   className = '',
   ...props

},ref){
      const id = useId()
    return (
        <div className="main flex items-center w-full mb-2 max-w-4xl text-white rounded border border-violet-600">
        {label && <label className='px-2' htmlFor={label}>{label}</label>}
        <input type={type} className={`outline-none px-2 w-full  ${className}`} placeholder={placeholder} id={id} ref={ref} {...props}/>
            
        </div>
    )

})

export default Input
