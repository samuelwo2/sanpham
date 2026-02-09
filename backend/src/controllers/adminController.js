const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');

// @desc    Get admin dashboard summary
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardSummary = asyncHandler(async (req, res) => {
  // Count documents
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalCategories = await Category.countDocuments();

  // Today's stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newUsersToday = await User.countDocuments({ createdAt: { $gte: today } });
  const newOrdersToday = await Order.countDocuments({ createdAt: { $gte: today } });
  
  // Total revenue
  const revenueResult = await Order.aggregate([
    {
      $match: { status: 'delivered' }
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$total' }
      }
    }
  ]);

  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

  // Monthly revenue
  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);

  const monthlyRevenueResult = await Order.aggregate([
    {
      $match: {
        status: 'delivered',
        createdAt: { $gte: currentMonth }
      }
    },
    {
      $group: {
        _id: null,
        monthlyRevenue: { $sum: '$total' }
      }
    }
  ]);

  const monthlyRevenue = monthlyRevenueResult.length > 0 ? monthlyRevenueResult[0].monthlyRevenue : 0;

  // Latest orders
  const latestOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email');

  // Low stock products
  const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
    .sort({ stock: 1 })
    .limit(5)
    .select('name stock price');

  res.json({
    status: 'success',
    data: {
      summary: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalCategories,
        newUsersToday,
        newOrdersToday,
        totalRevenue,
        monthlyRevenue
      },
      latestOrders,
      lowStockProducts
    }
  });
});

// @desc    Get admin users page
// @route   GET /api/admin/users
// @access  Private/Admin
const getAdminUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select('-password')
    .sort({ createdAt: -1 });

  res.json({
    status: 'success',
    data: {
      users
    }
  });
});

// @desc    Get admin user detail
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getAdminUserDetail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password')
    .populate({
      path: 'orders',
      options: { sort: { createdAt: -1 } }
    })
    .populate('wishlist');

  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }

  // Get user statistics
  const totalOrders = user.orders?.length || 0;
  const totalSpent = user.orders?.reduce((sum, order) => sum + order.total, 0) || 0;

  res.json({
    status: 'success',
    data: {
      user,
      statistics: {
        totalOrders,
        totalSpent,
        averageOrderValue: totalOrders > 0 ? totalSpent / totalOrders : 0,
        lastOrderDate: user.orders?.[0]?.createdAt || null
      }
    }
  });
});

// @desc    Update user by admin
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }

  const { name, email, phone, role, isActive, address } = req.body;

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (role) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;
  if (address) user.address = address;

  const updatedUser = await user.save();

  res.json({
    status: 'success',
    message: 'Cập nhật thông tin người dùng thành công',
    data: {
      user: updatedUser
    }
  });
});

// @desc    Delete user by admin
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }

  // Check if user has orders
  const hasOrders = await Order.exists({ user: user._id });
  
  if (hasOrders) {
    res.status(400);
    throw new Error('Không thể xóa người dùng đã có đơn hàng');
  }

  await user.deleteOne();

  res.json({
    status: 'success',
    message: 'Xóa người dùng thành công'
  });
});

module.exports = {
  getDashboardSummary,
  getAdminUsers,
  getAdminUserDetail,
  updateUserByAdmin,
  deleteUserByAdmin
};