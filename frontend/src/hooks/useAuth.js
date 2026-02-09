import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    loading,
    logout: handleLogout,
  };
};

// Protected route hook
export const useProtectedRoute = (redirectTo = '/login') => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, loading, navigate, redirectTo]);

  return { isAuthenticated, loading };
};

// Admin route hook
export const useAdminRoute = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (user && user.role !== 'admin') {
        navigate('/');
      }
    }
  }, [user, isAuthenticated, loading, navigate]);

  return { user, isAuthenticated, loading };
};