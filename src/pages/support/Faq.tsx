import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

export default function Faq() {
  const faqs = [
    {
      question: "What types of spare parts do you sell?",
      answer:
        "We sell a wide range of genuine OEM and high-quality aftermarket spare parts for various vehicle makes and models, including engine parts, brake systems, filters, electrical components, suspension parts, and more.",
    },
    {
      question: "How can I find the right part for my vehicle?",
      answer:
        "You can use our search bar to look for parts by name, part number, or vehicle model. Our 'Shop' page also allows you to filter by category, brand, and price range to help you narrow down your search.",
    },
    {
      question: "Do you offer nationwide delivery in Kenya?",
      answer:
        "Yes, we offer fast and reliable nationwide shipping across Kenya. Delivery times may vary depending on your location, but typically range from 2-5 business days.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items, provided they are in their original condition and packaging. Please refer to our 'Returns' page for detailed information and instructions on how to initiate a return.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@partshopgo.co.ke, by phone at +254 700 123 456, or by using the contact form on our 'Contact Us' page. We are available 24/7 to assist you.",
    },
    {
      question: "Are your parts genuine?",
      answer:
        "We prioritize genuine parts. We source directly from manufacturers and trusted distributors to ensure all our OEM parts are authentic. Aftermarket parts are selected for their high quality and reliability.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "In this demo, payment is not processed. In a live environment, we would accept various secure payment methods, including mobile money (M-Pesa), credit/debit cards, and bank transfers.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col ">
      <Navbar alwaysVisible />
      <main className="container mx-auto px-4 py-8 flex-grow pt-20">
        <Card className="max-w-4xl mx-auto shadow-lg prose dark:prose-invert ">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-lg hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
