const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import route modules
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const groupRoutes = require('./routes/group');
const subgroupRoutes = require('./routes/subgroup');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/subgroups', subgroupRoutes);

module.exports = app;