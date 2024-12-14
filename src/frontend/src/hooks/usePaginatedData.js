import { useState, useEffect, useCallback } from 'react';

export default function usePaginatedData(
  fetchData,
  id,
  initialPage = 1,
  count = 12,
) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const response = await fetchData({ id, page, count });
      setData((prevData) =>
        page === 1 ? response.items : [...prevData, ...response.items],
      );
      setHasMore(!!response.nextPage);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, [fetchData, id, page, count]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id, page, loadData]);

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore]);

  return { data, hasMore, handleLoadMore };
}
