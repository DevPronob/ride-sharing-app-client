import React, { useState } from 'react'
const faqs = [
  {
    question: "How do I book a ride?",
    answer:
      "Open the app, enter your pickup and drop-off locations, choose your preferred vehicle type, and confirm your booking. A nearby driver will accept and pick you up shortly.",
  },
  {
    question: "Can I schedule rides in advance?",
    answer:
      "Yes! You can schedule a ride for a future date and time. Just select 'Schedule a Ride' while booking and choose your desired pickup time.",
  },
  {
    question: "How are fares calculated?",
    answer:
      "Fares are calculated based on the distance, estimated travel time, traffic conditions, and your selected vehicle type. You can see an estimated fare before confirming.",
  },
  {
    question: "What payment options do you accept?",
    answer:
      "We accept cash, debit/credit cards, mobile wallets, and other digital payment methods depending on your region. You can set your preferred payment option in the app.",
  },
  {
    question: "Can I cancel my ride?",
    answer:
      "Yes, you can cancel before or after a driver is assigned. However, a small cancellation fee may apply if the driver is already on their way.",
  },
  {
    question: "Is safety guaranteed during rides?",
    answer:
      "We take safety seriously! All drivers are verified, rides are GPS-tracked, and you can share your live location with family or friends during your trip.",
  },
];
function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div><section className="max-w-2xl mx-auto my-10 p-5">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-5 font-medium text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {faq.question}
              <svg
                className={`w-3 h-3 transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 10 6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="p-5 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section></div>
  )
}

export default Faq