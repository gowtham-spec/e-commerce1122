
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, categories } from '@/data/products';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();

  const heroSlides = [
    {
      id: 1,
      title: "Premium Stationery Collection",
      description: "Discover our curated selection of high-quality writing instruments and notebooks.",
      buttonText: "Shop Stationery",
      buttonLink: "/category/stationery",
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200"
    },
    {
      id: 2,
      title: "Elevate Your Home",
      description: "Transform your living space with our stylish furniture and appliances.",
      buttonText: "Shop Furniture",
      buttonLink: "/category/furniture",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section>
        <Carousel className="w-full">
          <CarouselContent>
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative h-[60vh] min-h-[400px] w-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="max-w-md text-white">
                        <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                        <p className="text-lg mb-6">{slide.description}</p>
                        <Button asChild size="lg">
                          <Link to={slide.buttonLink}>{slide.buttonText}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[16/9] relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90 mb-4">{category.description}</p>
                      <Button variant="secondary" size="sm" className="group-hover:translate-x-1 transition-transform">
                        Explore {category.name} <span className="ml-1">→</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary hover:underline flex items-center">
              View All <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
            <p className="text-white/90 text-lg mb-6">
              Get 15% off on all stationery products this week. Use code STATIONERY15 at checkout.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/category/stationery">Shop Now</Link>
            </Button>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1200"
                alt="Special Offer"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-secondary text-primary font-bold rounded-full h-20 w-20 flex items-center justify-center text-center">
                <div>
                  <div className="text-xl">15%</div>
                  <div className="text-sm">OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-muted-foreground">Curated selection of the highest quality products from trusted brands.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and reliable shipping to get your products to you when you need them.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292V12H5.698A5.01 5.01 0 0112 4.354z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 12H5.698A5.01 5.01 0 0010 4.354V12z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 12h4.302A5.01 5.01 0 0014 4.354V12z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12h2.302A5.01 5.01 0 0116 4.354V12z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
              <p className="text-muted-foreground">Dedicated support team to assist you with any questions or concerns.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
