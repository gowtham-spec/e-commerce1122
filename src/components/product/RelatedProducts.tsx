
import React from 'react';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/data/products';

interface RelatedProductsProps {
  products: Product[];
  ensureMultipleImages: (product: Product) => Product;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, ensureMultipleImages }) => {
  return (
    <>
      <Separator className="my-8" />
      <div>
        <h2 className="text-2xl font-semibold mb-4 font-poppins">Similar Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={ensureMultipleImages(relatedProduct)} />
            ))}
          </div>
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </>
  );
};

export default RelatedProducts;
