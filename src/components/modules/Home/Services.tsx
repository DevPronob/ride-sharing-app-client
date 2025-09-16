import { CoinsIcon, MapIcon, ShieldIcon } from '@/assets/icons/Logo'
import React from 'react'

function Services() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
            Our Services
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Reliable, convenient, and affordable – everything you need for your ride.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 flex flex-col items-center text-center gap-4 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow">
            <MapIcon className="w-12 h-12 text-blue-500" />
            <h3 className="font-semibold text-lg sm:text-xl">
              Ride Booking
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Book rides easily with our user-friendly platform, offering a variety of vehicle options to suit your needs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 flex flex-col items-center text-center gap-4 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow">
            <ShieldIcon className="w-12 h-12 text-green-500" />
            <h3 className="font-semibold text-lg sm:text-xl">
              Ride Scheduling
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Plan ahead by scheduling rides in advance, ensuring you have a ride when you need it most.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 flex flex-col items-center text-center gap-4 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow">
            <CoinsIcon className="w-12 h-12 text-yellow-500" />
            <h3 className="font-semibold text-lg sm:text-xl">
              Affordable & Transparent Pricing
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Ride without surprises – clear, upfront pricing so you only pay for the distance you travel, with no hidden fees.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
