import express from "express";
import cors from "cors";
import session from "express-session";
import MemoryStore from "memorystore";
import { registerRoutes } from "./routes";

const app = express();
const PORT = Number(process.env.PORT || 3000); // Convert PORT to number
const MemoryStoreSession = MemoryStore(session);

// Remove static file serving since it's not needed for API-only server
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g., curl, server-to-server)
    if (!origin) return callback(null, true);

    const allowedOrigins = new Set([
      'http://localhost:5173',
      'https://connectik1.netlify.app'
    ]);

    try {
      const hostname = new URL(origin).hostname;
      const isNetlifyPreview = /\.netlify\.app$/.test(hostname);
      if (allowedOrigins.has(origin) || isNetlifyPreview) {
        return callback(null, true);
      }
    } catch (_) {
      // If parsing fails, fall through to block
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  store: new MemoryStoreSession({
    checkPeriod: 86400000
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}));

// Initialize routes and start server
(async () => {
  try {
    const server = await registerRoutes(app);
    
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`API server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
