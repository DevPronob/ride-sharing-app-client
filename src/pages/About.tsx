import React from 'react';

export default function About() {
const team = [
    { id: 1, name: 'Ayesha Rahman', role: 'CEO & Founder', bio: 'Visionary leader with 10+ years in mobility and product design.' },
    { id: 2, name: 'Rafiq Hossain', role: 'CTO', bio: 'Builds reliable real-time platforms and scalable services.' },
    { id: 3, name: 'Nadia Karim', role: 'Head of Operations', bio: 'Ensures drivers and riders have a seamless experience.' },
    { id: 4, name: 'Imran Khan', role: 'Product Designer', bio: 'Crafts clean, usable interfaces and delightful interactions.' },
  ];

  return (
<section className="bg-gray-50 text-black py-20">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About Us</h2>
        <p className="mt-4 text-black max-w-xl leading-relaxed">
          We are a tech-forward ride booking company focused on safe, reliable, and affordable mobility for everyone. Founded with the
          mission to connect communities and create economic opportunity for drivers, our platform blends polished design with
          robust engineering to deliver delightful end-to-end experiences.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white">Our Mission</h3>
            <p className="mt-2 text-black">Make urban mobility simpler, safer, and more accessible — one ride at a time.</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white">Our Values</h3>
            <ul className="mt-2 space-y-2 text-black">
              <li>Safety first</li>
              <li>Transparent fares</li>
              <li>Driver empowerment</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:opacity-95"
            href="#contact"
          >
            Contact Us
          </a>
          <a
            className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm text-white hover:bg-white/5"
            href="#careers"
          >
            Careers
          </a>
        </div>
      </div>

      <div>
        <div className="rounded-3xl bg-white shadow-lg p-6 ring-1 ring-white/10">
          <h3 className="text-xl font-bold text-white">What we build</h3>
          <p className="mt-3 text-black-300">A reliable ride-booking product with real-time tracking, driver tools, and analytics for operators.</p>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white shadow-lg p-4">
              <dt className="text-sm font-medium text-white">Real-time</dt>
              <dd className="mt-1 text-xs text-black">Live tracking & status updates</dd>
            </div>
            <div className="rounded-xl bg-white shadow-lg p-4">
              <dt className="text-sm font-medium text-white">Scalable</dt>
              <dd className="mt-1 text-xs text-black">Handles thousands of concurrent rides</dd>
            </div>
            <div className="rounded-xl bg-white shadow-lg p-4">
              <dt className="text-sm font-medium text-white">Secure</dt>
              <dd className="mt-1 text-xs text-black">Encrypted auth & safety features</dd>
            </div>
            <div className="rounded-xl bg-white shadow-lg p-4">
              <dt className="text-sm font-medium text-white">Friendly UX</dt>
              <dd className="mt-1 text-xs text-black">Clear flows for riders & drivers</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 rounded-2xl bg-white shadow-lg p-6">
          <h4 className="text-lg font-semibold text-white">Trusted by thousands</h4>
          <p className="mt-2 text-black text-sm">Our platform powers daily commutes and supports driver livelihoods across cities.</p>
        </div>
      </div>
    </div>

    <div className="mt-16">
      <h3 className="text-2xl font-bold">Meet the Team</h3>
      <p className="mt-2 text-black max-w-2xl">A small, diverse team obsessed with building useful products.</p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((t) => (
          <li key={t.id} className="rounded-2xl bg-gray-800 p-6 flex flex-col items-start gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="h-16 w-16 flex-none rounded-full bg-gray-700 flex items-center justify-center text-white text-lg font-bold">
                {t.name.split(' ').map((s) => s[0]).slice(0,2).join('')}
              </div>
              <div className="flex-1">
                <h5 className="text-base font-semibold text-white">{t.name}</h5>
                <p className="text-xs text-gray-300">{t.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">{t.bio}</p>
            <div className="mt-2 flex gap-2">
              <a aria-label={`Email ${t.name}`} className="rounded-full bg-gray-700 px-3 py-1 text-xs text-white">Email</a>
              <a aria-label={`LinkedIn ${t.name}`} className="rounded-full bg-gray-700 px-3 py-1 text-xs text-white">LinkedIn</a>
            </div>
          </li>
        ))}
      </ul>
    </div>

    <div id="contact" className="mt-16 rounded-2xl bg-white shadow-lg p-8">
      <h4 className="text-lg font-semibold text-black">Get in touch</h4>
      <p className="mt-2 text-black">Questions about partnerships, careers or press? Reach out and we'll respond within 48 hours.</p>
      <form className="mt-6 grid gap-4 sm:grid-cols-2">
        <input className="rounded-lg  p-3 text-black border border-gray placeholder-gray-400 outline-none" placeholder="Your name" />
        <input className="rounded-lg  p-3 text-black border border-gray placeholder-gray-400 outline-none" placeholder="Your email" />
        <textarea className="sm:col-span-2 rounded-lg border border-gray  p-3 text-black placeholder-gray-400 outline-none" rows={4} placeholder="Message" />
        <button className="sm:col-span-2 inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 font-semibold text-white">Send message</button>
      </form>
    </div>
  </div>
</section>
  );
}
