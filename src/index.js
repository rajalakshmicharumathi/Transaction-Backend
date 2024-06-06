const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
var config = require('./config');
var data = require('./data');
var helper = require('./helper');
const app = express();

// Middleware
app.use(cors());
app.use(mongoSanitize()); // Sanitize incoming requests

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/transactions', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const transactions = require('./routes/transactions');
app.use('/api/transactions', transactions);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
