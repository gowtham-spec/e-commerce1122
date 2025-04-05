
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-8">Please read these terms and conditions carefully before using ValueMarket.</p>
        
        <Separator className="my-6" />
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p>These Terms and Conditions govern your use of ValueMarket (the "Website") and the services offered through it. By accessing or using the Website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use the Website.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">2. Definitions</h2>
            <p>In these Terms:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>"We", "us", "our", and "ValueMarket" refer to the owners and operators of ValueMarket.</li>
              <li>"You", "your", and "user" refer to the individual or entity accessing or using the Website.</li>
              <li>"Products" refers to the items available for purchase on the Website.</li>
              <li>"Services" refers to any services provided through the Website.</li>
              <li>"Content" refers to all information, text, graphics, photos, videos, and other materials on the Website.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">3. Account Registration</h2>
            <p>To access certain features of the Website, you may need to create an account. When creating an account, you must:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Provide accurate, current, and complete information.</li>
              <li>Maintain the security of your account credentials.</li>
              <li>Be responsible for all activities that occur under your account.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
            </ul>
            <p className="mt-2">We reserve the right to suspend or terminate your account if we suspect any violation of these Terms.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">4. Product Information</h2>
            <p>We strive to provide accurate product descriptions, pricing, and availability information. However:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Product colors may vary slightly from their appearance on the Website due to device display settings.</li>
              <li>We reserve the right to limit quantities of products available for purchase.</li>
              <li>We do not guarantee the availability of any product.</li>
              <li>Prices are subject to change without notice.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">5. Orders and Payment</h2>
            <p>By placing an order, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Pay the specified price plus shipping and any applicable taxes.</li>
              <li>Provide accurate shipping and billing information.</li>
              <li>Use valid and authorized payment methods.</li>
            </ul>
            <p className="mt-2">We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraud.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">6. Shipping and Delivery</h2>
            <p>Please refer to our <Link to="/shipping" className="text-primary hover:underline">Shipping Policy</Link> for detailed information about shipping methods, timeframes, and costs.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">7. Returns and Refunds</h2>
            <p>Please refer to our <Link to="/returns" className="text-primary hover:underline">Returns & Exchanges Policy</Link> for detailed information about our return, exchange, and refund procedures.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">8. Intellectual Property</h2>
            <p>All content on the Website, including but not limited to text, graphics, logos, button icons, images, audio clips, and software, is the property of ValueMarket or its content suppliers and is protected by Indian and international copyright, trademark, and other intellectual property laws.</p>
            <p className="mt-2">You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any material on our Website without our prior written consent.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">9. User Conduct</h2>
            <p>When using the Website, you agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Violate any applicable laws or regulations.</li>
              <li>Infringe upon the rights of others.</li>
              <li>Use the Website for any unauthorized or illegal purpose.</li>
              <li>Interfere with or disrupt the Website's functionality.</li>
              <li>Attempt to gain unauthorized access to any part of the Website.</li>
              <li>Use any automated system or software to extract data from the Website.</li>
              <li>Submit false, misleading, or inaccurate information.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">10. Privacy</h2>
            <p>Your privacy is important to us. Please refer to our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for information about how we collect, use, and disclose your personal information.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">11. Disclaimer of Warranties</h2>
            <p>The Website and its content are provided on an "as is" and "as available" basis. ValueMarket makes no warranties, expressed or implied, regarding the Website's operation or the content, information, materials, or products included on the Website.</p>
            <p className="mt-2">To the fullest extent permissible by applicable law, ValueMarket disclaims all warranties, including but not limited to implied warranties of merchantability and fitness for a particular purpose.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">12. Limitation of Liability</h2>
            <p>ValueMarket shall not be liable for any damages of any kind arising from the use of the Website, including but not limited to direct, indirect, incidental, punitive, and consequential damages.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">13. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless ValueMarket, its officers, directors, employees, agents, and suppliers from and against all claims, losses, expenses, damages, and costs resulting from any violation of these Terms or any activity related to your account.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">14. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the Website. Your continued use of the Website after changes are posted constitutes your acceptance of the modified Terms.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">15. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">16. Contact Information</h2>
            <p>If you have any questions or concerns about these Terms, please contact us at:</p>
            <ul className="mt-2">
              <li>Email: <a href="mailto:gowtham0055@gmail.com" className="text-primary hover:underline">gowtham0055@gmail.com</a></li>
              <li>Phone: +91 87548 41588</li>
              <li>Address: No.4 1st Street, Krishna Nagar, Nerkundram, Chennai 107</li>
            </ul>
          </section>
        </div>
        
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
