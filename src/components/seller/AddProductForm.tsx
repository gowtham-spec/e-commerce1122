
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, ImagePlus } from 'lucide-react';

const categories = [
  'Electronics', 
  'Clothing', 
  'Home', 
  'Beauty',
  'Books', 
  'Sports', 
  'Toys', 
  'Grocery',
  'Furniture', 
  'Stationery', 
  'Accessories',
  'Smartphones',
  'Audio',
  'Laptops',
  'Fragrances',
  'Peripherals'
];

const AddProductForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    stock: '',
    sizes: '',
    colors: '',
    images: [] as File[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setProductData(prev => ({ ...prev, images: [...prev.images, ...filesArray] }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate
    if (!productData.name || !productData.price || !productData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // Convert price and stock to numbers
    const price = parseFloat(productData.price);
    const stock = parseInt(productData.stock || '0');
    
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Product Added!",
        description: "Your product has been successfully added.",
      });
      setIsLoading(false);
      // Reset form
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        stock: '',
        sizes: '',
        colors: '',
        images: []
      });
    }, 1500);
  };

  const removeImage = (index: number) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="add-product-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="Enter price in INR"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={productData.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Input
                id="subcategory"
                name="subcategory"
                value={productData.subcategory}
                onChange={handleChange}
                placeholder="Enter subcategory (optional)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Available Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={productData.stock}
                onChange={handleChange}
                min="0"
                step="1"
                placeholder="Enter available quantity"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sizes">Available Sizes</Label>
              <Input
                id="sizes"
                name="sizes"
                value={productData.sizes}
                onChange={handleChange}
                placeholder="S, M, L, XL (comma separated)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="colors">Available Colors</Label>
              <Input
                id="colors"
                name="colors"
                value={productData.colors}
                onChange={handleChange}
                placeholder="Red, Blue, Green (comma separated)"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your product..."
            />
          </div>
          
          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
              {productData.images.map((file, index) => (
                <div key={index} className="relative border rounded-md overflow-hidden h-24">
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={`Preview ${index}`} 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="destructive" 
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0" 
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <div className="border border-dashed rounded-md flex items-center justify-center p-4 h-24">
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">Upload Image</span>
                  <Input 
                    id="image-upload" 
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          form="add-product-form"
          type="submit"
          className="w-full bg-purple-gradient hover:shadow-purple-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            'Adding Product...'
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddProductForm;
