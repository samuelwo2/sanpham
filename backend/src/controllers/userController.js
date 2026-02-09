const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all users (for admin)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Search filter
  const search = req.query.search || '';
  const role = req.query.role || '';
  const status = req.query.status || '';

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
  }

  if (role) {
    filter.role = role;
  }

  if (status === 'active') {
    filter.isActive = true;
  } else if (status === 'inactive') {
    filter.isActive = false;
  }

  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  res.json({
    status: 'success',
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    }
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password')
    .populate({
      path: 'orders',
      options: { sort: { createdAt: -1 }, limit: 10 }
    })
    .populate('wishlist');

  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }

  res.json({
    status: 'success',
    data: {
      user
    }
  });
});

// @desc    Update user (for admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, phone, role, isActive } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (role) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;

  const updatedUser = await user.save();

  res.json({
    status: 'success',
    message: 'Cập nhật người dùng thành công',
    data: {
      user: updatedUser
    }
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }

  // Prevent deleting admin users
  if (user.role === 'admin') {
    res.status(400);
    throw new Error('Không thể xóa tài khoản admin');
  }

  await user.deleteOne();

  res.json({
    status: 'success',
    message: 'Xóa người dùng thành công'
  });
});

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private/Admin
const getUserStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalAdmins = await User.countDocuments({ role: 'admin' });
  const activeUsers = await User.countDocuments({ isActive: true });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const newUsersToday = await User.countDocuments({ createdAt: { $gte: today } });
  const newUsersThisWeek = await User.countDocuments({
    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  });
  const newUsersThisMonth = await User.countDocuments({
    createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  });

  // Gender distribution
  const genderStats = await User.aggregate([
    {
      $group: {
        _id: '$gender',
        count: { $sum: 1 }
      }
    }
  ]);

  // Registration by month (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const registrationStats = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: sixMonthsAgo }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    },
    {
      $project: {
        _id: 0,
        period: {
          $concat: [
            { $toString: '$_id.year' },
            '-',
            { $toString: { $cond: [{ $lt: ['$_id.month', 10] }, { $concat: ['0', { $toString: '$_id.month' }] }, { $toString: '$_id.month' }] } }
          ]
        },
        count: 1
      }
    }
  ]);

  res.json({
    status: 'success',
    data: {
      totalUsers,
      totalAdmins,
      activeUsers,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      genderStats,
      registrationStats
    }
  });
});

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
};