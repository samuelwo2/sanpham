import { useSelector, useDispatch } from 'react-redux';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from '../store/slices/cartSlice';
import { toast } from 'react-hot-toast';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, total, itemCount, loading } = useSelector((state) => state.cart);

  const addItemToCart = (product, quantity = 1) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeItemFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const updateItemQuantity = (productId, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(productId));
      toast.success('Sản phẩm đã được xóa khỏi giỏ hàng');
    } else {
      dispatch(updateQuantity({ id: productId, quantity }));
    }
  };

  const clearAllCart = () => {
    dispatch(clearCart());
  };

  const getItemQuantity = (productId) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  return {
    items,
    total,
    itemCount,
    loading,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearAllCart,
    getItemQuantity,
    isInCart,
  };
};