import "./index.css";
import type { ChangeEvent, SubmitEvent } from "react";
import { useCallback, useState } from "react";
import Result from "@/components/Result.tsx";
import type {
	CheckPrimeProgress,
	CheckPrimeRequest,
	CheckPrimeResponse,
} from "@/types.ts";
import useWorker from "@/useWorker.ts";

export default function App() {
	const [input, setInput] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean>(false);
	const [value, setValue] = useState<number>(0);
	const [progress, setProgress] = useState<number | null>(null);
	const [response, setResponse] = useState<CheckPrimeResponse | null>(null);

	const onmessage = useCallback(
		(e: MessageEvent<CheckPrimeResponse | CheckPrimeProgress>) => {
			if (e.data.type === "progress") {
				setProgress(e.data.progress);
				setResponse(null);
			} else {
				setProgress(null);
				setResponse(e.data);
			}
		},
		[],
	);

	const postMessage = useWorker<
		CheckPrimeRequest,
		CheckPrimeResponse | CheckPrimeProgress
	>(onmessage);

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const newInput = e.target.value;
		setInput(newInput);
		const newValue = Number.parseInt(newInput, 10);
		const newIsValid =
			!Number.isNaN(newValue) &&
			Number.isFinite(newValue) &&
			newValue.toString() === newInput.trim();
		setIsValid(newIsValid);
		if (newIsValid) {
			setValue(newValue);
		}
	}, []);

	const onSubmit = useCallback(
		(e: SubmitEvent<HTMLFormElement>) => {
			e.preventDefault();
			setProgress(null);
			setResponse(null);
			postMessage({
				value,
			});
		},
		[postMessage, value],
	);

	return (
		<div className="main">
			<h1>Is It Prime?</h1>
			<form className="form" onSubmit={onSubmit}>
				<input
					className="input"
					type="number"
					value={input}
					onChange={onChange}
					placeholder="Enter a positive integer"
					aria-label="Enter a positive integer"
				/>
				<button
					className="submit"
					type="submit"
					aria-label="Is it prime?"
					disabled={!isValid}
				>
					?
				</button>
			</form>
			{progress !== null && <progress max="100" value={progress} />}
			{response !== null && <Result result={response} />}
		</div>
	);
}
