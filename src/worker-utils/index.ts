import type { CheckPrimeMessage } from "@/types.ts";
import getAllFactors from "@/worker-utils/getAllFactors.ts";
import getUniquePrimeFactors from "@/worker-utils/getUniquePrimeFactors.ts";
import { checkIsHighlyComposite } from "@/worker-utils/hcn.ts";
import primeFactorize from "@/worker-utils/primeFactorize.ts";
import sieve from "@/worker-utils/sieve.ts";
import checkIsSuperPrime from "@/worker-utils/superPrime.ts";

export function checkValue(
	value: number,
	respond: (res: CheckPrimeMessage) => void,
) {
	const primesUpToAndIncluding = sieve(value + 1, (percent: number) => {
		respond({
			type: "progress",
			progress: percent,
		});
	});
	const isPrime =
		primesUpToAndIncluding.length > 0 &&
		primesUpToAndIncluding[primesUpToAndIncluding.length - 1]! === value;

	const isSuperPrime = isPrime
		? checkIsSuperPrime(value, primesUpToAndIncluding)
		: false;

	const nthPrime = isPrime ? primesUpToAndIncluding.length : 0;

	const primeFactorization = isPrime
		? [value]
		: primeFactorize(value, primesUpToAndIncluding);

	const uniquePrimeFactors = isPrime
		? [value]
		: getUniquePrimeFactors(primeFactorization);

	const allFactors = isPrime ? [1, value] : getAllFactors(value);

	const isHighlyComposite = isPrime ? false : checkIsHighlyComposite(value);

	respond({
		type: "response",
		value,
		isPrime,
		isSuperPrime,
		nthPrime,
		primeFactorization,
		uniquePrimeFactors,
		allFactors,
		isHighlyComposite,
	});
}
