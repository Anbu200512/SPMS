import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

const cache = new Map();

const useFetch = (url, options = {}) => {
  const {
    method = 'GET',
    params = {},
    body = null,
    headers = {},
    useCache = false,
    cacheDuration = 300000,
    enabled = true,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);
  const mountedRef = useRef(true);

  const cacheKey = `${method}:${url}:${JSON.stringify(params)}`;

  const fetchData = useCallback(async () => {
    if (!url || !enabled) return;

    if (useCache && cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < cacheDuration) {
        setData(cached.data);
        setLoading(false);
        setError(null);
        return;
      }
      cache.delete(cacheKey);
    }

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        url,
        params,
        data: body,
        headers,
        signal: abortControllerRef.current.signal,
      };

      const response = await api(config);
      const result = response.data;

      if (mountedRef.current) {
        setData(result);
        setError(null);

        if (useCache) {
          cache.set(cacheKey, { data: result, timestamp: Date.now() });
        }
      }
    } catch (err) {
      if (err.name === 'AbortError' || err.name === 'CanceledError') return;
      if (mountedRef.current) {
        setError(err.response?.data || { message: err.message });
        setData(null);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [url, method, JSON.stringify(params), body, headers, useCache, cacheKey, cacheDuration, enabled]);

  useEffect(() => {
    mountedRef.current = true;
    fetchData();
    return () => {
      mountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    if (useCache) cache.delete(cacheKey);
    return fetchData();
  }, [fetchData, cacheKey, useCache]);

  return { data, loading, error, refetch };
};

export default useFetch;
