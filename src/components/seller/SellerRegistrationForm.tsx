
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Store, ArrowRight } from 'lucide-react';

const SellerRegistrationForm = () => {
  const { becomeSeller, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    taxId: '',
    businessDescription: '',
    agreeTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreeTerms) {
      await becomeSeller();
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your business name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Your phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="ZIP Code"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxId">Tax ID / GST Number</Label>
            <Input
              id="taxId"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              placeholder="Your tax ID or GST number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessDescription">Business Description</Label>
            <Textarea
              id="businessDescription"
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleChange}
              placeholder="Tell us about your business and products"
              rows={4}
              required
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={formData.agreeTerms}
              onCheckedChange={handleCheckboxChange}
              required
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the Terms of Service, Privacy Policy, and Seller Agreement
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-purple-gradient hover:shadow-purple-lg"
            disabled={isLoading || !formData.agreeTerms}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <Store className="mr-2 h-4 w-4" />
                Become a Seller
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="bg-muted p-4 rounded-md space-y-2 text-sm">
        <h3 className="font-medium">Benefits of being a Value Market seller:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reach millions of customers</li>
          <li>Easy-to-use seller dashboard</li>
          <li>Fast payments processing</li>
          <li>Comprehensive sales analytics</li>
          <li>Dedicated seller support</li>
        </ul>
      </div>
    </div>
  );
};

export default SellerRegistrationForm;
