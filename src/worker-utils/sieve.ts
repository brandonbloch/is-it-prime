// https://di-mgt.com.au/Sieve.c.html
export default function sieve(n: number, onProgress: (percent: number) => void) {
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("Invalid argument");
  }
  const nlimit = n;
  const mark = new Array<number>(nlimit).fill(0);
  const klimit = Math.floor(Math.sqrt(nlimit)) + 1;

  // Mark the composites
  // Special case
  mark[1] = -1;

  // Set k = 1. Loop until k >= sqrt(n)
  let m: number;
  let lastSentK = 0;
  for (let k = 1; k <= klimit; k = m) {

    if (k - lastSentK >= 1000) {
      console.log('sending progress', k);
      onProgress(Math.floor(100 * k / klimit));
      lastSentK = k;
    }

    // Find first non-composite in list > k
    for (m = k + 1; m < nlimit; m++) {
      if (!mark[m]) {
        break;
      }
    }

    /* Mark the numbers 2m, 3m, 4m, ... */
    for (let i = m * 2; i < nlimit; i += m) {
      mark[i] = -1;
    }
  }

  const results: number[] = [];

  /* Now display results - all unmarked numbers are prime */
  for (let i = 1; i < nlimit; i++) {
    if (!mark[i]) {
      results.push(i);
    }
  }

  return results;
}

