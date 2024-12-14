import { useContext } from 'react';
import { SearchContext } from '@/contexts';

export default function useSearch() {
  return useContext(SearchContext);
}
