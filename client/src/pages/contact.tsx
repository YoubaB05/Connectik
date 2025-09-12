import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { FloatingInput, FloatingTextarea, FloatingSelect } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    }
  });

  const submitContactForm = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message envoyé avec succès !",
        description: data.message,
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur lors de l'envoi",
        description: error.message || "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitContactForm.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@excellence-digitale.fr",
      subtitle: "Réponse sous 24h",
      color: "primary"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      subtitle: "Lun-Ven, 9h-18h",
      color: "accent"
    },
    {
      icon: MapPin,
      title: "Localisation",
      value: "Paris & Région Parisienne",
      subtitle: "Interventions à distance",
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
            <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground mb-6" data-testid="contact-title">
              Prêt à Transformer Votre Business ?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="contact-subtitle">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons propulser votre entreprise vers de nouveaux sommets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl border border-border shadow-lg"
            >
              <h3 className="text-2xl font-sans font-bold text-foreground mb-6" data-testid="form-title">
                Demander une Consultation
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                  data-testid="success-message"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="text-xl font-sans font-semibold text-foreground mb-2">
                    Message envoyé avec succès !
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Nous avons bien reçu votre demande et vous contacterons très bientôt.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    data-testid="button-send-another"
                  >
                    Envoyer un autre message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput
                      id="firstName"
                      label="Prénom"
                      {...form.register("firstName")}
                      error={form.formState.errors.firstName?.message}
                      data-testid="input-firstname"
                    />
                    <FloatingInput
                      id="lastName"
                      label="Nom"
                      {...form.register("lastName")}
                      error={form.formState.errors.lastName?.message}
                      data-testid="input-lastname"
                    />
                  </div>
                  
                  <FloatingInput
                    id="email"
                    type="email"
                    label="Email"
                    {...form.register("email")}
                    error={form.formState.errors.email?.message}
                    data-testid="input-email"
                  />
                  
                  <FloatingInput
                    id="phone"
                    type="tel"
                    label="Téléphone (optionnel)"
                    {...form.register("phone")}
                    error={form.formState.errors.phone?.message}
                    data-testid="input-phone"
                  />
                  
                  <FloatingSelect
                    id="service"
                    label="Service d'intérêt"
                    {...form.register("service")}
                    error={form.formState.errors.service?.message}
                    data-testid="select-service"
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="fondation">Fondation Digitale</option>
                    <option value="ia">Innovation IA</option>
                    <option value="croissance">Stratégie de Croissance</option>
                    <option value="autre">Autre</option>
                  </FloatingSelect>
                  
                  <FloatingTextarea
                    id="message"
                    label="Message"
                    rows={4}
                    {...form.register("message")}
                    error={form.formState.errors.message?.message}
                    data-testid="textarea-message"
                  />
                  
                  <Button
                    type="submit"
                    disabled={submitContactForm.isPending}
                    className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-submit-form"
                  >
                    {submitContactForm.isPending ? "Envoi en cours..." : "Envoyer ma Demande"}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    En soumettant ce formulaire, vous acceptez notre{" "}
                    <a href="#" className="text-primary hover:underline">politique de confidentialité</a>.
                  </p>
                </form>
              )}
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-sans font-bold text-foreground mb-6" data-testid="contact-info-title">Coordonnées</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const colorClasses = getColorClasses(info.color);
                    const Icon = info.icon;
                    
                    return (
                      <div key={index} className="flex items-center" data-testid={`contact-info-${index}`}>
                        <div className={`w-12 h-12 ${colorClasses.iconBg} rounded-lg flex items-center justify-center mr-4`}>
                          <Icon className={`w-6 h-6 ${colorClasses.iconColor}`} />
                        </div>
                        <div>
                          <p className="font-sans font-medium text-foreground" data-testid={`contact-value-${index}`}>
                            {info.value}
                          </p>
                          <p className="text-sm text-muted-foreground" data-testid={`contact-subtitle-${index}`}>
                            {info.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="text-lg font-sans font-semibold text-foreground" data-testid="consultation-title">
                    Consultation Gratuite
                  </h4>
                </div>
                <p className="text-muted-foreground mb-4" data-testid="consultation-description">
                  Bénéficiez d'un premier échange de 30 minutes pour définir ensemble la stratégie idéale pour votre projet.
                </p>
                <Button 
                  className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-sans font-medium hover:bg-accent/90 transition-colors duration-200"
                  data-testid="button-book-consultation"
                >
                  Réserver ma Consultation
                </Button>
              </div>
              
              {/* Office Image */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
                  alt="Bureaux modernes représentant l'excellence corporative"
                  className="w-full h-48 object-cover"
                  data-testid="office-image"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
