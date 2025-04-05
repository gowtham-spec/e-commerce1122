
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ChevronDown, Filter, GridIcon, LayoutList, SlidersHorizontal, X } from 'lucide-react';
import { products, categoriesEnhanced, subcategories, Category, Subcategory, filterProducts, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ScrollArea } from '@/components/ui/scroll-area';

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentSubcategories, setCurrentSubcategories] = useState<Subcategory[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Determine unique brands in the category for the filter
  const brands = React.useMemo(() => {
    const brandsSet = new Set<string>();
    
    const relevantProducts = categoryId
      ? products.filter(product => product.category === categoryId)
      : products;
      
    relevantProducts.forEach(product => {
      brandsSet.add(product.brand);
    });
    
    return Array.from(brandsSet).sort();
  }, [categoryId]);

  // Determine price range for the category
  useEffect(() => {
    const categoryProducts = categoryId
      ? products.filter(product => product.category === categoryId)
      : products;
    
    if (categoryProducts.length > 0) {
      const prices = categoryProducts.map(p => p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setPriceRange([min, max]);
      setMinPrice(min);
      setMaxPrice(max);
    }
  }, [categoryId]);

  // Find current category and its subcategories
  useEffect(() => {
    if (categoryId) {
      const category = categoriesEnhanced.find(c => c.id === categoryId) || null;
      setCurrentCategory(category);
      
      const relatedSubcategories = subcategories.filter(s => s.categoryId === categoryId);
      setCurrentSubcategories(relatedSubcategories);
    } else {
      setCurrentCategory(null);
      setCurrentSubcategories([]);
    }
  }, [categoryId]);

  // Apply filters and get filtered products
  useEffect(() => {
    const filtered = filterProducts({
      category: categoryId,
      subcategory: subcategoryId,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minRating,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      inStock: inStockOnly
    });
    
    // Apply sorting
    let sortedProducts = [...filtered];
    switch (sortOption) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo purposes, use the product ID as a proxy for "newest"
        sortedProducts.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        // Featured products at top, then sort by rating
        sortedProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }
    
    setFilteredProducts(sortedProducts);
  }, [
    categoryId, 
    subcategoryId, 
    priceRange, 
    selectedBrands, 
    sortOption, 
    inStockOnly, 
    minRating
  ]);

  const resetFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setMinRating(0);
  };

  // Build breadcrumb navigation elements
  const breadcrumbs = React.useMemo(() => {
    const items = [{ name: 'Home', path: '/' }];
    
    if (categoryId && currentCategory) {
      items.push({ 
        name: currentCategory.name, 
        path: `/category/${categoryId}` 
      });
      
      if (subcategoryId) {
        const subcat = subcategories.find(s => s.id === subcategoryId);
        if (subcat) {
          items.push({ 
            name: subcat.name, 
            path: `/category/${categoryId}/${subcategoryId}` 
          });
        }
      }
    } else {
      items.push({ name: 'All Products', path: '/products' });
    }
    
    return items;
  }, [categoryId, currentCategory, subcategoryId]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm mb-6">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.path}>
            {index > 0 && <ChevronDown className="h-4 w-4 transform -rotate-90 text-gray-400" />}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium">{item.name}</span>
            ) : (
              <Link to={item.path} className="text-gray-500 hover:text-gray-700">
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Category Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {currentCategory?.name || 'All Products'}
        </h1>
        {currentCategory && (
          <p className="text-gray-600 mt-2">
            {currentCategory.description || `Browse our selection of ${currentCategory.name} products`}
          </p>
        )}
      </div>

      {/* Subcategories (if available) */}
      {currentSubcategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Subcategories</h2>
          <div className="flex flex-wrap gap-2">
            {currentSubcategories.map((subcat) => (
              <Link 
                key={subcat.id}
                to={`/category/${categoryId}/${subcat.id}`}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  subcategoryId === subcat.id 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-background hover:bg-muted border-input'
                }`}
              >
                {subcat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="lg:flex gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="space-y-6">
            {/* Filter Header with Reset */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Filters</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            </div>

            <Separator />
            
            {/* Brand Filter */}
            <div>
              <h3 className="font-medium mb-3">Brands</h3>
              <ScrollArea className="h-40 pr-4">
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox 
                        id={`brand-${brand}`} 
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(selectedBrands.filter(b => b !== brand));
                          }
                        }}
                      />
                      <label 
                        htmlFor={`brand-${brand}`}
                        className="text-sm ml-2 cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <Separator />
            
            {/* Sort Filter */}
            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            {/* Rating Filter */}
            <div>
              <h3 className="font-medium mb-3">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={minRating === rating}
                      onCheckedChange={(checked) => {
                        setMinRating(checked ? rating : 0);
                      }}
                    />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="text-sm ml-2 flex items-center cursor-pointer"
                    >
                      <span className="mr-2">{rating}+</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Availability Filter */}
            <div>
              <div className="flex items-center">
                <Checkbox
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={(checked) => {
                    setInStockOnly(checked as boolean);
                  }}
                />
                <label 
                  htmlFor="in-stock"
                  className="text-sm ml-2 cursor-pointer"
                >
                  In Stock Only
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Filter className="h-4 w-4 mr-2" /> 
            Filters
          </Button>
          
          <div className="flex items-center gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9 rounded-none"
                onClick={() => setViewMode('grid')}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9 rounded-none"
                onClick={() => setViewMode('list')}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-background z-50 lg:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-medium">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ScrollArea className="flex-1 p-4">
                <Accordion type="multiple" className="space-y-4">
                  <AccordionItem value="brands">
                    <AccordionTrigger>Brands</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <div key={brand} className="flex items-center">
                            <Checkbox 
                              id={`mobile-brand-${brand}`} 
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedBrands([...selectedBrands, brand]);
                                } else {
                                  setSelectedBrands(selectedBrands.filter(b => b !== brand));
                                }
                              }}
                            />
                            <label 
                              htmlFor={`mobile-brand-${brand}`}
                              className="text-sm ml-2"
                            >
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="sort">
                    <AccordionTrigger>Sort By</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[
                          { value: "featured", label: "Featured" },
                          { value: "price-low", label: "Price: Low to High" },
                          { value: "price-high", label: "Price: High to Low" },
                          { value: "rating", label: "Highest Rated" },
                          { value: "newest", label: "Newest" }
                        ].map((option) => (
                          <div key={option.value} className="flex items-center">
                            <Checkbox
                              id={`mobile-sort-${option.value}`}
                              checked={sortOption === option.value}
                              onCheckedChange={(checked) => {
                                if (checked) setSortOption(option.value);
                              }}
                            />
                            <label
                              htmlFor={`mobile-sort-${option.value}`}
                              className="text-sm ml-2"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="rating">
                    <AccordionTrigger>Rating</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center">
                            <Checkbox
                              id={`mobile-rating-${rating}`}
                              checked={minRating === rating}
                              onCheckedChange={(checked) => {
                                setMinRating(checked ? rating : 0);
                              }}
                            />
                            <label
                              htmlFor={`mobile-rating-${rating}`}
                              className="text-sm ml-2 flex items-center"
                            >
                              <span className="mr-2">{rating}+</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                ))}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="availability">
                    <AccordionTrigger>Availability</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center">
                        <Checkbox
                          id="mobile-in-stock"
                          checked={inStockOnly}
                          onCheckedChange={(checked) => {
                            setInStockOnly(checked as boolean);
                          }}
                        />
                        <label 
                          htmlFor="mobile-in-stock"
                          className="text-sm ml-2"
                        >
                          In Stock Only
                        </label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollArea>
              <div className="p-4 border-t flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Sorting & View Options - Desktop */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Sort by:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <span className="mr-2 text-gray-600">
                {filteredProducts.length} products
              </span>
              <div className="flex border rounded overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  onClick={() => setViewMode('grid')}
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedBrands.length > 0 || minRating > 0 || inStockOnly) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedBrands.map((brand) => (
                <Badge 
                  key={brand}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {brand}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => {
                      setSelectedBrands(selectedBrands.filter(b => b !== brand));
                    }}
                  />
                </Badge>
              ))}
              
              {minRating > 0 && (
                <Badge 
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {minRating}+ Stars
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => {
                      setMinRating(0);
                    }}
                  />
                </Badge>
              )}
              
              {inStockOnly && (
                <Badge 
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  In Stock Only
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => {
                      setInStockOnly(false);
                    }}
                  />
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="sm"
                className="h-6 text-xs"
                onClick={resetFilters}
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or explore other categories
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 bg-gray-100">
                      <img 
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="p-4 sm:w-2/3 flex flex-col">
                      <div className="flex-1">
                        <Link to={`/product/${product.id}`} className="hover:underline">
                          <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            ({product.reviewCount} reviews)
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                          {product.description}
                        </p>
                        <p className="text-sm">Brand: <span className="font-medium">{product.brand}</span></p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        <Button 
                          size="sm" 
                          asChild 
                          className="flex items-center"
                        >
                          <Link to={`/product/${product.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
