import type { CheckPrimeProgress, CheckPrimeRequest, CheckPrimeResponse } from '@/types.ts';
import { checkValue } from '@/worker-utils';
import sieve from '@/worker-utils/sieve.ts';

console.log("worker is working!");

const respond = (res: CheckPrimeResponse | CheckPrimeProgress) => postMessage(res);

onmessage = (e: MessageEvent<CheckPrimeRequest>) => {
  const { value } = e.data;
  checkValue(value, respond);
};
