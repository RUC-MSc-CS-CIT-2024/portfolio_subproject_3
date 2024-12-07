import { useState, useEffect, useCallback } from 'react';
import debounce from '@/utils/debounce';

function getItemsPerRow(width) {
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

export default function useItemsPerRow() {
  const [itemsPerRow, setItemsPerRow] = useState(
    getItemsPerRow(window.innerWidth),
  );

  const updateItemsPerRow = useCallback(() => {
    debounce(() => {
      setItemsPerRow(getItemsPerRow(window.innerWidth));
    }, 200)();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateItemsPerRow);
    return () => window.removeEventListener('resize', updateItemsPerRow);
  }, [updateItemsPerRow]);

  return itemsPerRow;
}
