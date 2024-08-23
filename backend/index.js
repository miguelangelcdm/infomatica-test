const app = require('./src/app');
const sequelize = require('./src/config/config');

// Import models to ensure they are registered with Sequelize
require('./src/models/groupModel')
require('./src/models/subGroupModel')
require('./src/models/productModel');
require('./src/models/orderModel');
require('./src/models/productOrderModel'); // Ensure associations are set up

const PORT = process.env.PORT || 3002;

// Start the server
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate(); // Test database connection
    console.log(`Database connection established successfully.`);

    await sequelize.sync({ alter: true }); // Use alter for development; for production, use migration scripts
    
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});