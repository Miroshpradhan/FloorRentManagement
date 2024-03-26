const express = require('express');
const connectDB = require('./config/db');
const tenantRoutes = require('./routes/tenantRoutes');

connectDB();

const app = express();
app.use(express.json());

app.use('/api/tenants', tenantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
