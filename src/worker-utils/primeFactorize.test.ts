import { describe, expect, test } from "bun:test";
import primeFactorize from "@/worker-utils/primeFactorize.ts";

const primesTo100 = [
	2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
	73, 79, 83, 89, 97,
];

describe("primeFactorize", () => {
	test("10", () => {
		expect(primeFactorize(10, primesTo100)).toEqual([2, 5]);
	});
	test("20", () => {
		expect(primeFactorize(20, primesTo100)).toEqual([2, 2, 5]);
	});
	test("59", () => {
		expect(primeFactorize(59, primesTo100)).toEqual([59]);
	});
	test("60", () => {
		expect(primeFactorize(60, primesTo100)).toEqual([2, 2, 3, 5]);
	});
});
