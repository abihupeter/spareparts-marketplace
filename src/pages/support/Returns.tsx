import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function Returns() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar alwaysVisible />
      <main className="container mx-auto px-4 py-8 flex-grow pt-20">
        <Card className="max-w-4xl mx-auto shadow-lg prose dark:prose-invert">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Returns Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              **Last updated: July 19, 2025**
            </p>
            <p>
              We want you to be completely satisfied with your purchase from
              SparePart Marketplace. If for any reason you are not, we offer a
              straightforward returns process.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
              30-Day Return Window
            </h2>
            <p>
              You have 30 calendar days from the date you received your item to
              initiate a return.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Eligibility for Returns
            </h2>
            <p>
              To be eligible for a return, your item must meet the following
              conditions:
            </p>
            <ul>
              <li>
                **Unused and in original condition:** The item must be unused,
                undamaged, and in the same condition that you received it.
              </li>
              <li>
                **Original packaging:** The item must be in its original
                packaging, including all accessories, manuals, and free gifts
                (if any).
              </li>
              <li>
                **Proof of purchase:** You must have the receipt or proof of
                purchase.
              </li>
              <li>
                **Non-returnable items:** Certain types of items cannot be
                returned, such as:
                <ul>
                  <li>Custom-made or personalized products.</li>
                  <li>Hazardous materials, flammable liquids, or gases.</li>
                  <li>Gift cards.</li>
                  <li>Downloadable software products.</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
              How to Initiate a Return
            </h2>
            <p>To start a return, please follow these steps:</p>
            <ol>
              <li>
                **Contact Us:** Send an email to support@partshopgo.co.ke with
                your order number, the item(s) you wish to return, and the
                reason for the return. You can also call us at +254 700 123 456.
              </li>
              <li>
                **Return Authorization:** Our customer service team will review
                your request and, if eligible, provide you with a Return
                Authorization (RA) number and instructions on where to send your
                item. Do not send items back without an RA number.
              </li>
              <li>
                **Package the Item:** Securely pack the item(s) in their
                original packaging, including all original contents. Write the
                RA number clearly on the outside of the package.
              </li>
              <li>
                **Ship the Item:** You will be responsible for paying for your
                own shipping costs for returning your item. Shipping costs are
                non-refundable. We recommend using a trackable shipping service
                or purchasing shipping insurance, as we cannot guarantee that we
                will receive your returned item.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Refunds</h2>
            <p>
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
            </p>
            <ul>
              <li>
                If approved, your refund will be processed, and a credit will
                automatically be applied to your original method of payment,
                within a certain amount of days.
              </li>
              <li>
                If rejected (e.g., item is not in original condition), we will
                inform you of the reason.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Exchanges</h2>
            <p>
              If you need to exchange an item for a different one, please
              contact us. We will guide you through the process, which typically
              involves returning the original item for a refund and placing a
              new order for the desired item.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Damaged or Incorrect Items
            </h2>
            <p>
              If you received a damaged or incorrect item, please contact us
              immediately (within 48 hours of delivery) with photos of the item
              and packaging. We will arrange for a replacement or refund at no
              additional cost to you.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
            <p>
              If you have any questions about our Returns Policy, please contact
              us:
            </p>
            <ul>
              <li>By email: support@tayarispares.co.ke</li>
              <li>By phone: +254 794 436 286</li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
