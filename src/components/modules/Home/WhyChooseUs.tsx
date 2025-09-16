import React from 'react'

function WhyChooseUs() {
  return (
    <div className='py-10'>
      <div className="bg-gray-800 mx-auto py-10 grid max-w-screen-xl grid-cols-1 text-white pl-6 pr-4 sm:px-20 lg:grid-cols-3">
  {/* Left Content */}
  <div className="col-span-1 flex flex-col justify-center text-center sm:text-left md:pr-10">
    <h1 className="mb-6 text-4xl">Why Choose Us</h1> 
    <p className="text-gray-400">
      Experience seamless rides with our reliable and safe ride booking platform. Whether you’re a rider or a driver, we ensure comfort, trust, and speed.
    </p>
  </div>

  {/* Right Content */}
  <div className="col-span-2 mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-gray-600 p-5 sm:p-10 md:grid-cols-2 lg:mt-0">
    {/* Feature 1 */}
    <div className="relative flex gap-5">
      <div className="absolute -left-12 sm:left-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-lg text-gray-500 sm:relative md:bg-transparent md:text-5xl">01</div>
      <div> 
        <h3 className="text-xl font-semibold">Safe & Reliable Rides</h3>
        <p className="text-gray-400 mt-3">
          Verified drivers, real-time tracking, and safety-first policies ensure every journey is secure.
        </p>
      </div> 
    </div>

    {/* Feature 2 */}
    <div className="relative flex gap-5">
      <div className="absolute -left-12 sm:left-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-lg text-gray-500 sm:relative md:bg-transparent md:text-5xl">02</div>
      <div>
        <h3 className="text-xl font-semibold">Affordable Pricing</h3>
        <p className="text-gray-400 mt-3">
          Transparent fares with no hidden charges. Choose from multiple ride options to fit your budget.
        </p>
      </div>
    </div>

    {/* Feature 3 */}
    <div className="relative flex gap-5">
      <div className="absolute -left-12 sm:left-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-lg text-gray-500 sm:relative md:bg-transparent md:text-5xl">03</div>
      <div>
        <h3 className="text-xl font-semibold">Quick Booking</h3>
        <p className="text-gray-400 mt-3">
          Book a ride instantly with just a few taps. Our platform ensures minimal wait time.
        </p>
      </div>
    </div>

    {/* Feature 4 */}
    <div className="relative flex gap-5">
      <div className="absolute -left-12 sm:left-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-lg text-gray-500 sm:relative md:bg-transparent md:text-5xl">04</div>
      <div>
        <h3 className="text-xl font-semibold">24/7 Support</h3>
        <p className="text-gray-400 mt-3">
          Our dedicated team is always available to assist riders and drivers anytime, anywhere.
        </p>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default WhyChooseUs