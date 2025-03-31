
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from '@/components/ui/sheet';
import ProductCard from '@/components/ProductCard';
import { 
  filterProducts, 
  getProductsByCategory, 
  categories, 
  getProductsBySubcategory 
} from '@/data/products';
import { ChevronDown, ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams<{ categoryId: string; subcategoryId: string }>();
  const [products, setProducts] = useState(categoryId ? getProductsByCategory(categoryId) : []);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Find the category
  const category = categories.find(c => c.id === categoryId);
  const subcategory = category?.subcategories.find(s => s.id === subcategoryId);
  
  // Generate unique brands from products
  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  
  // Get min/max price
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Set price range on mount
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  
  // Update products when category or subcategory changes
  useEffect(() => {
    if (subcategoryId) {
      setProducts(getProductsBySubcategory(subcategoryId));
    } else if (categoryId) {
      setProducts(getProductsByCategory(categoryId));
    }
  }, [categoryId, subcategoryId]);
  
  // Apply filters
  useEffect(() => {
    let filtered = products;
    
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (sortOption) {
      switch (sortOption) {
        case 'price-asc':
          filtered = [...filtered].sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered = [...filtered].sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered = [...filtered].sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered = [...filtered].sort((a, b) => b.id.localeCompare(a.id));
          break;
      }
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedBrands, priceRange, sortOption]);
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };
  
  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
    setSortOption('');
  };
  
  // If category doesn't exist
  if (!category && categoryId) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-6">The category you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        {categoryId && (
          <>
            <Link to={`/category/${categoryId}`} className="hover:text-primary capitalize">
              {category?.name}
            </Link>
            {subcategoryId && (
              <>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="capitalize">{subcategory?.name}</span>
              </>
            )}
          </>
        )}
      </div>
      
      {/* Category header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 capitalize">
          {subcategoryId ? subcategory?.name : category?.name}
        </h1>
        <p className="text-muted-foreground">
          {category?.description}
        </p>
      </div>
      
      {/* Filters and sort */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Desktop sidebar filters */}
        <div className="lg:w-1/4 hidden lg:block space-y-6">
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            {category && (
              <div className="space-y-2">
                <div className="font-medium">
                  <Link to={`/category/${category.id}`} className="hover:text-primary">
                    All {category.name}
                  </Link>
                </div>
                {category.subcategories.map(sub => (
                  <div key={sub.id} className={`pl-4 ${subcategoryId === sub.id ? 'text-primary font-medium' : ''}`}>
                    <Link to={`/category/${category.id}/${sub.id}`} className="hover:text-primary">
                      {sub.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <Slider
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              step={10}
              onValueChange={setPriceRange}
              className="mb-6"
            />
            <div className="flex items-center justify-between">
              <div className="border rounded-md p-2 w-20">
                ${priceRange[0]}
              </div>
              <div className="border rounded-md p-2 w-20 text-right">
                ${priceRange[1]}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">Brands</h3>
            <div className="space-y-2">
              {uniqueBrands.map(brand => (
                <div key={brand} className="flex items-center">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
        
        {/* Main content */}
        <div className="lg:w-3/4">
          {/* Sort and filter controls */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} products
            </p>
            
            <div className="flex items-center gap-4">
              {/* Mobile filter button */}
              <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 py-6">
                    <div>
                      <h3 className="font-medium mb-4">Categories</h3>
                      {category && (
                        <div className="space-y-2">
                          <div className="font-medium">
                            <Link 
                              to={`/category/${category.id}`} 
                              className="hover:text-primary"
                              onClick={() => setIsMobileFilterOpen(false)}
                            >
                              All {category.name}
                            </Link>
                          </div>
                          {category.subcategories.map(sub => (
                            <div key={sub.id} className={`pl-4 ${subcategoryId === sub.id ? 'text-primary font-medium' : ''}`}>
                              <Link 
                                to={`/category/${category.id}/${sub.id}`} 
                                className="hover:text-primary"
                                onClick={() => setIsMobileFilterOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Price Range</h3>
                      <Slider
                        value={priceRange}
                        min={minPrice}
                        max={maxPrice}
                        step={10}
                        onValueChange={setPriceRange}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <div className="border rounded-md p-2 w-20">
                          ${priceRange[0]}
                        </div>
                        <div className="border rounded-md p-2 w-20 text-right">
                          ${priceRange[1]}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Brands</h3>
                      <div className="space-y-2">
                        {uniqueBrands.map(brand => (
                          <div key={brand} className="flex items-center">
                            <Checkbox
                              id={`mobile-brand-${brand}`}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={() => handleBrandChange(brand)}
                            />
                            <label
                              htmlFor={`mobile-brand-${brand}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                    <Button onClick={() => setIsMobileFilterOpen(false)}>
                      Apply Filters
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              
              {/* Sort dropdown */}
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Products grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <SlidersHorizontal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or browse other categories.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
