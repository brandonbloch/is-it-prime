import "./index.css";
import type { ChangeEvent, SubmitEvent } from "react";
import { useCallback, useState } from "react";
import Result from "@/components/Result.tsx";
import type {
	CheckPrimeMessage,
	CheckPrimeRequest,
	CheckPrimeResponse,
} from "@/types.ts";
import useWorker from "@/useWorker.ts";

const WARN_THRESHOLD = 100_000_000;

export default function App() {
	const [input, setInput] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean>(false);
	const [value, setValue] = useState<number>(0);
	const [warning, setWarning] = useState<boolean>(false);
	const [progress, setProgress] = useState<number | null>(null);
	const [response, setResponse] = useState<CheckPrimeResponse | null>(null);
	const [error, setError] = useState<boolean>(false);

	const onmessage = useCallback((e: MessageEvent<CheckPrimeMessage>) => {
		if (e.data.type === "progress") {
			setProgress(e.data.progress);
			setResponse(null);
			setError(false);
		} else if (e.data.type === "response") {
			setProgress(null);
			setResponse(e.data);
			setError(false);
		} else {
			// e.data.type === "error"
			setProgress(null);
			setResponse(null);
			setError(true);
		}
	}, []);

	const postMessage = useWorker<CheckPrimeRequest, CheckPrimeMessage>(
		onmessage,
	);

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const newInput = e.target.value;
		setInput(newInput);
		const newValue = Number.parseInt(newInput, 10);
		const newIsValid =
			!Number.isNaN(newValue) &&
			Number.isFinite(newValue) &&
			newValue.toString() === newInput.trim() &&
			newValue > 0;
		setIsValid(newIsValid);
		if (newIsValid) {
			setValue(newValue);
		}
		setWarning(newIsValid && newValue >= WARN_THRESHOLD);
	}, []);

	const onSubmit = useCallback(
		(e: SubmitEvent<HTMLFormElement>) => {
			e.preventDefault();
			setProgress(-1);
			setResponse(null);
			postMessage({
				value,
			});
		},
		[postMessage, value],
	);

	return (
		<div className="main">
			<div className="header">
				<h1>Is It Prime?</h1>
				<a
					className="github-logo"
					href="https://github.com/brandonbloch/is-it-prime"
					title="View on GitHub"
				>
					<span className="github-logo-label">View on GitHub</span>
				</a>
			</div>
			<form className="form" onSubmit={onSubmit}>
				<input
					className="input"
					type="number"
					inputMode="numeric"
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
			{warning ? (
				<p className="warning">
					Careful there big dog, this might crash your browser!
				</p>
			) : null}
			{error ? <p className="error">Told you so!</p> : null}
			{progress !== null && (
				<progress
					className="progress"
					max="100"
					value={progress < 0 ? undefined : progress}
				/>
			)}
			{response !== null && <Result result={response} />}
		</div>
	);
}
