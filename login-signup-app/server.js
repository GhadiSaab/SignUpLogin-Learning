import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { sequelize } from './models/index.js'; // Correct import path
import userRoutes from './routes/userRoutes.js'; // Correct import path

config(); // Initialize dotenv

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://192.168.0.109:5173'
  }));
  
app.use(express.json()); // Parse JSON bodies
app.use('/api/users', userRoutes); // Set up user routes

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on http://192.168.0.109:${PORT}`);
  });
}).catch(error => console.error('Unable to sync database:', error));
