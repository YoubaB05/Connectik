import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marie Dubois",
      company: "Directrice, TechStart SAS",
      initials: "MD",
      quote: "Excellence Digitale a transformé notre vision en une réalité dépassant toutes nos attentes. Leur expertise en IA a révolutionné nos processus."
    },
    {
      name: "Pierre Laurent", 
      company: "PDG, InnovCorp",
      initials: "PL",
      quote: "Grâce à leur stratégie de croissance sur mesure, nous avons doublé notre chiffre d'affaires en 18 mois. Une équipe exceptionnelle !"
    },
    {
      name: "Sophie Martin",
      company: "Fondatrice, Luxe & Style", 
      initials: "SM",
      quote: "Un site web magnifique qui reflète parfaitement notre image de marque. L'attention aux détails est remarquable."
    }
  ];

  const StarRating = () => (
    <div className="flex text-accent mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-current" />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-sans font-bold text-foreground mb-6" data-testid="testimonials-title">
            Ce que disent nos Clients
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="testimonials-subtitle">
            Découvrez comment nous avons transformé la vision de nos partenaires en succès concrets et durables.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg border border-border"
              data-testid={`testimonial-${index}`}
            >
              <StarRating />
              <blockquote className="text-lg text-muted-foreground mb-6 italic leading-relaxed" data-testid={`testimonial-quote-${index}`}>
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mr-4">
                  <span className="text-sm font-sans font-semibold text-muted-foreground" data-testid={`testimonial-initials-${index}`}>
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <div className="font-sans font-semibold text-foreground" data-testid={`testimonial-name-${index}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`testimonial-company-${index}`}>
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
