import { useState, useCallback } from 'react';

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async (fetchFunction, ...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    fetchData,
    reset,
  };
};

// Hook for fetching with pagination
export const usePagination = (fetchFunction, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchPage = useCallback(async (pageNumber = 1, params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchFunction({
        page: pageNumber,
        limit: 12,
        ...initialParams,
        ...params,
      });
      
      if (pageNumber === 1) {
        setData(response.items || response);
      } else {
        setData(prev => [...prev, ...(response.items || response)]);
      }
      
      setPage(pageNumber);
      setHasMore(response.hasMore || (response.items?.length || 0) === 12);
      setTotal(response.total || response.length);
      
      return response;
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, initialParams]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      return fetchPage(page + 1);
    }
  }, [hasMore, loading, page, fetchPage]);

  const refresh = useCallback((params = {}) => {
    return fetchPage(1, params);
  }, [fetchPage]);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setTotal(0);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    page,
    hasMore,
    total,
    fetchPage,
    loadMore,
    refresh,
    reset,
  };
};