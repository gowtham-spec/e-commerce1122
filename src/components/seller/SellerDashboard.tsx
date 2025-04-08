
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, List, BarChart, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import AddProductForm from './AddProductForm';
import ProductsList from './ProductsList';
import SalesDashboard from './SalesDashboard';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your products and track your sales
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            className="bg-purple-gradient hover:shadow-purple-lg"
            onClick={() => setActiveTab('add-product')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveTab('products')}
          >
            <Package className="mr-2 h-4 w-4" />
            Manage Products
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Sales Overview</span>
            <span className="sm:hidden">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger value="add-product" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="pt-6">
              <SalesDashboard />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardContent className="pt-6">
              <ProductsList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add-product">
          <Card>
            <CardContent className="pt-6">
              <AddProductForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDashboard;
