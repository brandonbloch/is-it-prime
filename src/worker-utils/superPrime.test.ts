import { describe, expect, test } from "bun:test";
import checkIsSuperPrime from "@/worker-utils/superPrime.ts";

const primesTo100 = [
	2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
	73, 79, 83, 89, 97,
];

describe("checkIsSuperPrime", () => {
	test("2", () => {
		expect(checkIsSuperPrime(2, primesTo100)).toBeFalse();
	});
	test("3", () => {
		expect(checkIsSuperPrime(3, primesTo100)).toBeTrue();
	});
	test("5", () => {
		expect(checkIsSuperPrime(5, primesTo100)).toBeTrue();
	});
	test("7", () => {
		expect(checkIsSuperPrime(7, primesTo100)).toBeFalse();
	});
	test("11", () => {
		expect(checkIsSuperPrime(11, primesTo100)).toBeTrue();
	});
});
