import React from 'react'
import { Button } from '../../ui/button'

function Banner() {
  return (
    <div className='bg-gray-800'>
        <div className='container mx-auto text-center py-10 px-4 text-white gap-4'>
            we've got you covered with seamless booking, trusted drivers, and unbeatable convenience. Join us today and experience the ride of your life!
            <Button>Get More Coupon</Button>
        </div>
    </div>
  )
}

export default Banner