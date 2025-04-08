
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductData, ensureMultipleImages } from '@/hooks/useProductData';

// Component imports
import ProductImages from '@/components/product/ProductImages';
import ProductDetails from '@/components/product/ProductDetails';
import ProductOptions from '@/components/product/ProductOptions';
import DeliveryInfo from '@/components/product/DeliveryInfo';
import ProductActions from '@/components/product/ProductActions';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const {
    product,
    relatedProducts,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    loading
  } = useProductData(productId);

  if (loading || !product) {
    return (
      <div className="container mx-auto py-12 px-4">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 font-poppins">
      <div className="md:flex md:gap-8">
        {/* Left Column - Product Images */}
        <div className="md:w-1/2">
          <ProductImages product={product} />
        </div>

        {/* Right Column - Product Information */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          {/* Product Details */}
          <ProductDetails product={product} />
          
          {/* Product Options */}
          <ProductOptions
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          
          {/* Delivery Information */}
          <DeliveryInfo />
          
          {/* Product Actions */}
          <ProductActions
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />
          
          {/* Product Tabs */}
          <ProductTabs product={product} />
        </div>
      </div>
      
      {/* Related Products */}
      <RelatedProducts 
        products={relatedProducts} 
        ensureMultipleImages={ensureMultipleImages} 
      />
    </div>
  );
};

export default ProductPage;
