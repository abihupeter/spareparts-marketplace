"use client"

import React from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Users, ShieldCheck, Truck, PackageCheck } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-primary">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            At Part Shop Go, we deliver authentic car parts for all drivers across Kenya with precision, care, and commitment to service.
          </p>
         {/*} <img
            src="/icons/sustainability.jpg"
            alt="Our team working on car parts"
            width={1000}
            height={500}
            className="rounded-lg mx-auto shadow max-w-1xl w-full "
          />*/}
        </section>

        {/* Mission */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            To make automotive parts accessible, affordable, and authentic — while providing exceptional service and support to our customers.
          </p>
        </section>

        {/* Our Story */}
        <section className="md:flex items-center gap-10">
          <div className="md:w-1/2">
            <img
              src="/icons/our-story.jpg"
              alt="Our story image"
              width={600}
              height={400}
              className="rounded-md shadow max-w-3xl w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 space-y-4">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2023, Part Shop Go began as a small garage with a big vision: to streamline the process of sourcing car parts in Kenya. We've grown into a trusted online store with thousands of loyal customers.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center space-y-2">
              <ShieldCheck className="w-10 h-10 text-primary" />
              <p className="text-muted-foreground text-sm">Genuine OEM & Aftermarket Parts</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Truck className="w-10 h-10 text-primary" />
              <p className="text-muted-foreground text-sm">Nationwide Fast Shipping</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Users className="w-10 h-10 text-primary" />
              <p className="text-muted-foreground text-sm">Customer-Focused Support</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <PackageCheck className="w-10 h-10 text-primary" />
              <p className="text-muted-foreground text-sm">Affordable & Transparent Pricing</p>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl font-semibold">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {["team-1.jpg", "team-2.jpg", "team-3.jpg"].map((img, i) => (
              <div key={i} className="space-y-2">
                <img
                  src={`/icons/${img}`}
                  alt={`Team member ${i + 1}`}
                  width={300}
                  height={300}
                  className="rounded-full mx-auto shadow"
                />
                <p className="font-medium">Member {i + 1}</p>
                <p className="text-sm text-muted-foreground">Expert in spare parts logistics</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sustainability */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Sustainability</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We're committed to sourcing responsibly and minimizing waste. Our packaging is 100% recyclable and we partner with eco-friendly vendors.
          </p>
          <img
            src="/icons/sustainability.jpg"
            alt="Sustainability at work"
            width={1000}
            height={400}
            className="rounded-lg mx-auto shadow"
          />
        </section>

        {/* Companies We've Worked With + Carousel */}
        <section className="text-center space-y-8">
          <h2 className="text-2xl font-semibold">Companies We've Worked With</h2>
          <div className="overflow-x-auto whitespace-nowrap py-4 px-2 scrollbar-hide">
            <div className="inline-flex gap-10 items-center">
              {[
                              { name: "Toyota", img: "/icons/toyota.jpg" },
                              { name: "mercedes", img: "/icons/mercedes.jpg" },
                              { name: "bmw", img: "/icons/bmw.jpg" },
                              { name: "Toyota", img: "/icons/vw.jpg" },
                { name: "Nissan", img: "/icons/nissan.jpg" },
                { name: "Ford", img: "/icons/ford.jpg" },
                { name: "Isuzu", img: "/icons/isuzu.jpg" },
                { name: "Bosch", img: "/icons/bosch.jpg" },
              ].map((company) => (
                <div key={company.name} className="flex flex-col items-center">
                  <img
                    src={company.img}
                    alt={company.name}
                    className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition"
                  />
                  <span className="text-sm mt-2 text-muted-foreground">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        
      </main>

      <Footer />
    </div>
  )
}
