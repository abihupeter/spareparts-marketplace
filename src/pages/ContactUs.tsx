import React, { useState } from "react"
import { Mail, User, MessageSquare, Loader2, X, Bot } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Navbar from "@/components/layout/Navbar"

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, message } = form

    if (!name || !email || !message) {
      toast({ title: "All fields are required", variant: "destructive" })
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ title: "Message sent!", description: "We'll gt back to you shortly." })
      setForm({ name: "", email: "", message: "" })
    }, 1500)
  }

    return (
    
    <main className="relative max-w-7xl mx-auto px-4 py-12">
         <div className="min-h-screen bg-background">
             <Navbar />
      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowChat(false)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-black"
            >
              <X />
            </button>
            <h3 className="text-xl font-semibold mb-4">AI Assistant</h3>
            <div className="text-muted-foreground text-sm mb-2">
              👋 Hey! How can I help you today?
            </div>
            <div className="border p-3 rounded-md bg-muted/40 text-sm text-muted-foreground">
              This is a placeholder for the chatbox. You can integrate a real AI service here.
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 z-40"
      >
        <Bot className="w-5 h-5" />
      </button>

      <div className={`flex flex-col ${showMap ? "md:flex-row" : ""} gap-8`}>
        {/* Left Form + Info Panel */}
        <div className={`${showMap ? "md:w-3/5" : "w-full"}`}>
          <section className="text-center mb-10">
            <h1 className="text-4xl font-bold text-primary mb-2">Contact Us</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We'd love to hear from you! Whether you have a question, feedback, or need help finding the right part, our team is here for you.
            </p>
          </section>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-muted/30 p-6 rounded-lg shadow-sm">
            <div className="relative">
              <label htmlFor="name" className="block font-medium mb-1">Name</label>
              <User className="absolute left-3 top-10 text-muted-foreground w-4 h-4" />
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="pl-10 w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="relative">
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <Mail className="absolute left-3 top-10 text-muted-foreground w-4 h-4" />
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="pl-10 w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="relative">
              <label htmlFor="message" className="block font-medium mb-1">Message</label>
              <MessageSquare className="absolute left-3 top-10 text-muted-foreground w-4 h-4" />
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="pl-10 w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition flex items-center justify-center"
            >
              {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Direct Contact Info */}
          <div className="mt-12 border-t pt-8 space-y-2 text-muted-foreground text-sm">
            <p>📞 <a href="tel:+254700123456" className="hover:underline text-foreground">+254 700 123 456</a></p>
            <p>📧 <a href="mailto:support@partshopgo.co.ke" className="hover:underline text-foreground">support@partshopgo.co.ke</a></p>
            <p>📍 Nairobi, Kenya</p>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex justify-center gap-6">
            {[
              { name: "WhatsApp", href: "https://wa.me/254794436286", img: "/icons/whatsapp.jpg" },
              { name: "Facebook", href: "#", img: "/icons/facebook.jpg" },
              { name: "Twitter", href: "#", img: "/icons/twitter.jpg" },
              { name: "Instagram", href: "#", img: "/icons/instagram.jpg" },
            ].map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1">
                <img src={social.img} alt={social.name} className="w-8 h-8" />
                <span className="text-xs text-muted-foreground">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Map Section (conditional) */}
        {showMap && (
          <div className="md:w-2/5 h-[500px]">
            <iframe
              className="w-full h-full rounded-md"
              loading="lazy"
              title="Our Location"
              allowFullScreen
              src="https://maps.google.com/maps?q=Ruaraka,%20Nairobi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>
        )}
      </div>

      {/* Toggle Map Button */}
      <div className="mt-20 mb-10 text-center">
        <button
          onClick={() => setShowMap(!showMap)}
          className="bg-secondary border text-sm px-4 py-2 rounded-md hover:bg-muted transition"
        >
          {showMap ? "Hide Map" : "Show Map"}
        </button>
                </div>
                </div>
    </main>
  )
}
