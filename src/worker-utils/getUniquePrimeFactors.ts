export default function getUniquePrimeFactors(primeFactors: number[]) {
  const unique = new Set(primeFactors);
  return [...unique].sort((a, b) => a - b);
}
