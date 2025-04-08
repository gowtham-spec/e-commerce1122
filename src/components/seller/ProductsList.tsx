
import React from 'react';
import { Button } from '@/components/ui/button';
import { formatPriceToINR } from '@/utils/priceFormatter';
import { Edit, Trash2, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

// Example product data
const sampleProducts = [
  {
    id: 'prod1',
    name: 'Wireless Bluetooth Earbuds',
    price: 2499,
    category: 'Electronics',
    stock: 15,
    createdAt: '2023-08-15',
    status: 'active'
  },
  {
    id: 'prod2',
    name: 'Premium Cotton T-Shirt',
    price: 999,
    category: 'Clothing',
    stock: 48,
    createdAt: '2023-09-02',
    status: 'active'
  },
  {
    id: 'prod3',
    name: 'Stainless Steel Water Bottle',
    price: 799,
    category: 'Home',
    stock: 27,
    createdAt: '2023-10-10',
    status: 'active'
  },
  {
    id: 'prod4',
    name: 'Bamboo Cutting Board',
    price: 1299,
    category: 'Kitchen',
    stock: 5,
    createdAt: '2023-11-05',
    status: 'low-stock'
  },
  {
    id: 'prod5',
    name: 'Smart Fitness Tracker',
    price: 3999,
    category: 'Electronics',
    stock: 0,
    createdAt: '2023-12-01',
    status: 'out-of-stock'
  }
];

const ProductsList = () => {
  const handleEdit = (productId: string) => {
    console.log('Edit product:', productId);
    // Navigate to edit form or open modal
  };

  const handleDelete = (productId: string) => {
    console.log('Delete product:', productId);
    // Delete product from database
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'low-stock':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{formatPriceToINR(product.price)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(product.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product from your store.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {sampleProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    <h3 className="font-medium">No products found</h3>
                    <p className="text-sm">Add your first product to get started.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsList;
