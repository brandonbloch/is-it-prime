export default function OneResult() {
	return (
		<div className="result result-one">
			<h2>No.</h2>
			<p>
				The{" "}
				<a href="https://en.wikipedia.org/wiki/Prime_number">
					definition of a prime number
				</a>{" "}
				is that it has exactly two factors. Since 1 only has a single factor,
				it’s sort of considered neither prime nor composite.
			</p>
			<p>
				If 1 was considered a prime number, it would break the{" "}
				<a href="https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic">
					fundamental theorem of arithmetic
				</a>
				, since you could include as many 1s as you want in a prime
				factorization.
			</p>
			<p>
				That would make prime numbers a lot less useful, and therefore less
				interesting.
			</p>
		</div>
	);
}
