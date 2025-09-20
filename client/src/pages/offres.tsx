import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, ArrowRight, Clock, Users, Shield, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function Offres() {
  const offers = [
    {
      id: "decouverte",
      name: "Site IA Découverte",
      price: "600 €",
      period: "Délai 72h",
      description: "Parfait pour tester notre approche IA et créer une première impression digitale forte.",
      features: [
        "Page unique design premium",
        "Contenu optimisé SEO",
        "Hébergement & maintenance 1 mois",
        "Délai de livraison 72h",
        "Support technique inclus",
        "Formation de base"
      ],
      cta: "Je commence dès maintenant",
      color: "primary",
      popular: false,
      icon: Zap
    },
    {
      id: "professionnel",
      name: "Site IA Professionnel",
      price: "1 500 €",
      period: "+ 100 €/mois",
      description: "Solution complète pour établir une présence digitale professionnelle avec IA intégrée.",
      features: [
        "Site complet multi-pages",
        "Intégration d'un agent IA (chat ou voix)",
        "Mise à jour & optimisation mensuelle",
        "Hébergement & support premium",
        "Analytics avancés",
        "Formation complète"
      ],
      cta: "Je veux attirer plus de clients",
      color: "accent",
      popular: true,
      icon: Users
    },
    {
      id: "closer",
      name: "Agent IA Closer",
      price: "2 500 €",
      period: "+ 150 €/mois",
      description: "Agent IA sur mesure pour automatiser vos ventes et qualifier vos prospects 24/7.",
      features: [
        "Agent IA sur mesure",
        "Qualification et prise de rendez-vous 24/7",
        "Formation & tuning continu",
        "Compatible WhatsApp/Email/Voix",
        "Intégration CRM",
        "Reporting détaillé"
      ],
      cta: "Je souhaite automatiser mes ventes",
      color: "secondary",
      popular: false,
      icon: MessageCircle
    },
    {
      id: "ultime",
      name: "Pack Ultime",
      price: "4 500 €",
      period: "+ 200 €/mois",
      description: "Solution complète pour transformer votre business avec une approche digitale intégrée.",
      features: [
        "Site complet + entonnoir de vente",
        "Agent IA intégré & cross-channel",
        "Campagnes marketing automatisées",
        "Analytics & optimisation avancées",
        "Accompagnement stratégique",
        "Support prioritaire 24/7"
      ],
      cta: "Je veux la solution complète",
      color: "primary",
      popular: false,
      icon: Crown
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          borderColor: "border-primary/20",
          buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90"
        };
      case "accent":
        return {
          iconBg: "bg-accent/10",
          iconColor: "text-accent",
          borderColor: "border-accent/20",
          buttonClass: "bg-accent text-accent-foreground hover:bg-accent/90"
        };
      case "secondary":
        return {
          iconBg: "bg-secondary/10",
          iconColor: "text-secondary",
          borderColor: "border-secondary/20",
          buttonClass: "bg-secondary text-secondary-foreground hover:bg-secondary/90"
        };
      default:
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          borderColor: "border-primary/20",
          buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90"
        };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground mb-6" data-testid="offers-title">
              Nos Offres
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="offers-subtitle">
              Choisissez la solution qui correspond parfaitement à vos besoins et à votre budget. 
              Chaque offre est conçue pour maximiser votre retour sur investissement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offers.map((offer, index) => {
              const colorClasses = getColorClasses(offer.color);
              const Icon = offer.icon;
              
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {offer.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-accent text-accent-foreground px-4 py-1 text-sm font-medium">
                        <Star className="w-3 h-3 mr-1" />
                        Populaire
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={`h-full border-2 ${offer.popular ? 'border-accent shadow-xl' : colorClasses.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 ${colorClasses.iconBg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-8 h-8 ${colorClasses.iconColor}`} />
                      </div>
                      
                      <CardTitle className="text-2xl font-sans font-bold text-foreground mb-2" data-testid={`offer-title-${offer.id}`}>
                        {offer.name}
                      </CardTitle>
                      
                      <div className="mb-4">
                        <span className="text-4xl font-sans font-bold text-foreground" data-testid={`offer-price-${offer.id}`}>
                          {offer.price}
                        </span>
                        <span className="text-lg text-muted-foreground ml-2" data-testid={`offer-period-${offer.id}`}>
                          {offer.period}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`offer-description-${offer.id}`}>
                        {offer.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-3 mb-8">
                        {offer.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start" data-testid={`offer-feature-${offer.id}-${featureIndex}`}>
                            <Check className="w-4 h-4 text-accent mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Link href="/contact">
                        <Button 
                          className={`w-full ${colorClasses.buttonClass} px-4 py-3 rounded-lg font-sans font-semibold text-sm transition-all duration-200 hover:scale-105 whitespace-normal h-auto min-h-[48px] flex items-center justify-center`}
                          data-testid={`button-offer-${offer.id}`}
                        >
                          <span className="text-center leading-tight">{offer.cta}</span>
                          <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="why-choose-title">
              Pourquoi Choisir Connectik ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="why-choose-subtitle">
              Notre expertise et notre approche unique font la différence dans chaque projet.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Livraison Rapide",
                description: "Délais respectés grâce à notre méthodologie éprouvée et notre équipe expérimentée.",
                color: "primary"
              },
              {
                icon: Shield,
                title: "Qualité Garantie",
                description: "Chaque projet est testé rigoureusement pour garantir une performance optimale.",
                color: "accent"
              },
              {
                icon: Users,
                title: "Support Dédié",
                description: "Un accompagnement personnalisé tout au long de votre transformation digitale.",
                color: "secondary"
              }
            ].map((item, index) => {
              const colorClasses = getColorClasses(item.color);
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                  data-testid={`why-choose-${index}`}
                >
                  <div className={`w-16 h-16 ${colorClasses.iconBg} rounded-lg flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`w-8 h-8 ${colorClasses.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-sans font-semibold text-foreground mb-4" data-testid={`why-choose-title-${index}`}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`why-choose-description-${index}`}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="offers-cta-title">
              Prêt à Choisir Votre Offre ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="offers-cta-description">
              Contactez-nous pour discuter de vos besoins spécifiques et trouver la solution parfaite pour votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                  data-testid="button-contact-offers"
                >
                  Discuter de mon Projet
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="px-8 py-4 rounded-lg font-sans font-semibold text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  data-testid="button-discover-services"
                >
                  Découvrir nos Solutions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
