const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for development
  console.error(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Không tìm thấy tài nguyên với ID ${err.value}`;
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `${field} '${value}' đã được sử dụng. Vui lòng chọn giá trị khác`;
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = { message: 'Token không hợp lệ', statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    error = { message: 'Token đã hết hạn', statusCode: 401 };
  }

  res.status(error.statusCode || 500).json({
    status: 'error',
    message: error.message || 'Lỗi server',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorMiddleware;