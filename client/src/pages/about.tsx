import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { CheckCircle, Heart, Zap, Target, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  const values = [
    {
      icon: CheckCircle,
      title: "Expertise Reconnue",
      description: "Des solutions technologiques de pointe adaptées aux exigences les plus élevées du marché.",
      color: "accent"
    },
    {
      icon: Heart,
      title: "Engagement Total",
      description: "Votre succès est notre priorité. Nous nous investissons pleinement dans chaque projet.",
      color: "primary"
    },
    {
      icon: Zap,
      title: "Résultats Mesurables",
      description: "Chaque action est orientée vers des objectifs concrets et des résultats quantifiables.",
      color: "secondary"
    },
    {
      icon: Target,
      title: "Approche Stratégique",
      description: "Une vision globale qui aligne technologie, business et objectifs à long terme.",
      color: "accent"
    },
    {
      icon: Users,
      title: "Partenariat Durable",
      description: "Nous construisons des relations durables basées sur la confiance et la transparence.",
      color: "primary"
    },
    {
      icon: Lightbulb,
      title: "Innovation Continue",
      description: "Toujours à la pointe des dernières technologies et méthodologies.",
      color: "secondary"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary"
        };
      case "accent":
        return {
          iconBg: "bg-accent/10",
          iconColor: "text-accent"
        };
      case "secondary":
        return {
          iconBg: "bg-secondary/10",
          iconColor: "text-secondary"
        };
      default:
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary"
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
            <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground mb-6" data-testid="about-title">
              Notre Approche : Excellence & Partenariat
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="about-subtitle">
              Découvrez la philosophie et les valeurs qui guident notre accompagnement vers votre succès digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Équipe professionnelle collaborant dans un environnement moderne"
                className="rounded-2xl shadow-xl w-full h-auto"
                data-testid="mission-image"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="mission-title">
                Notre Mission & Vision
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="mission-description">
                Nous croyons que chaque entreprise mérite une stratégie digitale unique. Notre mission est de transformer votre vision en succès concret grâce à notre expertise en développement digital, intelligence artificielle et stratégies de croissance sur mesure.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Notre approche repose sur une compréhension profonde de vos défis business et une collaboration étroite pour créer des solutions qui dépassent vos attentes et génèrent une valeur mesurable.
              </p>
              
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-sans font-semibold text-foreground mb-4" data-testid="philosophy-title">
                  Notre Philosophie
                </h3>
                <p className="text-muted-foreground italic" data-testid="philosophy-quote">
                  "Moins, c'est plus" - Nous privilégions l'élégance, la simplicité et l'efficacité dans chacune de nos réalisations, reflétant un positionnement haut de gamme qui inspire confiance et excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="values-title">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="values-subtitle">
              Les principes qui guident notre travail et notre relation avec nos clients.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const colorClasses = getColorClasses(value.color);
              const Icon = value.icon;
              
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background p-8 rounded-lg border border-border hover:shadow-lg transition-shadow duration-300"
                  data-testid={`value-${index}`}
                >
                  <div className={`w-12 h-12 ${colorClasses.iconBg} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 ${colorClasses.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-sans font-semibold text-foreground mb-4" data-testid={`value-title-${index}`}>
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`value-description-${index}`}>
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="process-title">
              Notre Méthodologie
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="process-subtitle">
              Un processus éprouvé pour garantir le succès de chaque projet.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Audit & Analyse",
                description: "Compréhension approfondie de vos besoins, défis et objectifs business."
              },
              {
                step: "02",
                title: "Stratégie & Conception",
                description: "Élaboration d'une stratégie sur mesure et conception de la solution optimale."
              },
              {
                step: "03",
                title: "Développement & Tests",
                description: "Réalisation technique avec des tests rigoureux pour garantir la qualité."
              },
              {
                step: "04",
                title: "Déploiement & Suivi",
                description: "Mise en production et accompagnement continu pour optimiser les résultats."
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
                data-testid={`process-step-${index}`}
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-sans font-bold text-primary-foreground">{item.step}</span>
                </div>
                <h3 className="text-xl font-sans font-semibold text-foreground mb-4" data-testid={`process-step-title-${index}`}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`process-step-description-${index}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
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
            <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="about-cta-title">
              Prêt à Commencer Votre Transformation ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="about-cta-description">
              Découvrez comment notre approche unique peut transformer votre vision en succès concret.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button
                  variant="outline"
                  className="px-8 py-4 rounded-lg font-sans font-semibold text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  data-testid="button-discover-services"
                >
                  Découvrir nos Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                  data-testid="button-contact-about"
                >
                  Planifier une Consultation
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
