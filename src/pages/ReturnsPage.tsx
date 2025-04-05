
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { RefreshCw, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ReturnsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Returns & Exchanges Policy</h1>
        <p className="text-muted-foreground mb-8">Our policy for returns, exchanges, and refunds.</p>
        
        <Separator className="my-6" />
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <RefreshCw className="mr-2 h-5 w-5" /> Returns Policy Overview
            </h2>
            <p>We want you to be completely satisfied with your purchase. If you're not happy with your order, we offer a 30-day return policy for most items. Please read the following guidelines to ensure a smooth return process.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Return Eligibility</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Eligible for Return</h3>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Unused, undamaged items in original packaging</li>
                    <li>Items returned within 30 days of delivery</li>
                    <li>Items that do not match product description</li>
                    <li>Defective or damaged items received</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start">
                <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Not Eligible for Return</h3>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Personalized or custom-made items</li>
                    <li>Intimate products for hygiene reasons</li>
                    <li>Digital products or downloadable software</li>
                    <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                    <li>Items showing signs of use or wear</li>
                    <li>Items without original packaging, tags, or accessories</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">How to Initiate a Return</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Log in to your account and visit the order history section.</li>
              <li>Select the order containing the item(s) you wish to return.</li>
              <li>Select the specific item(s) and reason for return.</li>
              <li>Choose your preferred refund method or request an exchange.</li>
              <li>Print the return shipping label (if provided) or note the return address.</li>
              <li>Package the item securely in its original packaging if possible.</li>
              <li>Attach the return label and ship the package.</li>
            </ol>
            <p className="mt-2">Alternatively, you can contact our customer support team at gowtham0055@gmail.com to initiate a return.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Exchange Process</h2>
            <p>If you prefer an exchange instead of a refund:</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>Follow the same process to initiate a return.</li>
              <li>Select "Exchange" as your preference.</li>
              <li>Choose the replacement item (same product in a different size/color or a different product of equal value).</li>
              <li>If the exchanged item costs more, you'll need to pay the difference.</li>
              <li>If the exchanged item costs less, we'll refund the difference.</li>
            </ol>
          </section>
          
          <Alert>
            <AlertDescription>
              Please note that exchanges are subject to product availability. If the requested exchange item is out of stock, we will issue a refund instead.
            </AlertDescription>
          </Alert>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Refund Process</h2>
            <p>Once we receive your return:</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>We will inspect the item to ensure it meets our return policy requirements.</li>
              <li>Refunds will be processed within 5-7 business days after inspection.</li>
              <li>You will receive an email notification when your refund is processed.</li>
              <li>Refunds will be issued to the original payment method used for the purchase.</li>
              <li>Please allow an additional 2-5 business days for the refund to appear in your account, depending on your bank or credit card company.</li>
            </ol>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Return Shipping</h2>
            <p className="mb-2">For returns due to our error (wrong item shipped, defective product, or damage during shipping), we will provide a prepaid return shipping label.</p>
            <p>For returns due to customer preference (change of mind, incorrect size selection, etc.), the customer is responsible for return shipping costs.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">What if my item arrives damaged?</h3>
                <p className="text-muted-foreground">If your item arrives damaged, please take photos and contact our customer service within 48 hours of delivery. We will arrange for a replacement or refund.</p>
              </div>
              
              <div>
                <h3 className="font-medium">Can I return part of my order?</h3>
                <p className="text-muted-foreground">Yes, you can return specific items from your order while keeping others.</p>
              </div>
              
              <div>
                <h3 className="font-medium">Will I get a refund for the shipping costs?</h3>
                <p className="text-muted-foreground">Original shipping charges are non-refundable unless the return is due to our error.</p>
              </div>
            </div>
          </section>
        </div>
        
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Need Help with Returns?</h2>
          <p>If you have any questions or need assistance with returns or exchanges, please contact our customer service team:</p>
          <ul className="mt-2">
            <li>Email: <a href="mailto:gowtham0055@gmail.com" className="text-primary hover:underline">gowtham0055@gmail.com</a></li>
            <li>Phone: +91 87548 41588</li>
            <li>Customer Service Hours: Monday to Saturday, 9:00 AM to 6:00 PM IST</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
