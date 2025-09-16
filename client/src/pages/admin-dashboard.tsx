import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { insertProductSchema, type InsertProduct } from "@shared/schema";
import { 
  LogOut, 
  Mail, 
  Phone, 
  Calendar, 
  Trash2, 
  Package, 
  Tag,
  LayoutDashboard,
  Users,
  ShoppingBag,
  Plus,
  Edit,
  Eye,
  EyeOff,
  Star,
  Euro
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ImageUploader } from "@/components/ImageUploader";

type ContactSubmission = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  stock: number;
  active: boolean;
  featured: boolean;
  createdAt: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Check if user is authenticated
  const { data: adminData, isLoading: isCheckingAuth } = useQuery<{admin: {email: string, name: string}}>({
    queryKey: ["/api/admin/me"],
    retry: false,
  });

  useEffect(() => {
    if (!isCheckingAuth && !adminData) {
      setLocation("/login");
    }
  }, [adminData, isCheckingAuth, setLocation]);

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/admin/logout");
      return response.json();
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/login");
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    },
  });

  // Contact submissions query
  const { data: contactSubmissions = [], isLoading: isLoadingContacts } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact-submissions"],
    enabled: !!adminData,
  });

  // Products query
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
    enabled: !!adminData,
  });

  // Categories query
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    enabled: !!adminData,
  });

  // Delete contact submission mutation
  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/contact-submissions/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-submissions"] });
      toast({
        title: "Demande supprimée",
        description: "La demande de consultation a été supprimée avec succès.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la suppression",
        variant: "destructive",
      });
    },
  });

  // Product form
  const productForm = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      price: "",
      originalPrice: "",
      sku: "",
      stock: 0,
      categoryId: "",
      brand: "",
      model: "",
      specifications: "",
      images: [],
      featured: false,
      active: true,
    },
    mode: "onChange"
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const response = await apiRequest("POST", "/api/admin/products", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      toast({
        title: "Produit créé",
        description: "Le produit a été créé avec succès.",
      });
      setProductDialogOpen(false);
      productForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la création du produit",
        variant: "destructive",
      });
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProduct> }) => {
      const response = await apiRequest("PUT", `/api/admin/products/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      toast({
        title: "Produit modifié",
        description: "Le produit a été modifié avec succès.",
      });
      setEditingProduct(null);
      setProductDialogOpen(false);
      productForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la modification du produit",
        variant: "destructive",
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/products/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la suppression du produit",
        variant: "destructive",
      });
    },
  });

  // Toggle product active status
  const toggleProductStatus = (product: Product, field: 'active' | 'featured') => {
    updateProductMutation.mutate({
      id: product.id,
      data: { [field]: !product[field] }
    });
  };

  // Handle product form submission
  const onSubmitProduct = (data: InsertProduct) => {
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data });
    } else {
      createProductMutation.mutate(data);
    }
  };

  // Open product dialog for editing
  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    productForm.reset({
      name: product.name,
      slug: product.slug,
      description: (product as any).description || "",
      shortDescription: (product as any).shortDescription || "",
      price: product.price,
      originalPrice: (product as any).originalPrice || "",
      sku: (product as any).sku || "",
      stock: product.stock,
      categoryId: (product as any).categoryId || "",
      brand: (product as any).brand || "",
      model: (product as any).model || "",
      specifications: (product as any).specifications || "",
      images: (product as any).images || [],
      featured: product.featured || false,
      active: product.active !== false,
    });
    setProductDialogOpen(true);
  };

  // Open product dialog for creating
  const openCreateDialog = () => {
    setEditingProduct(null);
    productForm.reset();
    setProductDialogOpen(true);
  };

  if (isCheckingAuth || !adminData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Panneau d'Administration
                </h1>
                <p className="text-sm text-gray-500">
                  Connecté en tant que {adminData.admin?.name}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              className="gap-2"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Tableau de bord
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Demandes ({contactSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="boutique" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Boutique ({products.length})
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Demandes de consultation
                  </CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contactSubmissions.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Total des demandes reçues
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Produits
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {products.filter((p: Product) => p.active).length} actifs
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Catégories
                  </CardTitle>
                  <Tag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{categories.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Catégories de produits
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>
                  Dernières demandes de consultation reçues
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingContacts ? (
                  <div className="text-center py-4">Chargement...</div>
                ) : contactSubmissions.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    Aucune demande de consultation
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactSubmissions.slice(0, 5).map((contact: ContactSubmission) => (
                      <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">
                            {contact.firstName} {contact.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {contact.email} {contact.phone && `• ${contact.phone}`}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {format(new Date(contact.createdAt), "PPP", { locale: fr })}
                          </div>
                        </div>
                        {contact.service && (
                          <Badge variant="secondary">{contact.service}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Submissions */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Demandes de consultation</CardTitle>
                <CardDescription>
                  Gérez les demandes de consultation reçues via le formulaire de contact
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingContacts ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Chargement des demandes...</p>
                  </div>
                ) : contactSubmissions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune demande de consultation reçue</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactSubmissions.map((contact: ContactSubmission) => (
                      <Card key={contact.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">
                                  {contact.firstName} {contact.lastName}
                                </h3>
                                {contact.service && (
                                  <Badge variant="secondary">{contact.service}</Badge>
                                )}
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  {contact.email}
                                </div>
                                {contact.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {contact.phone}
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {format(new Date(contact.createdAt), "PPP à HH:mm", { locale: fr })}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteContactMutation.mutate(contact.id)}
                              disabled={deleteContactMutation.isPending}
                              data-testid={`button-delete-contact-${contact.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Separator className="my-4" />
                          <div>
                            <h4 className="font-medium mb-2">Message :</h4>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {contact.message}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Boutique Management */}
          <TabsContent value="boutique" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion de la boutique</CardTitle>
                    <CardDescription>
                      Gérez les produits et catégories de votre boutique en ligne
                    </CardDescription>
                  </div>
                  <Button onClick={openCreateDialog} className="gap-2" data-testid="button-add-product">
                    <Plus className="h-4 w-4" />
                    Ajouter un produit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingProducts ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Chargement des produits...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun produit trouvé</p>
                    <Button onClick={openCreateDialog} className="mt-4 gap-2">
                      <Plus className="h-4 w-4" />
                      Créer votre premier produit
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produit</TableHead>
                          <TableHead>Prix</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product: Product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-start space-x-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{product.name}</h3>
                                    {product.featured && (
                                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    SKU: {(product as any).sku || "N/A"}
                                  </p>
                                  {(product as any).brand && (
                                    <p className="text-sm text-muted-foreground">
                                      {(product as any).brand} {(product as any).model && `- ${(product as any).model}`}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Euro className="h-4 w-4" />
                                <span className="font-medium">{product.price}</span>
                              </div>
                              {(product as any).originalPrice && (
                                <p className="text-sm text-muted-foreground line-through">
                                  €{(product as any).originalPrice}
                                </p>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                                {product.stock}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={product.active}
                                    onCheckedChange={() => toggleProductStatus(product, 'active')}
                                    disabled={updateProductMutation.isPending}
                                    data-testid={`switch-active-${product.id}`}
                                  />
                                  <span className="text-sm">
                                    {product.active ? (
                                      <span className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        Actif
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-1">
                                        <EyeOff className="h-3 w-3" />
                                        Inactif
                                      </span>
                                    )}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={product.featured}
                                    onCheckedChange={() => toggleProductStatus(product, 'featured')}
                                    disabled={updateProductMutation.isPending}
                                    data-testid={`switch-featured-${product.id}`}
                                  />
                                  <span className="text-sm">
                                    {product.featured ? (
                                      <span className="flex items-center gap-1">
                                        <Star className="h-3 w-3" />
                                        Vedette
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-1">
                                        <Star className="h-3 w-3 opacity-50" />
                                        Normal
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openEditDialog(product)}
                                  data-testid={`button-edit-${product.id}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteProductMutation.mutate(product.id)}
                                  disabled={deleteProductMutation.isPending}
                                  data-testid={`button-delete-${product.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Add/Edit Dialog */}
            <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProduct 
                      ? "Modifiez les informations du produit ci-dessous."
                      : "Ajoutez un nouveau produit à votre boutique."}
                  </DialogDescription>
                </DialogHeader>
                <Form {...productForm}>
                  <form onSubmit={productForm.handleSubmit(onSubmitProduct)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={productForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom du produit *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ex: iPhone 15 Pro" data-testid="input-product-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ex: iphone-15-pro" data-testid="input-product-slug" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={productForm.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description courte</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Brève description du produit" data-testid="input-product-short-description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={productForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description complète</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Description détaillée du produit" 
                              rows={4}
                              data-testid="textarea-product-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={productForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prix *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="99.99" data-testid="input-product-price" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="originalPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prix original</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="149.99" data-testid="input-product-original-price" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="number" 
                                placeholder="10" 
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                data-testid="input-product-stock"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={productForm.control}
                        name="sku"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="IP15P-128-BLK" data-testid="input-product-sku" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marque</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Apple" data-testid="input-product-brand" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={productForm.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modèle</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="A2848" data-testid="input-product-model" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={productForm.control}
                      name="specifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Spécifications</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Spécifications techniques du produit" 
                              rows={3}
                              data-testid="textarea-product-specifications"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={productForm.control}
                      name="images"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Images du produit</FormLabel>
                          <FormControl>
                            <ImageUploader
                              images={field.value || []}
                              onChange={field.onChange}
                              maxImages={5}
                              data-testid="image-uploader-product"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center space-x-6">
                      <FormField
                        control={productForm.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="switch-product-featured"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                Produit vedette
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="active"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="switch-product-active"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                Produit actif
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setProductDialogOpen(false)}
                      >
                        Annuler
                      </Button>
                      <Button
                        type="submit"
                        disabled={createProductMutation.isPending || updateProductMutation.isPending}
                        data-testid="button-save-product"
                      >
                        {createProductMutation.isPending || updateProductMutation.isPending 
                          ? "Sauvegarde..." 
                          : editingProduct ? "Modifier" : "Ajouter"
                        }
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}