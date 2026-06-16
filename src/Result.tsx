import { useMemo } from "react";
import type { CheckPrimeResponse } from "@/types.ts";
import { formatOrdinal } from "@/utils.ts";

function OneResult() {
	return <p>It depends who you ask.</p>;
}

function PrimeResult({ result }: { result: CheckPrimeResponse }) {
	return (
		<>
			<p className="prime">
				Yes! {result.value} is the {formatOrdinal(result.nthPrime)} prime
				number.
			</p>
			<p></p>
		</>
	);
}

function CompositeResult({ result }: { result: CheckPrimeResponse }) {
	const primeFactorizationStr = useMemo(() => {
		return result.primeFactorization.join(" × ");
	}, [result.primeFactorization]);
	const uniquePrimeFactorsStr = useMemo(() => {
		return result.uniquePrimeFactors.join(", ");
	}, [result.uniquePrimeFactors]);
	const allFactorsStr = useMemo(() => {
		return result.allFactors.join(", ");
	}, [result.allFactors]);
	return (
		<>
			<p className="composite">No. {result.value} is a composite number.</p>
			<table>
				<tbody>
					<tr>
						<th>Prime Factorization</th>
						<td>{primeFactorizationStr}</td>
					</tr>
					<tr>
						<th>Unique Prime Factors</th>
						<td>{uniquePrimeFactorsStr}</td>
					</tr>
					<tr>
						<th>All Factors</th>
						<td>{allFactorsStr}</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default function Result({ result }: { result: CheckPrimeResponse }) {
	return (
		<div className="result">
			<h2>Is {result.value} Prime?</h2>
			{result.value === 1 ? (
				<OneResult />
			) : result.isPrime ? (
				<PrimeResult result={result} />
			) : (
				<CompositeResult result={result} />
			)}
		</div>
	);
}
