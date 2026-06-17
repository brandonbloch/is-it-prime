import { useMemo } from "react";
import type { CheckPrimeResponse } from "@/types.ts";
import { joinListCommasAnd, joinListTimes } from "@/utils.ts";

export default function CompositeResult({
	result,
}: {
	result: CheckPrimeResponse;
}) {
	const divisibleByLabel = useMemo(
		() => joinListCommasAnd(result.allFactors.slice(1, -1)), // remove 1 and itself
		[result.allFactors],
	);

	const uniquePrimeFactorsLabel = useMemo(
		() => joinListCommasAnd(result.uniquePrimeFactors),
		[result.uniquePrimeFactors],
	);

	const primeFactorizationLabel = useMemo(() => {
		return `${joinListTimes(result.primeFactorization)} = ${result.value}`;
	}, [result.primeFactorization, result.value]);

	return (
		<div className="result result-composite">
			<h2>No.</h2>
			<p>
				{result.value} is a{" "}
				<a href="https://en.wikipedia.org/wiki/Composite_number">
					composite number
				</a>
				.
				{result.isHighlyComposite ? (
					<>
						{" "}
						It's actually considered{" "}
						<a href="https://en.wikipedia.org/wiki/Highly_composite_number">
							highly composite
						</a>
						!
					</>
				) : null}
			</p>
			<p>It’s divisible by {divisibleByLabel}.</p>
			{result.value === 69 && (
				<p>
					But it is <a href="https://nicenumbers.net">nice</a>!
				</p>
			)}
			{result.uniquePrimeFactors.length === 1 ? (
				<p>
					Its only prime factor is {result.uniquePrimeFactors[0]!}, making it a{" "}
					<a href="https://en.wikipedia.org/wiki/Prime_power">#primepower</a>:
				</p>
			) : (
				<p>Its unique prime factors are {uniquePrimeFactorsLabel}:</p>
			)}
			<p>{primeFactorizationLabel}</p>
		</div>
	);
}
