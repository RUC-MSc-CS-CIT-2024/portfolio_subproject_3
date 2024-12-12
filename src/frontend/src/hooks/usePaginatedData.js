import { useState, useEffect, useCallback } from 'react';

export default function usePaginatedData(
  fetchData,
  id,
  initialPage = 1,
  count = 12,
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchData({ id, page, count });
      setData((prevData) =>
        page === 1 ? response.items : [...prevData, ...response.items],
      );
      setHasMore(!!response.nextPage);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchData, id, page, count]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id, page, loadData]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  return { data, loading, hasMore, handleLoadMore };
}
