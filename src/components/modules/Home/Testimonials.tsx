import React from 'react'

function Testimonials() {
  return (
    <div>
        <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <p className="text-lg font-semibold text-gray-600">Our Happy Customers</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
        What People Are Saying
      </h2>
    </div>

    <div className="grid gap-8 md:grid-cols-3">
      {/* Testimonial 1 */}
      <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
        <p className="text-gray-700 italic">
          “Booking a ride is effortless, and I always feel safe. The drivers are professional, and the app is simple to use.”
        </p>
        <div className="mt-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
            S
          </div>
          <div>
            <p className="font-semibold text-gray-900">Sarah Mitchell</p>
            <p className="text-sm text-gray-500">Regular Rider</p>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
        <p className="text-gray-700 italic">
          “Transparent pricing and very affordable. Perfect for my daily commute. I know exactly what I’ll pay.”
        </p>
        <div className="mt-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
            M
          </div>
          <div>
            <p className="font-semibold text-gray-900">Michael Davis</p>
            <p className="text-sm text-gray-500">Business Traveler</p>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
        <p className="text-gray-700 italic">
          “The rides are quick and convenient. Even during peak hours, I don’t have to wait long for a driver.”
        </p>
        <div className="mt-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
            E
          </div>
          <div>
            <p className="font-semibold text-gray-900">Emily Carter</p>
            <p className="text-sm text-gray-500">Frequent User</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Testimonials