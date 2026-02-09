// Validate product form
export const validateProductForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) {
    errors.name = 'Tên sản phẩm là bắt buộc';
  }
  
  if (!formData.price || formData.price <= 0) {
    errors.price = 'Giá sản phẩm phải lớn hơn 0';
  }
  
  if (formData.discountPrice && formData.discountPrice >= formData.price) {
    errors.discountPrice = 'Giá khuyến mãi phải nhỏ hơn giá gốc';
  }
  
  if (!formData.description?.trim()) {
    errors.description = 'Mô tả sản phẩm là bắt buộc';
  }
  
  if (!formData.categoryId) {
    errors.categoryId = 'Danh mục là bắt buộc';
  }
  
  if (!formData.stock || formData.stock < 0) {
    errors.stock = 'Số lượng tồn kho không hợp lệ';
  }
  
  return errors;
};

// Validate user form
export const validateUserForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) {
    errors.name = 'Họ tên là bắt buộc';
  } else if (formData.name.length < 2) {
    errors.name = 'Họ tên phải có ít nhất 2 ký tự';
  }
  
  if (!formData.email?.trim()) {
    errors.email = 'Email là bắt buộc';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email không hợp lệ';
  }
  
  if (!formData.phone?.trim()) {
    errors.phone = 'Số điện thoại là bắt buộc';
  } else if (!/^\d{10,11}$/.test(formData.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ';
  }
  
  if (formData.password && formData.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
  }
  
  if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu không khớp';
  }
  
  return errors;
};

// Validate order form
export const validateOrderForm = (formData) => {
  const errors = {};
  
  if (!formData.shippingAddress?.trim()) {
    errors.shippingAddress = 'Địa chỉ giao hàng là bắt buộc';
  }
  
  if (!formData.phone?.trim()) {
    errors.phone = 'Số điện thoại là bắt buộc';
  } else if (!/^\d{10,11}$/.test(formData.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ';
  }
  
  if (!formData.paymentMethod) {
    errors.paymentMethod = 'Phương thức thanh toán là bắt buộc';
  }
  
  return errors;
};

// Sanitize input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove JavaScript protocol
    .substring(0, 1000); // Limit length
};