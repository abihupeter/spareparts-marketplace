// pages/AboutUs.tsx
import React from "react"

export default function AboutUs() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We are passionate about delivering genuine car parts to vehicle owners and mechanics across the country. At Part Shop Go, we believe every driver deserves quality and reliability without compromise.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-muted-foreground">
          To make automotive parts accessible, affordable, and authentic — while providing exceptional service and support to our customers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
        <p className="text-muted-foreground">
          Founded in 2023, Part Shop Go began as a small garage with a big vision: to streamline the process of sourcing car parts in Kenya. We've grown into a trusted online store with thousands of loyal customers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Why Choose Us</h2>
        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
          <li>100% genuine OEM and aftermarket parts</li>
          <li>Fast shipping across the country</li>
          <li>Dedicated customer support</li>
          <li>Competitive pricing</li>
        </ul>
      </section>

      <section className="text-center">
        <a
          href="/contact"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition"
        >
          Get in Touch
        </a>
      </section>
    </main>
  )
}
