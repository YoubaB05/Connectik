import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, Star, Filter, Laptop, Mouse, Cpu, Palette } from "lucide-react";
import type { Product, Category } from "@shared/schema";

// Category icons mapping
const categoryIcons = {
  'macbooks': Laptop,
  'peripheriques': Mouse,
  'equipements-ia': Cpu,
  'design-creativite': Palette,
};

function ProductCard({ product }: { product: Product }) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className="group relative overflow-hidden bg-card border-border hover:shadow-lg transition-all duration-300 service-card"
        data-testid={`card-product-${product.id}`}
      >
        <div className="aspect-square overflow-hidden bg-muted/50">
          {product.images && product.images.length > 0 ? (
            <div className="w-full h-full bg-muted/30 flex items-center justify-center relative">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/50" />
              {/* Placeholder for actual product images */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground font-serif">Image produit</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-muted/30 flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/50" />
            </div>
          )}
          
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs">
              <Star className="w-3 h-3 mr-1" />
              Vedette
            </Badge>
          )}

          {product.stock <= 3 && product.stock > 0 && (
            <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs">
              Stock limité
            </Badge>
          )}

          {product.stock === 0 && (
            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs">
              Épuisé
            </Badge>
          )}
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 
                className="text-lg font-sans font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2"
                data-testid={`text-product-name-${product.id}`}
              >
                {product.name}
              </h3>
              {product.brand && (
                <p className="text-sm text-muted-foreground font-serif mt-1">
                  {product.brand}
                </p>
              )}
            </div>

            <p 
              className="text-sm text-muted-foreground line-clamp-3 font-serif leading-relaxed"
              data-testid={`text-product-description-${product.id}`}
            >
              {product.shortDescription || product.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span 
                    className="text-xl font-sans font-bold text-foreground"
                    data-testid={`text-product-price-${product.id}`}
                  >
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price) && (
                    <span className="text-sm text-muted-foreground line-through font-serif">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-serif">
                  {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
                </p>
              </div>

              <Link href={`/boutique/${product.slug}`}>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-medium transition-colors"
                  size="sm"
                  data-testid={`button-view-product-${product.id}`}
                >
                  Voir détails
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: { 
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onCategoryChange(null)}
        className="font-sans font-medium"
        data-testid="filter-all-products"
      >
        <Filter className="w-4 h-4 mr-2" />
        Tous les produits
      </Button>
      {categories.map((category) => {
        const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons];
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="font-sans font-medium"
            data-testid={`filter-category-${category.slug}`}
          >
            {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
            {category.name}
          </Button>
        );
      })}
    </div>
  );
}

export default function Boutique() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Fix the filtering bug - compare with category.id not category.slug
  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - matches theme */}
      <section className="pt-24 pb-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground mb-6" data-testid="boutique-title">
              Notre Boutique Technique
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-serif" data-testid="boutique-subtitle">
              Découvrez notre sélection exclusive d'équipements professionnels haut de gamme. 
              MacBooks, périphériques et outils spécialisés pour l'excellence numérique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      {!productsLoading && featuredProducts.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
                Produits Vedettes
              </h2>
              <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
                Notre sélection des meilleurs équipements pour votre réussite professionnelle.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={`featured-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
              Catalogue Complet
            </h2>
            <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto mb-8">
              Explorez notre gamme complète d'équipements techniques et trouvez les outils parfaits pour vos projets.
            </p>
          </div>

          {/* Category Filter */}
          {!categoriesLoading && categories.length > 0 && (
            <div className="mb-12">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          )}

          {/* Products Grid */}
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              data-testid="products-grid"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-sans font-semibold text-foreground mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-muted-foreground font-serif">
                {selectedCategory 
                  ? "Aucun produit dans cette catégorie pour le moment."
                  : "Notre catalogue sera bientôt disponible."
                }
              </p>
              {selectedCategory && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory(null)}
                  className="mt-4 font-sans"
                >
                  Voir tous les produits
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section - matches theme */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-sans font-bold text-foreground mb-6">
              Besoin de Conseils ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto font-serif leading-relaxed">
              Notre équipe d'experts est là pour vous accompagner dans le choix des équipements 
              qui répondront parfaitement à vos besoins professionnels.
            </p>
            <Link href="/contact">
              <Button
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                data-testid="button-contact-cta"
              >
                Nous Contacter
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}