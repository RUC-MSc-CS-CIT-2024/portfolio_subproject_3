import { useState, useEffect, useCallback } from 'react';
import debounce from '@/utils/debounce';

function getMoviesPerRow(width) {
  if (width >= 1200) {
    return 6;
  } else if (width >= 992) {
    return 4;
  } else if (width >= 768) {
    return 3;
  } else if (width >= 576) {
    return 2;
  } else {
    return 1;
  }
}

export default function useMoviesPerRow() {
  const [moviesPerRow, setMoviesPerRow] = useState(
    getMoviesPerRow(window.innerWidth),
  );

  const updateMoviesPerRow = useCallback(() => {
    debounce(() => {
      setMoviesPerRow(getMoviesPerRow(window.innerWidth));
    }, 200)();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateMoviesPerRow);
    return () => window.removeEventListener('resize', updateMoviesPerRow);
  }, [updateMoviesPerRow]);

  return moviesPerRow;
}
