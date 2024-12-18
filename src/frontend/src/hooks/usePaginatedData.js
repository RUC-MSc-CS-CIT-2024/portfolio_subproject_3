import { useState, useEffect, useCallback } from 'react';

export default function usePaginatedData(fetchData, id, count = 12) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    (async () => {
      try {
        const response = await fetchData({ id, page, count });
        setData((prevData) =>
          page === 1 ? response.items : [...prevData, ...response.items],
        );
        setHasMore(response.nextPage !== null);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    })();
  }, [id, fetchData, page, count]);

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore]);

  return { data, hasMore, handleLoadMore };
}
