const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const tenantRoutes = require('./routes/tenantsRoute');
const floorRoutes = require('./routes/floorsRoute');

connectDB();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use('/tenants', tenantRoutes);
app.use('/floors', floorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
