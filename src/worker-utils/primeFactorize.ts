export default function primeFactorize(n: number, primesUpTo: number[]) {
  const primeFactors: number[] = [];
  for (let i = 0; i < primesUpTo.length;) {
    const k = primesUpTo[i]!;
    if (n % k === 0) {
      n = Math.floor(n / k); // Math.floor just in case
      primeFactors.push(k);
      i = 0; // start over
    } else {
      i++;
    }
  }
  return primeFactors;
}
