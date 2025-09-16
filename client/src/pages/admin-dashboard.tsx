import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
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
  ShoppingBag
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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
                <CardTitle>Gestion de la boutique</CardTitle>
                <CardDescription>
                  Gérez les produits et catégories de votre boutique en ligne
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Interface de gestion en cours de développement</h3>
                  <p className="text-muted-foreground mb-4">
                    L'interface complète de gestion des produits et catégories sera bientôt disponible.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span>Produits totaux :</span>
                      <Badge>{products.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span>Produits actifs :</span>
                      <Badge variant="secondary">{products.filter((p: Product) => p.active).length}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span>Catégories :</span>
                      <Badge>{categories.length}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}