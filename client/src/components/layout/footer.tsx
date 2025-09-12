import { Link } from "wouter";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-sans font-bold mb-4" data-testid="footer-title">
              Excellence Digitale
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed" data-testid="footer-description">
              Votre partenaire de confiance pour une transformation digitale réussie. Nous combinons expertise technique, stratégie commerciale et innovation pour propulser votre entreprise vers l'excellence.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-sans font-semibold mb-4" data-testid="footer-services-title">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services"><a className="text-white/80 hover:text-white transition-colors duration-200" data-testid="footer-link-digital">Fondation Digitale</a></Link></li>
              <li><Link href="/services"><a className="text-white/80 hover:text-white transition-colors duration-200" data-testid="footer-link-ai">Innovation IA</a></Link></li>
              <li><Link href="/services"><a className="text-white/80 hover:text-white transition-colors duration-200" data-testid="footer-link-growth">Stratégie de Croissance</a></Link></li>
              <li><Link href="/contact"><a className="text-white/80 hover:text-white transition-colors duration-200" data-testid="footer-link-consultation">Consultation</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-sans font-semibold mb-4" data-testid="footer-company-title">Entreprise</h4>
            <ul className="space-y-2">
              <li><Link href="/about"><a className="text-white/80 hover:text-white transition-colors duration-200" data-testid="footer-link-about">À Propos</a></Link></li>
              <li><Link href="/about"><a className="text-white/80 hover:text-white transition-colors duration-200" data-testid="footer-link-team">Notre Équipe</a></Link></li>
              <li><Link href="/contact"><a className="text-white/80 hover:text-white transition-colors duration-200" data-testid="footer-link-contact">Contact</a></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0" data-testid="footer-copyright">
            © 2024 Excellence Digitale. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors duration-200" data-testid="footer-legal">Mentions Légales</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors duration-200" data-testid="footer-privacy">Politique de Confidentialité</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors duration-200" data-testid="footer-terms">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
