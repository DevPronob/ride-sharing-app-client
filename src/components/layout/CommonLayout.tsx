import React, { type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function CommonLayout({children}:{children:ReactNode}) {
  return (
    <div className='min-h-screen flex flex-col min-w-7xl'>
        <Navbar/>
        <div className='grow-1'>
        {children}
        </div>
        <Footer/>
        </div>
  )
}

export default CommonLayout