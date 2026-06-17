import { useMemo } from "react";
import type { CheckPrimeResponse } from "@/types.ts";
import { formatOrdinal } from "@/utils.ts";

export default function PrimeResult({
	result,
}: {
	result: CheckPrimeResponse;
}) {
	const formattedOrdinal = useMemo(
		() => (result.value === 2 ? "lowest" : formatOrdinal(result.nthPrime)),
		[result.nthPrime, result.value],
	);

	const isPalindromic = useMemo(() => {
		const valueStr = result.value.toString();
		const reversed = valueStr.split("").reverse().join("");
		return reversed === valueStr;
	}, [result.value.toString]);

	return (
		<div className="result result-prime">
			<h2>Yes!</h2>
			<p>
				{result.value} is the {formattedOrdinal} prime number
				{result.isSuperPrime ? (
					<>
						, making it a{" "}
						<a href="https://en.wikipedia.org/wiki/Super-prime">super-prime</a>
					</>
				) : null}
				.
			</p>
			{result.value === 2 && <p>It’s also the only even prime!</p>}
			{isPalindromic && (
				<p>
					It’s also a{" "}
					<a href="https://en.wikipedia.org/wiki/Palindromic_prime">
						palindromic prime
					</a>
					.
				</p>
			)}
			<p></p>
		</div>
	);
}
