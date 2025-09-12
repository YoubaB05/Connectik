import { motion } from "framer-motion";
import { Building2, Lightbulb, TrendingUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ServicePillars() {
  const services = [
    {
      icon: Building2,
      title: "Fondation Digitale",
      description: "Créez une présence en ligne exceptionnelle qui reflète votre excellence et convertit vos visiteurs en clients fidèles.",
      color: "primary",
      features: [
        "Sites vitrine & E-commerce",
        "Refonte UX/UI",
        "Optimisation SEO avancée"
      ]
    },
    {
      icon: Lightbulb,
      title: "Innovation IA",
      description: "Révolutionnez votre entreprise avec des solutions d'intelligence artificielle sur mesure qui automatisent et optimisent vos processus.",
      color: "accent",
      features: [
        "Chatbots & Assistants virtuels",
        "Analyse prédictive",
        "Automatisation intelligente"
      ]
    },
    {
      icon: TrendingUp,
      title: "Stratégie de Croissance",
      description: "Développez votre activité avec des stratégies commerciales éprouvées et un accompagnement personnalisé vers l'excellence.",
      color: "secondary",
      features: [
        "Audit stratégique complet",
        "Go-to-market & Acquisition",
        "Formation commerciale"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          hoverBorder: "hover:border-primary/20",
          linkColor: "text-primary hover:text-primary/80"
        };
      case "accent":
        return {
          iconBg: "bg-accent/10",
          iconColor: "text-accent",
          hoverBorder: "hover:border-accent/20",
          linkColor: "text-accent hover:text-accent/80"
        };
      case "secondary":
        return {
          iconBg: "bg-secondary/10",
          iconColor: "text-secondary",
          hoverBorder: "hover:border-secondary/20",
          linkColor: "text-secondary hover:text-secondary/80"
        };
      default:
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          hoverBorder: "hover:border-primary/20",
          linkColor: "text-primary hover:text-primary/80"
        };
    }
  };

  return (
    <section id="solutions" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="pillars-title">
            Nos Trois Piliers d'Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="pillars-description">
            Une approche holistique qui combine fondation digitale solide, innovation technologique et stratégies de croissance éprouvées pour propulser votre entreprise vers le succès.
          </p>
        </motion.div>
        
        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color);
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`service-card bg-card p-8 rounded-lg border border-border ${colorClasses.hoverBorder}`}
                data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`w-16 h-16 ${colorClasses.iconBg} rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${colorClasses.iconColor}`} />
                </div>
                <h3 className="text-2xl font-sans font-bold text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/services">
                  <a className={`font-sans font-medium transition-colors duration-200 ${colorClasses.linkColor}`}>
                    En savoir plus →
                  </a>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/contact">
            <Button
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
              data-testid="button-discuss-project"
            >
              Discutons de votre Projet
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
