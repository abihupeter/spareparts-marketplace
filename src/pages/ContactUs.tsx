import React, { useState } from "react";
import {
  Mail,
  User,
  MessageSquare,
  Loader2,
  X,
  Bot,
  Instagram,
  Twitter,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = form;

    if (!name || !email || !message) {
      toast({ title: "All fields are required", variant: "destructive" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message sent!", description: "We'll get back to you shortly." });
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    setChatResponse("Let me help you with that...");
    setTimeout(() => {
      setChatResponse(`You said: "${chatInput}". We'll assist you shortly.`);
    }, 1000);
    setChatInput("");
  };

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />

      {/* Floating AI Chat Button */}
      <div className="fixed bottom-10 right-12 z-50 flex flex-col items-end gap-2">
        {showChat && (
          <div className="relative max-w-sm w-full bg-white border border-muted shadow-lg rounded-xl p-5">
            <button
              className="absolute top-2 right-10 text-muted-foreground hover:text-black"
              onClick={() => setShowChat(false)}
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <div className="relative bg-primary text-white p-4 rounded-xl text-sm max-w-[85%] ml-auto">
                {chatResponse || "Hi! How can I help you today?"}
                <div className="absolute top-3 -left-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-primary" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="How can we help?"
                className="flex-1 px-3 py-2 text-sm border rounded-md outline-none focus:ring-2 focus:ring-primary"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button
                onClick={handleChatSubmit}
                className="bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 text-sm"
              >
                Send
              </button>
            </div>
          </div>
        )}

        <div className="relative group">
          <button
            onClick={() => setShowChat((prev) => !prev)}
            className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition"
          >
            <Bot className="w-5 h-5" />
          </button>
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Talk to an AI Assistant
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col ${
          showMap ? "md:flex-row" : ""
        } gap-8 max-w-7xl mx-auto px-4 py-12`}
      >
        {/* Form Section */}
        <div className={`${showMap ? "md:w-3/5" : "w-full"}`}>
          <section className="text-center mb-10">
            <h1 className="text-4xl font-bold text-primary mb-2">Contact Us</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We'd love to hear from you! Whether you have a question, feedback,
              or need help finding the right part, our team is here for you.
            </p>
          </section>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-muted/30 p-6 rounded-lg shadow-sm"
          >
            {/* Name */}
            <div className="relative">
              <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label>
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

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
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

            {/* Message */}
            <div className="relative">
              <label htmlFor="message" className="block font-medium mb-1">
                Message
              </label>
              <MessageSquare className="absolute left-3 top-10 text-muted-foreground w-4 h-4" />
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="pl-10 w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
              />
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

          {/* Contact Info */}
          <div className="mt-12 border-t pt-8 space-y-2 text-muted-foreground text-sm">
            <p>
              📞{" "}
              <a
                href="tel:+254794436286"
                className="hover:underline text-foreground"
              >
                +254 700 123 456
              </a>
            </p>
            <p>
              📧{" "}
              <a
                href="mailto:abihupita@gmail.com"
                className="hover:underline text-foreground"
              >
                tayarispares.co.ke
              </a>
            </p>
            <p>📍 Nairobi, Kenya</p>
          </div>

          {/* Social Media */}
          <div className="mt-6 flex justify-center gap-6">
            <a
              href="https://wa.me/254794436286"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 hover:text-primary transition hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs text-muted-foreground hover:underline">
                WhatsApp
              </span>
            </a>

            <a
              href="https://www.instagram.com/pierr.e095/"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 hover:text-primary transition hover:scale-105"
            >
              <Facebook className="w-5 h-5" />
              <span className="text-xs text-muted-foreground hover:underline">
                Facebook
              </span>
            </a>

            <a
              href="https://x.com/?lang=en"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 hover:text-primary transition  hover:scale-105"
            >
              <Twitter className="w-5 h-5" />
              <span className="text-xs text-muted-foreground hover:underline">
                Twitter
              </span>
            </a>

            <a
              href="https://www.instagram.com/pierr.e095/"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 hover:text-primary transition hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-xs text-muted-foreground hover:underline">
                Instagram
              </span>
            </a>
          </div>
        </div>

        {/* Map Section */}
        {showMap && (
          <div className="mt-10 md:w-2/5 h-[500px]">
            <iframe
              className="w-full h-full rounded-md"
              loading="lazy"
              title="Our Location"
              allowFullScreen
              src="https://maps.google.com/maps?q=Ruaraka,%20Nairobi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        )}
      </div>

      {/* Toggle Map Button */}
      <div className="mt-10 mb-10 flex justify-center">
        <button
          onClick={() => setShowMap(!showMap)}
          className="bg-secondary border text-sm px-4 py-2 rounded-md hover:bg-muted transition flex items-center gap-2"
        >
          <img src="/icons/map.png" alt="Map Icon" className="w-4 h-4" />
          {showMap ? "Hide Map" : "Show Map"}
        </button>
      </div>
      <Footer />
    </main>
  );
}
