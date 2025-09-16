import React, { useState } from 'react'

function Contact() {
     const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email address";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate form submission
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div><section className="bg-gray-50 min-h-screen  py-16">
      <div className="max-w-3xl mx-auto text-black shadow-lg px-12 py-8">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-black mb-8">
          Have questions about partnerships, careers, or press? Fill out the form below and we'll respond within 48 hours.
        </p>

        {submitted && (
          <div className="bg-green-600 text-white p-4 rounded mb-6">
            Your message has been submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-white  placeholder-gray-400 text-black border border-gray outline-none ${
                errors.name ? "border border-red-500" : ""
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg  placeholder-gray-400 text-black border border-gray outline-none ${
                errors.email ? "border border-red-500" : ""
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg  placeholder-gray-400 text-black border border-gray outline-none ${
                errors.message ? "border border-red-500" : ""
              }`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
    </div>
  )
}

export default Contact