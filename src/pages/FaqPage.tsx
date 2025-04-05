
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">Find answers to common questions about our products and services.</p>
        
        <Separator className="my-6" />
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I place an order?</AccordionTrigger>
            <AccordionContent>
              You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Follow the steps to enter your shipping and payment information to complete your order.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), net banking, UPI, and cash on delivery for eligible orders.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>How long will it take to receive my order?</AccordionTrigger>
            <AccordionContent>
              Standard delivery typically takes 3-5 business days. Express delivery options are available at checkout for faster processing, usually within 1-2 business days. Delivery times may vary based on your location.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We offer a 30-day return policy for most items. Products must be in their original condition with packaging. Some items like personalized products may not be eligible for returns. Please see our <Link to="/returns" className="text-primary hover:underline">Returns Policy</Link> for more details.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>How do I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order is shipped, you will receive a tracking number via email. You can use this tracking number on our website or the courier's website to track your package.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
            <AccordionContent>
              Currently, we only ship within India. We're working on expanding our shipping options to international destinations in the future.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
            <AccordionContent>
              You can contact our customer support team by email at gowtham0055@gmail.com, by phone at +91 87548 41588, or by using the contact form at the bottom of our website. Our support team is available Monday through Saturday, 9:00 AM to 6:00 PM IST.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-8">
            <AccordionTrigger>Are there any discounts available?</AccordionTrigger>
            <AccordionContent>
              Yes, we regularly offer discounts and promotions. Check our "Today's Deals" section for current offers. You can also subscribe to our newsletter to stay updated on upcoming sales and exclusive deals.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-9">
            <AccordionTrigger>What if I receive a damaged item?</AccordionTrigger>
            <AccordionContent>
              If you receive a damaged item, please contact our customer support within 48 hours with photos of the damaged product. We'll arrange for a replacement or refund as per your preference.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-10">
            <AccordionTrigger>Do you have a loyalty program?</AccordionTrigger>
            <AccordionContent>
              Yes, we have a ValueMarket Rewards program where you earn points on every purchase. These points can be redeemed for discounts on future orders. Sign up for an account to start earning rewards.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-12 p-6 bg-muted rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
          <p className="mb-4">Our customer support team is here to help you.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
            <span className="text-muted-foreground">|</span>
            <a href="mailto:gowtham0055@gmail.com" className="text-primary hover:underline">Email Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
