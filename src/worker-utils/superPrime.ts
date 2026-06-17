// https://en.wikipedia.org/wiki/Super-prime
// assumes n is prime
export default function checkIsSuperPrime(
	n: number,
	primesUpToAndIncluding: number[],
) {
	const indexOfN = primesUpToAndIncluding.indexOf(n);
	if (indexOfN === -1) {
		return false; // shouldn't be possible
	}
	// the prime number n is the {primeIndex}th prime
	const primeIndex = indexOfN + 1; // convert to 1-indexed

	// is primeIndex a prime number?
	return primesUpToAndIncluding.includes(primeIndex);
}
