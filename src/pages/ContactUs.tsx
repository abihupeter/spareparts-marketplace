// pages/ContactUs.tsx
import React from "react"

export default function ContactUs() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-muted-foreground">
          We'd love to hear from you! Whether you have a question, feedback, or need help finding the right part, our team is here for you.
        </p>
      </section>

      <section>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              placeholder="How can we help you?"
            ></textarea>
          </div>

           {} <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-2">Reach Us Directly</h2>
        <p className="text-muted-foreground">📞 Phone: +254 700 123 456</p>
        <p className="text-muted-foreground">📧 Email: support@partshopgo.co.ke</p>
        <p className="text-muted-foreground">📍 Location: Nairobi, Kenya</p>

        <div className="mt-4 flex gap-4">
          <a href="#" className="text-blue-500 hover:underline">
            Facebook
          </a>
          <a href="#" className="text-sky-500 hover:underline">
            Twitter
          </a>
          <a href="#" className="text-pink-500 hover:underline">
            Instagram
          </a>
        </div>
      </section>
    </main>
  )
}
