"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, ShieldCheck, Truck, PackageCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Import Card components
import { Link } from "react-router-dom"; // Import Link

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      {/* Logo and Welcome Message Header */}
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-6">
        {/* Logo Left */}
        <div className="flex  gap-4">
          <img src="/icons/logo.png" alt="Logo" className="w-16 h-14" />
          <span className="font-bold font-fonarto text-4xl md:text-3xl text-primary w-26 h-14">
            Tayari Spares🔧
          </span>
        </div>
      </div>
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-20 flex-grow">
        {/* Hero Section */}
        <section className="hover:scale-105 transition-transform duration-300 text-center space-y-6 py-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-md">
          <h1 className="text-6xl font-extrabold text-primary leading-tight font-fonarto">
            About Tayari Spares
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Delivering authentic car parts for all drivers across Kenya with
            precision, care, and unwavering commitment to service.
          </p>
        </section>

        {/* Mission */}
        <Card className="text-center py-8 px-6 shadow-xl border border-primary/20 hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <CardTitle className="text-4xl font-bold font-fonarto">
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              To make automotive parts accessible, affordable, and authentic —
              while providing exceptional service and support to our customers,
              driving trust and reliability in every journey.
            </p>
          </CardContent>
        </Card>

        {/* Our Story */}
        <section className="md:flex items-center gap-12 bg-card p-8 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/icons/our-story.jpg"
              alt="Our story image"
              width={400} // Increased width for better display
              height={150} // Increased height
              className="rounded-xl shadow-lg border border-border transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 space-y-6">
            <h2 className="text-4xl font-bold font-fonarto text-foreground">
              Our Journey So Far
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2023 by a team of automotive enthusiasts, Part Shop Go
              began as a small initiative born from the frustration of sourcing
              reliable car parts in Kenya. We envisioned a streamlined,
              trustworthy platform. Through dedication and a customer-first
              approach, we've rapidly grown into a leading online store, serving
              thousands of loyal customers nationwide. Our story is one of
              passion, persistence, and partnership with every driver.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-10 text-center hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-foreground font-fonarto">
            Why Drivers Choose Tayari Spares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="flex flex-col items-center p-6 space-y-4 hover:shadow-feature transition-all duration-300 transform hover:-translate-y-1">
              <ShieldCheck className="w-12 h-12 text-primary" />
              <CardTitle className="text-xl">Genuine Quality</CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Only authentic OEM & aftermarket parts from certified suppliers.
              </CardDescription>
            </Card>
            <Card className="flex flex-col items-center p-6 space-y-4 hover:shadow-feature transition-all duration-300 transform hover:-translate-y-1">
              <Truck className="w-12 h-12 text-primary" />
              <CardTitle className="text-xl">
                Fast Nationwide Shipping
              </CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Quick and reliable delivery across every corner of Kenya.
              </CardDescription>
            </Card>
            <Card className="flex flex-col items-center p-6 space-y-4 hover:shadow-feature transition-all duration-300 transform hover:-translate-y-1">
              <Users className="w-12 h-12 text-primary" />
              <CardTitle className="text-xl">Dedicated Support</CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Customer-focused team ready to assist you at every step.
              </CardDescription>
            </Card>
            <Card className="flex flex-col items-center p-6 space-y-4 hover:shadow-feature transition-all duration-300 transform hover:-translate-y-1">
              <PackageCheck className="w-12 h-12 text-primary" />
              <CardTitle className="text-xl">Transparent Pricing</CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Affordable prices with no hidden costs, clear and fair always.
              </CardDescription>
            </Card>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="text-center space-y-10 hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-foreground font-fonarto">
            Meet Our Expert Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {["team-1.jpg", "team-2.jpg", "team-3.jpg"].map((img, i) => (
              <Card
                key={i}
                className="space-y-4 p-6 shadow-md border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={`/icons/${img}`}
                  alt={`Team member ${i + 1}`}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto shadow-lg border-2 border-primary/20 object-cover w-48 h-48"
                />
                <CardTitle className="font-semibold text-lg">
                  Member {i + 1}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {i === 0 && "Head of Operations & Logistics"}
                  {i === 1 && "Customer Experience Lead"}
                  {i === 2 && "Automotive Parts Specialist"}
                </CardDescription>
              </Card>
            ))}
          </div>
        </section>

        {/* Sustainability */}
        <section className="bg-muted/20 p-8 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Text content */}
            <div className="flex-1 text-left space-y-4">
              <h2 className="text-3xl font-bold text-foreground font-fonarto">
                Our Commitment to Sustainability
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are deeply committed to sourcing parts responsibly and
                minimizing our environmental footprint. Our packaging is
                designed to be 100% recyclable, and we actively partner with
                eco-friendly vendors who share our vision for a greener
                automotive industry. Together, we're driving towards a more
                sustainable future.
              </p>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center">
              <img
                src="/icons/sustainability.jpg"
                alt="Sustainability at work"
                className="w-[250px] md:w-[300px] rounded-lg shadow-xl border border-border"
              />
            </div>
          </div>
        </section>

        {/* Companies We've Worked With + Carousel */}
        <section className="text-center space-y-10">
          <h2 className="text-3xl font-bold text-foreground font-fonarto">
            Trusted by Leading Automotive Brands
          </h2>
          <div className="overflow-x-auto whitespace-nowrap py-6 px-4 scrollbar-hide flex justify-center items-center">
            <div className="inline-flex gap-12 items-center">
              {[
                { name: "Toyota", img: "/icons/toyota.jpg" },
                { name: "Mercedes-Benz", img: "/icons/mercedes.jpg" },
                { name: "BMW", img: "/icons/bmw.jpg" },
                { name: "Volkswagen", img: "/icons/vw.jpg" },
                { name: "Nissan", img: "/icons/nissan.jpg" },
                { name: "Ford", img: "/icons/ford.jpg" },
                { name: "Isuzu", img: "/icons/isuzu.jpg" },
                { name: "Bosch", img: "/icons/bosch.jpg" },
              ].map((company) => (
                <Link
                  key={company.name}
                  to={`/shop?brand=${encodeURIComponent(company.name)}`} // Link to shop with brand filter
                  className="group flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={company.img}
                    alt={company.name}
                    className="w-24 h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" // Apply hover effect
                  />
                  <span className="text-sm mt-2 text-muted-foreground font-medium group-hover:text-primary transition-colors">
                    {company.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
