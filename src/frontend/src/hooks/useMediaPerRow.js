import { useState, useEffect, useCallback } from 'react';
import debounce from '@/utils';

function getMediaPerRow(width) {
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

export default function useMediaPerRow() {
  const [mediaPerRow, setMediaPerRow] = useState(
    getMediaPerRow(window.innerWidth),
  );

  const updateMediaPerRow = useCallback(() => {
    debounce(() => {
      setMediaPerRow(getMediaPerRow(window.innerWidth));
    }, 200)();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateMediaPerRow);
    return () => window.removeEventListener('resize', updateMediaPerRow);
  }, [updateMediaPerRow]);

  return mediaPerRow;
}
