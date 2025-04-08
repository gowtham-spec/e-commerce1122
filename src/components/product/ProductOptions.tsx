
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/data/products';

interface ProductOptionsProps {
  product: Product;
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor
}) => {
  return (
    <div>
      <Separator className="my-4" />
      
      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Select Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSize(size)}
                className="min-w-[60px]"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Select Color</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-primary' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOptions;
