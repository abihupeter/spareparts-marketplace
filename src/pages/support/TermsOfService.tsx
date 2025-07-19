import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar alwaysVisible />
      <main className="container mx-auto px-4 py-8 flex-grow pt-20">
        <Card className="max-w-4xl mx-auto shadow-lg prose dark:prose-invert pt-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Terms of Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              **Last updated: July 19, 2025**
            </p>
            <p>
              Please read these terms and conditions carefully before using Our
              Service.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Interpretation and Definitions
            </h2>
            <h3 className="text-xl font-semibold mt-4 mb-1">Interpretation</h3>
            <p>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-1">Definitions</h3>
            <ul>
              <li>
                **Account** means a unique account created for You to access our
                Service or parts of our Service.
              </li>
              <li>
                **Company** (referred to as either "the Company", "We", "Us" or
                "Our" in this Agreement) refers to SparePart Marketplace.
              </li>
              <li>**Country** refers to: Kenya</li>
              <li>
                **Device** means any device that can access the Service such as
                a computer, a cellphone or a digital tablet.
              </li>
              <li>**Service** refers to the Website.</li>
              <li>
                **Terms and Conditions** (also referred as "Terms") mean these
                Terms and Conditions that form the entire agreement between You
                and the Company regarding the use of the Service.
              </li>
              <li>
                **Third-party Social Media Service** means any services or
                content (including data, information, products or services)
                provided by a third-party that may be displayed, included or
                made available by the Service.
              </li>
              <li>
                **Website** refers to SparePart Marketplace, accessible from
                [Your Website URL Here]
              </li>
              <li>
                **You** means the individual accessing or using the Service, or
                the company, or other legal entity on behalf of which such
                individual is accessing or using the Service, as applicable.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Acknowledgement
            </h2>
            <p>
              These are the Terms and Conditions governing the use of this
              Service and the agreement that operates between You and the
              Company. These Terms and Conditions set out the rights and
              obligations of all users regarding the use of the Service.
            </p>
            <p>
              Your access to and use of the Service is conditioned on Your
              acceptance of and compliance with these Terms and Conditions.
              These Terms and Conditions apply to all visitors, users and others
              who access or use the Service.
            </p>
            <p>
              By accessing or using the Service You agree to be bound by these
              Terms and Conditions. If You disagree with any part of these Terms
              and Conditions then You may not access the Service.
            </p>
            <p>
              You represent that you are over the age of 18. The Company does
              not permit those under 18 to use the Service.
            </p>
            <p>
              Your access to and use of the Service is also conditioned on Your
              acceptance of and compliance with the Privacy Policy of the
              Company. Our Privacy Policy describes Our policies and procedures
              on the collection, use and disclosure of Your personal information
              when You use the Application or the Website and tells You about
              Your privacy rights and how the law protects You. Please read Our
              Privacy Policy carefully before using Our Service.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Links to Other Websites
            </h2>
            <p>
              Our Service may contain links to third-party web sites or services
              that are not owned or controlled by the Company.
            </p>
            <p>
              The Company has no control over, and assumes no responsibility
              for, the content, privacy policies, or practices of any third
              party web sites or services. You further acknowledge and agree
              that the Company shall not be responsible or liable, directly or
              indirectly, for any damage or loss caused or alleged to be caused
              by or in connection with the use of or reliance on any such
              content, goods or services available on or through any such web
              sites or services.
            </p>
            <p>
              We strongly advise You to read the terms and conditions and
              privacy policies of any third-party web sites or services that You
              visit.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Termination</h2>
            <p>
              We may terminate or suspend Your Account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if You breach these Terms and Conditions.
            </p>
            <p>
              Upon termination, Your right to use the Service will cease
              immediately. If You wish to terminate Your Account, You may simply
              discontinue using the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Governing Law</h2>
            <p>
              The laws of the Country, excluding its conflicts of law rules,
              shall govern this Terms and Your use of the Service. Your use of
              the Application may also be subject to other local, state,
              national, or international laws.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Disputes Resolution
            </h2>
            <p>
              If You have any concern or dispute about the Service, You agree to
              first try to resolve the dispute informally by contacting the
              Company.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Severability and Waiver
            </h2>
            <h3 className="text-xl font-semibold mt-4 mb-1">Severability</h3>
            <p>
              If any provision of these Terms is held to be unenforceable or
              invalid, such provision will be changed and interpreted to
              accomplish the objectives of such provision to the greatest extent
              possible under applicable law and the remaining provisions will
              continue in full force and effect.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-1">Waiver</h3>
            <p>
              Except as provided herein, the failure to exercise a right or to
              require performance of an obligation under these Terms shall not
              affect a party's ability to exercise such right or require such
              performance at any time thereafter nor shall be the waiver of a
              breach constitute a waiver of any subsequent breach.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
              Changes to These Terms and Conditions
            </h2>
            <p>
              We reserve the right, at Our sole discretion, to modify or replace
              these Terms at any time. If a revision is material We will make
              reasonable efforts to provide at least 30 days' notice prior to
              any new terms taking effect. What constitutes a material change
              will be determined at Our sole discretion.
            </p>
            <p>
              By continuing to access or use Our Service after those revisions
              become effective, You agree to be bound by the revised terms. If
              You do not agree to the new terms, in whole or in part, please
              stop using the website and the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, You
              can contact us:
            </p>
            <ul>
              <li>By email: support@tayarispares.co.ke</li>
              <li>
                By visiting our website
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
