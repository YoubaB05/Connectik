import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, Star, Filter } from "lucide-react";
import type { Product, Category } from "@shared/schema";

function ProductCard({ product }: { product: Product }) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <Card 
      className="group relative overflow-hidden border-0 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        {firstImage ? (
          <img
            src={firstImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            data-testid={`img-product-${product.id}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <ShoppingBag size={48} />
          </div>
        )}
        
        {product.featured && (
          <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white">
            <Star className="w-3 h-3 mr-1" />
            Vedette
          </Badge>
        )}

        {product.stock <= 3 && product.stock > 0 && (
          <Badge className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-600 text-white">
            Stock limité
          </Badge>
        )}

        {product.stock === 0 && (
          <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white">
            Épuisé
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 
              className="font-montserrat font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              data-testid={`text-product-name-${product.id}`}
            >
              {product.name}
            </h3>
            {product.brand && (
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {product.brand}
              </p>
            )}
          </div>

          <p 
            className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2"
            data-testid={`text-product-description-${product.id}`}
          >
            {product.shortDescription || product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span 
                  className="text-xl font-bold text-gray-900 dark:text-white font-montserrat"
                  data-testid={`text-product-price-${product.id}`}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price) && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
              </p>
            </div>

            <Link href={`/boutique/${product.slug}`}>
              <Button 
                className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white transition-colors"
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
    <div className="flex flex-wrap gap-3 mb-8">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onCategoryChange(null)}
        className="font-montserrat"
        data-testid="filter-all-products"
      >
        <Filter className="w-4 h-4 mr-2" />
        Tous les produits
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className="font-montserrat"
          data-testid={`filter-category-${category.slug}`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

export default function Boutique() {
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-montserrat font-light text-gray-900 dark:text-white tracking-tight">
              <span className="font-thin">Notre</span>
              <br />
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Boutique
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lato leading-relaxed">
              Découvrez notre sélection exclusive d'équipements professionnels haut de gamme. 
              MacBooks, périphériques et outils spécialisés pour l'excellence numérique.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {!productsLoading && featuredProducts.length > 0 && (
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-montserrat font-semibold text-gray-900 dark:text-white mb-4">
                Produits Vedettes
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-semibold text-gray-900 dark:text-white mb-4">
              Catalogue Complet
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full mb-8"></div>
          </div>

          {/* Category Filter */}
          {!categoriesLoading && categories.length > 0 && (
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          )}

          {/* Products Grid */}
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
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
            <div className="text-center py-16">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-montserrat font-semibold text-gray-900 dark:text-white mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory 
                  ? "Aucun produit dans cette catégorie pour le moment."
                  : "Notre catalogue sera bientôt disponible."
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}