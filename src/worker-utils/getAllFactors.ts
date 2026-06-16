export default function getAllFactors(n: number) {
	const limit = Math.floor(Math.sqrt(n));
	const factors = new Set<number>();
	factors.add(1);
	factors.add(n);
	for (let i = 2; i <= limit; i++) {
		if (n % i === 0) {
			factors.add(i);
			factors.add(Math.floor(n / i));
		}
	}
	return [...factors].sort((a, b) => a - b);
}
