import { useEffect } from 'react';

export default function useAsyncEffect(asyncFunc, onCompletionFunc, deps) {
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const resp = await asyncFunc();
      if (isMounted) {
        onCompletionFunc(resp);
      }
    })();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
}
