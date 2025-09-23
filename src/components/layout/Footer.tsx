import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="font-fonarto text-black text-[40px] font-bold text-4xl text-white">
              Tayari Spares🔧{" "}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline hover:scale-105"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline hover:scale-105 "
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline hover:scale-105"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline hover:scale-105"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline hover:scale-105"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline hover:scale-105"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline hover:scale-105"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline hover:scale-105"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground hover:scale-105">
              <p>📧 support@tayarispares.com</p>
              <p>📞 +254 794 436 286</p>
              <p>
                📍 123 Milimani Ave
                <br />
                CarWash, Kasarani 201
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            ©2025 TayariSpares. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
