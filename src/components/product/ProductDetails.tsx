
import React from 'react';
import { Star } from 'lucide-react';
import { formatPriceToINR } from '@/utils/priceFormatter';
import { Product } from '@/data/products';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 font-poppins">{product.name}</h1>
      <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>

      <div className="flex items-center mb-4">
        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
        <span className="text-gray-600">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">{formatPriceToINR(product.price)}</p>
        <p className="text-gray-600">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
