import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Building2, Lightbulb, TrendingUp, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Services() {
  const services = [
    {
      id: "fondation",
      icon: Building2,
      title: "Fondation Digitale & Présence en Ligne",
      subtitle: "Créez une présence en ligne exceptionnelle",
      description: "Développez une foundation digitale solide qui reflète votre excellence et convertit vos visiteurs en clients fidèles. Nos solutions couvrent tous les aspects de votre présence en ligne.",
      color: "primary",
      features: [
        "Sites vitrine professionnels sur mesure",
        "Plateformes e-commerce performantes",
        "Refonte UX/UI orientée conversion",
        "Optimisation SEO technique et on-page",
        "Responsive design multi-appareils",
        "Intégrations API et systèmes tiers"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: "ia",
      icon: Lightbulb, 
      title: "Innovation & Efficacité (IA)",
      subtitle: "Révolutionnez votre entreprise avec l'IA",
      description: "Intégrez des solutions d'intelligence artificielle sur mesure qui automatisent vos processus, optimisent vos performances et offrent une expérience client exceptionnelle.",
      color: "accent",
      features: [
        "Chatbots & assistants virtuels intelligents",
        "Analyse prédictive et business intelligence",
        "Automatisation de processus métier (RPA)",
        "Personnalisation client via machine learning",
        "Analyse de sentiment et feedback clients",
        "Optimisation des prix et recommandations"
      ],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: "croissance",
      icon: TrendingUp,
      title: "Stratégie de Croissance & Développement Commercial", 
      subtitle: "Accélérez votre développement commercial",
      description: "Développez votre activité avec des stratégies commerciales éprouvées, un accompagnement personnalisé et des formations adaptées à vos équipes.",
      color: "secondary",
      features: [
        "Audit stratégique complet et diagnostic",
        "Stratégie go-to-market personnalisée",
        "Optimisation du funnel de vente",
        "Acquisition clients multicanal",
        "Formation commerciale et coaching",
        "Mise en place d'outils CRM et analytics"
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          accent: "text-primary"
        };
      case "accent":
        return {
          iconBg: "bg-accent/10", 
          iconColor: "text-accent",
          accent: "text-accent"
        };
      case "secondary":
        return {
          iconBg: "bg-secondary/10",
          iconColor: "text-secondary", 
          accent: "text-secondary"
        };
      default:
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          accent: "text-primary"
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
            <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground mb-6" data-testid="services-title">
              Nos Solutions Expertes
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="services-subtitle">
              Découvrez nos trois piliers d'excellence qui transforment votre vision en succès concret et durable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => {
              const colorClasses = getColorClasses(service.color);
              const Icon = service.icon;
              const isReversed = index % 2 === 1;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}
                  data-testid={`service-section-${service.id}`}
                >
                  {/* Content */}
                  <div className={isReversed ? 'lg:col-start-2' : ''}>
                    <div className={`w-16 h-16 ${colorClasses.iconBg} rounded-lg flex items-center justify-center mb-6`}>
                      <Icon className={`w-8 h-8 ${colorClasses.iconColor}`} />
                    </div>
                    
                    <h2 className="text-3xl font-sans font-bold text-foreground mb-4" data-testid={`service-title-${service.id}`}>
                      {service.title}
                    </h2>
                    
                    <p className={`text-lg font-sans font-medium mb-6 ${colorClasses.accent}`} data-testid={`service-subtitle-${service.id}`}>
                      {service.subtitle}
                    </p>
                    
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid={`service-description-${service.id}`}>
                      {service.description}
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start" data-testid={`service-feature-${service.id}-${featureIndex}`}>
                          <Check className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/contact">
                      <Button 
                        className={`${colorClasses.accent} hover:opacity-80 transition-opacity duration-200 font-sans font-medium`}
                        variant="ghost"
                        data-testid={`button-contact-${service.id}`}
                      >
                        Discuter de ce service <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Image */}
                  <div className={isReversed ? 'lg:col-start-1' : ''}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="rounded-2xl shadow-xl w-full h-auto"
                      data-testid={`service-image-${service.id}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="services-cta-title">
              Prêt à Commencer Votre Transformation ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="services-cta-description">
              Discutons de vos besoins spécifiques et créons ensemble la solution parfaite pour votre entreprise.
            </p>
            <Link href="/contact">
              <Button
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                data-testid="button-services-cta"
              >
                Planifier une Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
