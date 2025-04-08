
import { useState, useEffect } from 'react';
import { Product, getProductById, getRelatedProducts } from '@/data/products';

// Ensure every product has at least 3 images
export const ensureMultipleImages = (product: Product) => {
  if (product.images.length < 3) {
    // If the product has fewer than 3 images, duplicate the first image
    const images = [...product.images];
    while (images.length < 3) {
      const nextIndex = images.length % product.images.length;
      images.push(product.images[nextIndex]);
    }
    return { ...product, images };
  }
  return product;
};

export const useProductData = (productId: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (productId) {
      setLoading(true);
      // Look for the product in productsData directly first
      let foundProduct = getProductById(productId);
      
      // If not found, check if it's a deal item (using ID from dealsData)
      if (!foundProduct) {
        import('@/data/dealsData').then(({ default: dealsData }) => {
          const dealItem = dealsData.find(deal => deal.id === productId);
          if (dealItem) {
            // Create a product-like object from the deal item
            foundProduct = {
              id: dealItem.id,
              name: dealItem.name,
              description: dealItem.description,
              price: dealItem.discountedPrice,
              images: [dealItem.image, dealItem.image, dealItem.image], // Use same image 3 times
              category: dealItem.category,
              brand: dealItem.brand,
              rating: 4.5, // Default rating
              reviewCount: 10, // Default review count
              stock: 10, // Default stock
              featured: true
            };
            
            setProduct(foundProduct);
            
            // Set default size and color if available
            if (foundProduct.sizes && foundProduct.sizes.length > 0) {
              setSelectedSize(foundProduct.sizes[0]);
            }
            
            if (foundProduct.colors && foundProduct.colors.length > 0) {
              setSelectedColor(foundProduct.colors[0]);
            }
            
            // Get related products that match category
            const related = getRelatedProducts(foundProduct, 4);
            setRelatedProducts(related);
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
      } else {
        // Handle regular product
        const enhancedProduct = ensureMultipleImages(foundProduct);
        setProduct(enhancedProduct);
        
        // Set default size and color if available
        if (enhancedProduct.sizes && enhancedProduct.sizes.length > 0) {
          setSelectedSize(enhancedProduct.sizes[0]);
        }
        
        if (enhancedProduct.colors && enhancedProduct.colors.length > 0) {
          setSelectedColor(enhancedProduct.colors[0]);
        }
        
        // Get related products that match name keywords or from the same category
        const related = getRelatedProducts(enhancedProduct, 4);
        setRelatedProducts(related);
        setLoading(false);
      }
    }
  }, [productId]);

  return {
    product,
    relatedProducts,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    loading,
    ensureMultipleImages
  };
};
