const express = require('express');
const router = express.Router();
const {
  getDashboardSummary,
  getAdminUsers,
  getAdminUserDetail,
  updateUserByAdmin,
  deleteUserByAdmin
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin dashboard
router.get('/dashboard', protect, admin, getDashboardSummary);

// User management
router.get('/users', protect, admin, getAdminUsers);
router.get('/users/:id', protect, admin, getAdminUserDetail);
router.put('/users/:id', protect, admin, updateUserByAdmin);
router.delete('/users/:id', protect, admin, deleteUserByAdmin);

module.exports = router;