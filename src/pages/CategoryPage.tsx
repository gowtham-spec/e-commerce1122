
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
  getProductsBySubcategory,
  products as allProducts
} from '@/data/products';
import { ChevronDown, ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams<{ categoryId: string; subcategoryId: string }>();
  const [products, setProducts] = useState(categoryId ? getProductsByCategory(categoryId) : allProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Find the category
  const category = categories.find(c => c.id === categoryId);
  const subcategory = category?.subcategories.find(s => s.id === subcategoryId);
  
  // Generate unique brands from products
  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  
  // Update products when category or subcategory changes
  useEffect(() => {
    if (subcategoryId) {
      setProducts(getProductsBySubcategory(subcategoryId));
    } else if (categoryId) {
      setProducts(getProductsByCategory(categoryId));
    } else {
      setProducts(allProducts);
    }
  }, [categoryId, subcategoryId]);
  
  // Apply filters
  useEffect(() => {
    let filtered = products;
    
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
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
  }, [products, selectedBrands, sortOption]);
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };
  
  const clearFilters = () => {
    setSelectedBrands([]);
    setSortOption('');
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button 
          variant={!categoryId ? "default" : "outline"}
          asChild
          className="rounded-full"
        >
          <Link to="/category">All Products</Link>
        </Button>
        {categories.map((cat) => (
          <Button 
            key={cat.id}
            variant={categoryId === cat.id ? "default" : "outline"}
            asChild
            className="rounded-full"
          >
            <Link to={`/category/${cat.id}`}>{cat.name}</Link>
          </Button>
        ))}
      </div>
      
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to="/category" className="hover:text-primary">All Products</Link>
        {categoryId && (
          <>
            <ChevronRight className="h-4 w-4 mx-2" />
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
          {subcategoryId ? subcategory?.name : categoryId ? category?.name : "All Products"}
        </h1>
        <p className="text-muted-foreground">
          {category?.description || "Browse our complete collection of quality products"}
        </p>
      </div>
      
      {/* Filters and sort */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Desktop sidebar filters */}
        <div className="lg:w-1/4 hidden lg:block space-y-6">
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <div className="space-y-2">
              <div className={`font-medium ${!categoryId ? 'text-primary' : ''}`}>
                <Link to="/category" className="hover:text-primary">
                  All Products
                </Link>
              </div>
              {categories.map(cat => (
                <div key={cat.id}>
                  <div className={`font-medium ${categoryId === cat.id && !subcategoryId ? 'text-primary' : ''}`}>
                    <Link to={`/category/${cat.id}`} className="hover:text-primary">
                      {cat.name}
                    </Link>
                  </div>
                  {categoryId === cat.id && (
                    <div className="pl-4 mt-2 space-y-1">
                      {cat.subcategories.map(sub => (
                        <div key={sub.id} className={`${subcategoryId === sub.id ? 'text-primary font-medium' : ''}`}>
                          <Link to={`/category/${cat.id}/${sub.id}`} className="hover:text-primary">
                            {sub.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
                      <div className="space-y-2">
                        <div className={`font-medium ${!categoryId ? 'text-primary' : ''}`}>
                          <Link 
                            to="/category" 
                            className="hover:text-primary"
                            onClick={() => setIsMobileFilterOpen(false)}
                          >
                            All Products
                          </Link>
                        </div>
                        {categories.map(cat => (
                          <div key={cat.id}>
                            <div className={`font-medium ${categoryId === cat.id && !subcategoryId ? 'text-primary' : ''}`}>
                              <Link 
                                to={`/category/${cat.id}`} 
                                className="hover:text-primary"
                                onClick={() => setIsMobileFilterOpen(false)}
                              >
                                {cat.name}
                              </Link>
                            </div>
                            {categoryId === cat.id && (
                              <div className="pl-4 mt-2 space-y-1">
                                {cat.subcategories.map(sub => (
                                  <div key={sub.id} className={`${subcategoryId === sub.id ? 'text-primary font-medium' : ''}`}>
                                    <Link 
                                      to={`/category/${cat.id}/${sub.id}`} 
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
                        ))}
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
