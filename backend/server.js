const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const homepageRoutes = require('./routes/homepageRoutes');
const grievanceRoutes = require('./routes/grievanceRoutes');
const userRoutes = require('./routes/userRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes'); 
const authRoutes = require('./routes/authroutes');  // Import auth routes
// Import new routes

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());

// Use Routes
app.use('/api/homepage', homepageRoutes);
app.use('/api/grievance', grievanceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/aboutus', aboutUsRoutes); // Add new routes
app.use('/api/auth', authRoutes);  // Add auth routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
