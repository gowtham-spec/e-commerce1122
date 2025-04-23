import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Package, BadgeIndianRupee, Truck, ArrowUpRight } from 'lucide-react';
import { formatPriceToINR } from '@/utils/priceFormatter';
import { products } from '@/data/products';

const calculateMetrics = () => {
  const totalSoldItems = products.reduce((acc, product) => acc + (product.reviewCount || 0), 0);
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
  const totalRevenue = products.reduce((acc, product) => acc + (product.price * (product.reviewCount || 0)), 0);
  const avgOrderValue = totalRevenue / (totalSoldItems || 1);
  
  return { totalSoldItems, totalStock, totalRevenue, avgOrderValue };
};

const { totalSoldItems, totalStock, totalRevenue, avgOrderValue } = calculateMetrics();

const monthlySalesData = [
  { name: 'Jan', sales: 140 },
  { name: 'Feb', sales: 221 },
  { name: 'Mar', sales: 180 },
  { name: 'Apr', sales: 250 },
  { name: 'May', sales: 310 },
  { name: 'Jun', sales: 290 },
  { name: 'Jul', sales: 350 },
  { name: 'Aug', sales: 410 },
  { name: 'Sep', sales: 380 },
  { name: 'Oct', sales: 450 },
  { name: 'Nov', sales: 510 },
  { name: 'Dec', sales: 620 }
];

const categorySalesData = Object.entries(
  products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + (product.reviewCount || 0);
    return acc;
  }, {} as Record<string, number>)
).map(([name, value]) => ({ name, value }));

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#6E59A5', '#EC4899', '#10B981'];

const SalesDashboard: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">Sales Overview</CardTitle>
        <CardDescription>
          Monitor your store's performance and sales trends
        </CardDescription>
      </CardHeader>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Total Revenue</span>
              <span className="text-2xl font-bold">{formatPriceToINR(totalRevenue)}</span>
              <span className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12.5% from last month
              </span>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <BadgeIndianRupee className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Total Orders</span>
              <span className="text-2xl font-bold">{totalSoldItems}</span>
              <span className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                8.2% from last month
              </span>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Avg. Order Value</span>
              <span className="text-2xl font-bold">{formatPriceToINR(avgOrderValue)}</span>
              <span className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                4.3% from last month
              </span>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-full">
              <BadgeIndianRupee className="h-6 w-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Available Stock</span>
              <span className="text-2xl font-bold">{totalStock}</span>
              <span className="text-xs text-amber-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {totalStock < 100 ? 'Low stock alert' : 'Stock healthy'}
              </span>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-full">
              <Truck className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList>
          <TabsTrigger value="monthly">Monthly Sales</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="w-full">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Monthly sales trend for the current year</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    sales: {
                      label: "Sales",
                      theme: {
                        light: "#8B5CF6",
                        dark: "#A78BFA",
                      },
                    },
                  }}
                  className="aspect-[4/3] sm:aspect-[16/9]"
                >
                  <BarChart data={monthlySalesData}>
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) =>
                        `₹${Intl.NumberFormat("en", {
                          notation: "compact",
                          compactDisplay: "short",
                        }).format(value)}`
                      }
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Month
                                  </span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[0].payload.name}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Sales
                                  </span>
                                  <span className="font-bold">
                                    {formatPriceToINR(payload[0].value as number)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="sales" fill="var(--color-sales)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="categories">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[350px] w-full max-w-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categorySalesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categorySalesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SalesDashboard;
