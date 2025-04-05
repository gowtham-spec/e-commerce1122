
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Truck, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ShippingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Shipping Policy</h1>
        <p className="text-muted-foreground mb-8">Information about our shipping methods, timeframes, and costs.</p>
        
        <Separator className="my-6" />
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Truck className="mr-2 h-5 w-5" /> Shipping Methods
            </h2>
            <p className="mb-4">ValueMarket offers the following shipping options:</p>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipping Method</TableHead>
                  <TableHead>Estimated Delivery</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Standard Shipping</TableCell>
                  <TableCell>3-5 business days</TableCell>
                  <TableCell>₹50 (Free on orders above ₹500)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Express Shipping</TableCell>
                  <TableCell>1-2 business days</TableCell>
                  <TableCell>₹150</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Same-Day Delivery</TableCell>
                  <TableCell>Same day (order before 12 PM)</TableCell>
                  <TableCell>₹250 (Available only in select metro cities)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5" /> Processing Time
            </h2>
            <p>Most orders are processed within 24 hours of being placed. Orders placed on weekends or public holidays will be processed on the next business day. During sale periods or special promotions, processing times may be slightly longer.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5" /> Order Tracking
            </h2>
            <p>Once your order is shipped, you will receive a confirmation email with a tracking number. You can track your order status by entering this number on our website or directly on the courier partner's website.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Shipping Restrictions</h2>
            <p>Currently, we only ship within India. We're unable to deliver to some remote locations, but we're constantly expanding our reach. If you're unsure whether we deliver to your area, please contact our customer support.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" /> Shipping Delays
            </h2>
            <p>While we strive to deliver all orders within the estimated timeframes, delays may occur due to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Incorrect or incomplete address information</li>
              <li>Adverse weather conditions</li>
              <li>Natural disasters or unforeseen events</li>
              <li>High volume during sale periods</li>
              <li>Public holidays</li>
            </ul>
            <p className="mt-2">We will notify you via email if there are any significant delays with your order.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">International Shipping</h2>
            <p>We currently do not offer international shipping. We hope to introduce this option in the future. Please check back for updates.</p>
          </section>
        </div>
        
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Questions about shipping?</h2>
          <p>If you have any questions or concerns about our shipping policies, please contact our customer service team:</p>
          <ul className="mt-2">
            <li>Email: <a href="mailto:gowtham0055@gmail.com" className="text-primary hover:underline">gowtham0055@gmail.com</a></li>
            <li>Phone: +91 87548 41588</li>
            <li>Customer Service Hours: Monday to Saturday, 9:00 AM to 6:00 PM IST</li>
          </ul>
        </div>
        
        <div className="mt-6 text-center">
          <p>For information about returns, please see our <Link to="/returns" className="text-primary hover:underline">Returns & Exchanges Policy</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
