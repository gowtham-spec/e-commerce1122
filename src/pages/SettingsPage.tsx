import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Store, CreditCard, Bell, User, ShoppingBag, LogOut, ArrowRight, Save, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import SellerRegistrationForm from '@/components/seller/SellerRegistrationForm';
import SellerDashboard from '@/components/seller/SellerDashboard';

const SettingsPage = () => {
  const { user, isAuthenticated, isSeller, becomeSeller } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('account');
  const [profileData, setProfileData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newDeals: true,
    orderUpdates: true,
    newsletter: false,
  });

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['account', 'profile', 'billing', 'notifications', 'seller'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('account');
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <Card className="sticky top-20">
            <CardContent className="p-4">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-20 h-20 mb-2">
                  <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{user?.name || 'User'}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                {isSeller && (
                  <Badge variant="outline" className="mt-2">Seller Account</Badge>
                )}
              </div>

              <div className="space-y-1">
                <Button
                  variant={activeTab === 'account' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTabChange('account')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
                <Button
                  variant={activeTab === 'profile' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTabChange('profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === 'billing' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTabChange('billing')}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </Button>
                <Button
                  variant={activeTab === 'notifications' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTabChange('notifications')}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                
                <Separator className="my-2" />
                
                <Button
                  variant={activeTab === 'seller' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTabChange('seller')}
                >
                  <Store className="mr-2 h-4 w-4" />
                  {isSeller ? "Seller Dashboard" : "Become a Seller"}
                </Button>
                
                {isSeller && (
                  <Button
                    variant={activeTab === 'add-product' ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      handleTabChange('seller');
                      const sellerDashboardTabs = document.querySelector('[data-state="active"] [value="add-product"]');
                      if (sellerDashboardTabs) {
                        (sellerDashboardTabs as HTMLElement).click();
                      }
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                )}
                
                <Separator className="my-2" />
                
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and connected services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input type="email" id="email" defaultValue={user?.email || ''} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="flex gap-2">
                        <Input type="password" id="password" value="••••••••" disabled />
                        <Button variant="outline">Change</Button>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium">Delete Account</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete your account and all of your content.
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          type="text" 
                          id="fullName" 
                          name="fullName" 
                          value={profileData.fullName} 
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input 
                          type="tel" 
                          id="phoneNumber" 
                          name="phoneNumber" 
                          value={profileData.phoneNumber} 
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        type="text" 
                        id="address" 
                        name="address" 
                        value={profileData.address} 
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          type="text" 
                          id="city" 
                          name="city" 
                          value={profileData.city} 
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          type="text" 
                          id="state" 
                          name="state" 
                          value={profileData.state} 
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input 
                          type="text" 
                          id="zipCode" 
                          name="zipCode" 
                          value={profileData.zipCode} 
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveProfile} className="bg-purple-gradient hover:shadow-purple-lg">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-8 w-8" />
                        <div>
                          <p className="font-medium">Visa ending in 1234</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">Add New Payment Method</Button>
                  </div>
                </CardContent>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your billing details and addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div>
                        <p className="font-medium">Home Address</p>
                        <p className="text-sm text-muted-foreground">123 Main St, Apartment 4, City, State 12345</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">Add New Address</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Communication Channels</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch 
                          checked={notificationPreferences.emailNotifications} 
                          onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                        </div>
                        <Switch 
                          checked={notificationPreferences.smsNotifications} 
                          onCheckedChange={(value) => handleNotificationChange('smsNotifications', value)} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive push notifications</p>
                        </div>
                        <Switch 
                          checked={notificationPreferences.pushNotifications} 
                          onCheckedChange={(value) => handleNotificationChange('pushNotifications', value)} 
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-medium">Notification Types</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Deals</Label>
                          <p className="text-sm text-muted-foreground">Get notified about new deals and promotions</p>
                        </div>
                        <Switch 
                          checked={notificationPreferences.newDeals} 
                          onCheckedChange={(value) => handleNotificationChange('newDeals', value)} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Order Updates</Label>
                          <p className="text-sm text-muted-foreground">Get updates about your orders</p>
                        </div>
                        <Switch 
                          checked={notificationPreferences.orderUpdates} 
                          onCheckedChange={(value) => handleNotificationChange('orderUpdates', value)} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Newsletter</Label>
                          <p className="text-sm text-muted-foreground">Receive our weekly newsletter</p>
                        </div>
                        <Switch 
                          checked={notificationPreferences.newsletter} 
                          onCheckedChange={(value) => handleNotificationChange('newsletter', value)} 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => {
                    toast({
                      title: "Preferences Saved",
                      description: "Your notification preferences have been saved.",
                    });
                  }} className="bg-purple-gradient hover:shadow-purple-lg">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="seller" className="mt-0">
              {isSeller ? (
                <SellerDashboard isEmbedded={true} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Become a Seller</CardTitle>
                    <CardDescription>
                      Start selling your products on Value Market and reach millions of customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SellerRegistrationForm />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
