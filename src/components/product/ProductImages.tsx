
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Product } from '@/data/products';

interface ProductImagesProps {
  product: Product;
}

const ProductImages: React.FC<ProductImagesProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);

  return (
    <div>
      {/* Main Product Image */}
      <div className="relative mb-4 border border-gray-200 rounded-lg overflow-hidden">
        <AspectRatio ratio={1/1} className="bg-white">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-full object-contain p-6"
          />
        </AspectRatio>
        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute top-4 left-4 bg-orange-500">Limited Stock</Badge>
        )}
        
        {product.stock === 0 && (
          <Badge variant="destructive" className="absolute top-4 left-4">Out of Stock</Badge>
        )}
        
        {product.featured && (
          <Badge className="absolute top-4 right-4 bg-primary">Featured</Badge>
        )}
      </div>
      
      {/* Thumbnails Side by Side */}
      <div className="grid grid-cols-3 gap-2">
        {product.images.map((image, index) => (
          <div 
            key={index}
            className={`border rounded-md cursor-pointer transition-all ${
              selectedImage === image 
                ? 'border-primary ring-2 ring-primary' 
                : 'border-gray-200 hover:border-gray-400'
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <AspectRatio ratio={1/1} className="bg-white">
              <img
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                className="w-full h-full object-contain p-2"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
