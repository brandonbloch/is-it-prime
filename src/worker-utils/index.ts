import type { CheckPrimeProgress, CheckPrimeResponse } from '@/types.ts';
import getAllFactors from '@/worker-utils/getAllFactors.ts';
import getUniquePrimeFactors from '@/worker-utils/getUniquePrimeFactors.ts';
import primeFactorize from '@/worker-utils/primeFactorize.ts';
import sieve from '@/worker-utils/sieve.ts';

export function checkValue(value: number, respond: (res: CheckPrimeResponse | CheckPrimeProgress) => void) {
  const primesUpToAndIncluding = sieve(value + 1, (percent: number) => {
    respond({
      type: "progress",
      progress: percent,
    });
  });
  const isPrime = primesUpToAndIncluding.length > 0 &&
    primesUpToAndIncluding[primesUpToAndIncluding.length - 1]! === value;

  const nthPrime = isPrime ? primesUpToAndIncluding.length : 0;

  const primeFactorization = isPrime
    ? [value]
    : primeFactorize(value, primesUpToAndIncluding);

  const uniquePrimeFactors = isPrime
    ? [value]
    : getUniquePrimeFactors(primeFactorization);

  const allFactors = isPrime ? [1, value] : getAllFactors(value);

  respond({
    type: "response",
    value,
    isPrime,
    nthPrime,
    primeFactorization,
    uniquePrimeFactors,
    allFactors,
  });
}
