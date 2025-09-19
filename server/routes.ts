import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema, insertProductSchema, insertCategorySchema, 
  adminLoginSchema, type AdminUser 
} from "../shared/schema";
import { z } from "zod";
import { ObjectStorageService } from "./objectStorage";

// Extend Express Session interface to include admin
declare module 'express-session' {
  interface SessionData {
    admin?: {
      email: string;
      name: string;
    };
  }
}

// Admin authentication middleware  
function requireAdmin(req: Request, res: Response, next: any) {
  if (!req.session?.admin) {
    return res.status(401).json({ message: "Non autorisé - connexion admin requise" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const validatedData = adminLoginSchema.parse(req.body);
      
      // Check hardcoded admin credentials
      if (validatedData.email === "admin@connectik.com" && validatedData.password === "connectik_admin") {
        // Create admin session
        req.session.admin = {
          email: validatedData.email,
          name: "Administrateur"
        };
        
        console.log('Admin session created:', req.session.admin);
        console.log('Session ID:', req.sessionID);
        
        res.json({
          message: "Connexion réussie",
          admin: { email: validatedData.email, name: "Administrateur" },
          sessionId: req.sessionID
        });
      } else {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Données invalides",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Erreur interne du serveur" 
        });
      }
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Erreur lors de la déconnexion" });
      } else {
        res.json({ message: "Déconnexion réussie" });
      }
    });
  });

  app.get("/api/admin/me", requireAdmin, (req, res) => {
    console.log('Admin me check - Session ID:', req.sessionID);
    console.log('Admin me check - Session admin:', req.session.admin);
    res.json({ admin: req.session.admin });
  });

  // Admin management routes
  
  // Admin contact submissions management
  app.get("/api/admin/contact-submissions", requireAdmin, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des demandes" });
    }
  });

  app.delete("/api/admin/contact-submissions/:id", requireAdmin, async (req, res) => {
    try {
      const success = await storage.deleteContactSubmission(req.params.id);
      if (success) {
        res.json({ message: "Demande supprimée avec succès" });
      } else {
        res.status(404).json({ message: "Demande non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression" });
    }
  });

  // Admin products management  
  app.get("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const products = await storage.getAllProducts(); // includes inactive products
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur lors de la récupération des produits" });
    }
  });

  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedProduct);
      res.status(201).json(product);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur lors de la création du produit" });
      }
    }
  });

  app.put("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedProduct);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Produit non trouvé" });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur lors de la modification du produit" });
      }
    }
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (success) {
        res.json({ message: "Produit supprimé avec succès" });
      } else {
        res.status(404).json({ message: "Produit non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression du produit" });
    }
  });

  // Admin categories management
  app.post("/api/admin/categories", requireAdmin, async (req, res) => {
    try {
      const validatedCategory = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedCategory);
      res.status(201).json(category);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur lors de la création de la catégorie" });
      }
    }
  });

  app.put("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      const validatedCategory = insertCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(req.params.id, validatedCategory);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: "Catégorie non trouvée" });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Données invalides", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erreur lors de la modification de la catégorie" });
      }
    }
  });

  app.delete("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      const success = await storage.deleteCategory(req.params.id);
      if (success) {
        res.json({ message: "Catégorie supprimée avec succès" });
      } else {
        res.status(404).json({ message: "Catégorie non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression de la catégorie" });
    }
  });

  // Public routes

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.json({ 
        message: "Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Données invalides",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Erreur interne du serveur" 
        });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ 
        message: "Erreur interne du serveur" 
      });
    }
  });

  // Product catalog routes
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      let products;
      
      if (category && typeof category === 'string') {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching products: " + error.message });
    }
  });

  // Get single product by slug
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching product: " + error.message });
    }
  });

  // Create new product (admin only - for demo purposes)
  app.post("/api/products", async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedProduct);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ message: "Error creating product: " + error.message });
    }
  });

  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching categories: " + error.message });
    }
  });

  // Create new category (admin only - for demo purposes)  
  app.post("/api/categories", async (req, res) => {
    try {
      const validatedCategory = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedCategory);
      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ message: "Error creating category: " + error.message });
    }
  });

  // Image upload endpoints
  app.post("/api/admin/images/upload", requireAdmin, async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error: any) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Error getting upload URL" });
    }
  });

  app.put("/api/admin/images", requireAdmin, async (req, res) => {
    try {
      const { imageURL } = req.body;
      if (!imageURL) {
        return res.status(400).json({ error: "imageURL is required" });
      }

      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        imageURL,
        {
          owner: "admin",
          visibility: "public",
        }
      );

      res.json({ objectPath });
    } catch (error: any) {
      console.error("Error setting image ACL:", error);
      res.status(500).json({ error: "Error setting image ACL" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
