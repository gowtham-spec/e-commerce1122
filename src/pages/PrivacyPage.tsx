
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Eye, AlertCircle } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">How we collect, use, and protect your personal information.</p>
        
        <Separator className="my-6" />
        
        <div className="space-y-8">
          <section>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Introduction</h2>
            </div>
            <p>ValueMarket ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.</p>
            <p className="mt-2">By using our website, you consent to the collection and use of your personal information as described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use our website.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <h3 className="font-medium mt-4 mb-2">Personal Information:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping and billing address</li>
              <li>Payment information (we do not store complete credit card information)</li>
              <li>Age or date of birth (if required for certain products)</li>
            </ul>
            
            <h3 className="font-medium mt-4 mb-2">Non-Personal Information:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Device information</li>
              <li>Browsing behavior on our website</li>
              <li>Referral sources</li>
            </ul>
          </section>
          
          <section>
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">How We Use Your Information</h2>
            </div>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Processing and fulfilling your orders</li>
              <li>Sending order confirmations and updates</li>
              <li>Providing customer support</li>
              <li>Communicating about products, services, and promotions</li>
              <li>Personalizing your shopping experience</li>
              <li>Improving our website and services</li>
              <li>Preventing fraud and unauthorized access</li>
              <li>Complying with legal obligations</li>
              <li>Conducting market research and analytics</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to collect information about your browsing activities on our website. Cookies are small text files that are stored on your device when you visit our website.</p>
            <p className="mt-2">These technologies help us:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Remember your preferences</li>
              <li>Understand how you use our website</li>
              <li>Personalize your experience</li>
              <li>Measure the effectiveness of our marketing campaigns</li>
              <li>Analyze website traffic patterns</li>
            </ul>
            <p className="mt-2">You can manage your cookie preferences through your browser settings. However, disabling cookies may affect your experience on our website.</p>
          </section>
          
          <section>
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">How We Protect Your Information</h2>
            </div>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Secure Socket Layer (SSL) encryption for data transmission</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication procedures</li>
              <li>Data minimization practices</li>
              <li>Staff training on data protection</li>
            </ul>
            <p className="mt-2">While we take reasonable steps to secure your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Third-Party Disclosure</h2>
            <p>We may share your information with third parties in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>With service providers that help us operate our business (payment processors, shipping partners, etc.)</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a business transfer (merger, acquisition, etc.)</li>
              <li>With your consent</li>
            </ul>
            <p className="mt-2">We do not sell your personal information to third parties for marketing purposes.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>The right to access the personal information we hold about you</li>
              <li>The right to correct inaccurate or incomplete information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="mt-2">To exercise these rights, please contact us using the information provided at the end of this policy.</p>
          </section>
          
          <section>
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Children's Privacy</h2>
            </div>
            <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can take appropriate action.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date at the bottom of this policy.</p>
            <p className="mt-2">We recommend that you review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
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

export default PrivacyPage;
