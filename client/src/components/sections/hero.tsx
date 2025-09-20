import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  const scrollToSolutions = () => {
    const element = document.getElementById('solutions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="hero-content"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-white leading-tight mb-6">
              Votre Partenaire pour une{" "}
              <span className="text-accent">Croissance Digitale</span>{" "}
              Stratégique et Durable
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed" data-testid="hero-description">
              Nous transformons votre vision en succès concret grâce à notre expertise en développement digital, intelligence artificielle et stratégies de croissance sur mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/offres">
                <Button
                  className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-sans font-semibold text-lg hover:bg-accent/90 transition-all duration-200 hover:scale-105"
                  data-testid="button-discover-offers"
                >
                  Consulter nos Offres
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-[#C5A974] bg-[#C5A974] text-white px-8 py-4 rounded-lg font-sans font-medium text-lg hover:bg-[#B39861] hover:border-[#B39861] transition-all duration-200"
                  data-testid="button-start-project"
                >
                  Commencer votre Projet
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
            data-testid="hero-image"
          >
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Stratégie d'entreprise et analyse de données"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={scrollToSolutions}
        data-testid="scroll-indicator"
      >
        <ChevronDown className="w-6 h-6 text-white/70" />
      </motion.div>
    </section>
  );
}
