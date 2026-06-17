import type { CheckPrimeMessage, CheckPrimeRequest } from "@/types.ts";
import { checkValue } from "@/worker-utils";

console.log("worker is working!");

const respond = (res: CheckPrimeMessage) => postMessage(res);

self.addEventListener("message", (e: MessageEvent<CheckPrimeRequest>) => {
	const { value } = e.data;
	try {
		checkValue(value, respond);
	} catch (err) {
		respond({
			type: "error",
			error: err instanceof Error ? err.message : JSON.stringify(err),
		});
	}
});

self.addEventListener("error", (e) => {
	respond({
		type: "error",
		error: e.message,
	});
});
