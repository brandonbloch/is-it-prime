import CompositeResult from "@/components/CompositeResult.tsx";
import OneResult from "@/components/OneResult.tsx";
import PrimeResult from "@/components/PrimeResult.tsx";
import type { CheckPrimeResponse } from "@/types.ts";

export default function Result({ result }: { result: CheckPrimeResponse }) {
	if (result.value === 1) {
		return <OneResult />;
	}
	return result.isPrime ? (
		<PrimeResult result={result} />
	) : (
		<CompositeResult result={result} />
	);
}
