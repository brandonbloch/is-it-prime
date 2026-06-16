import { useEffect, useMemo } from 'react';

const worker = new Worker("/worker.ts");

// use a memoized event handler for onmessage!
export default function useWorker<Req, Res>(onmessage: (e: MessageEvent<Res>) => void) {
  useEffect(() => {
    worker.addEventListener("message", onmessage);
    return () => {
      worker.removeEventListener("message", onmessage);
    };
  }, [worker]);

  return useMemo(
    () => worker.postMessage.bind(worker),
    []
  ) as (message: Req) => void;
}
