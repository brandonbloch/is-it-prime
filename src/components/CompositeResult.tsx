import { useMemo } from "react";
import type { CheckPrimeResponse } from "@/types.ts";

export default function CompositeResult({
	result,
}: {
	result: CheckPrimeResponse;
}) {
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
		<div className="result">
			<h2 className="composite">No.</h2>
			<p className="composite">{result.value} is a composite number.</p>
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
		</div>
	);
}
