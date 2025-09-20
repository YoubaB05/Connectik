import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import ServicePillars from "@/components/sections/service-pillars";
import { motion } from "framer-motion";
import { CheckCircle, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ServicePillars />
      
      {/* About/Approach Section */}
      <section className="py-20 bg-muted">
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
                data-testid="approach-image"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="approach-title">
                Notre Approche : Excellence & Partenariat
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="approach-description">
                Nous croyons que chaque entreprise mérite une stratégie digitale unique. Notre approche repose sur une compréhension profonde de vos défis et une collaboration étroite pour créer des solutions sur mesure qui dépassent vos attentes.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <CheckCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-sans font-semibold text-foreground mb-2" data-testid="approach-expertise-title">
                      Expertise Reconnue
                    </h4>
                    <p className="text-muted-foreground" data-testid="approach-expertise-description">
                      Des solutions technologiques de pointe adaptées aux exigences les plus élevées du marché.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-sans font-semibold text-foreground mb-2" data-testid="approach-engagement-title">
                      Engagement Total
                    </h4>
                    <p className="text-muted-foreground" data-testid="approach-engagement-description">
                      Votre succès est notre priorité. Nous nous investissons pleinement dans chaque projet.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-sans font-semibold text-foreground mb-2" data-testid="approach-results-title">
                      Résultats Mesurables
                    </h4>
                    <p className="text-muted-foreground" data-testid="approach-results-description">
                      Chaque action est orientée vers des objectifs concrets et des résultats quantifiables.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
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
            <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="cta-title">
              Prêt à Transformer Votre Business ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="cta-description">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons propulser votre entreprise vers de nouveaux sommets.
            </p>
            <Link href="/contact">
              <Button
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                data-testid="button-contact-cta"
              >
                Commencer Maintenant
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
