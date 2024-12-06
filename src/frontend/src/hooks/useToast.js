import { useContext } from 'react';
import { ToastContext } from '@/contexts';

export default function useToast() {
  return useContext(ToastContext);
}
