const validator = require('validator');

const validateRegisterInput = (data) => {
  const errors = {};

  // Name validation
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Vui lòng nhập tên';
  } else if (data.name.length < 2) {
    errors.name = 'Tên phải có ít nhất 2 ký tự';
  }

  // Email validation
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Vui lòng nhập email';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Email không hợp lệ';
  }

  // Password validation
  if (!data.password || data.password.trim() === '') {
    errors.password = 'Vui lòng nhập mật khẩu';
  } else if (data.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
  }

  // Phone validation
  if (!data.phone || data.phone.trim() === '') {
    errors.phone = 'Vui lòng nhập số điện thoại';
  } else if (!/^\d{10,11}$/.test(data.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateLoginInput = (data) => {
  const errors = {};

  if (!data.email || data.email.trim() === '') {
    errors.email = 'Vui lòng nhập email';
  }

  if (!data.password || data.password.trim() === '') {
    errors.password = 'Vui lòng nhập mật khẩu';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = {
  validateRegisterInput,
  validateLoginInput
};