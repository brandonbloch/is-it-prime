import { useMemo } from "react";
import type { CheckPrimeResponse } from "@/types.ts";
import { formatOrdinal } from "@/utils.ts";

export default function PrimeResult({
	result,
}: {
	result: CheckPrimeResponse;
}) {
	const formattedOrdinal = useMemo(
		() => formatOrdinal(result.nthPrime),
		[result.nthPrime],
	);
	return (
		<div className="result">
			<h2 className="prime">Yes!</h2>
			<p className="prime">
				{result.value} is the {formattedOrdinal} prime number.
			</p>
			<p></p>
		</div>
	);
}
