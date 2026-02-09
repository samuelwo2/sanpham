require('dotenv').config(); // Thêm dòng này ở đầu file
const express = require('express');
const connectDB = require('./config/database'); // Import kết nối DB

const app = express();

// Middleware
app.use(express.json());

// 🔥 KẾT NỐI DATABASE - Thêm trước khi start server
connectDB();

// Routes hiện có của bạn
app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running',
    database: 'MongoDB connected successfully'
  });
});

// Các routes khác của bạn...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});