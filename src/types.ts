export interface CheckPrimeRequest {
  value: number;
}

export interface CheckPrimeResponse {
  type: "response";
  value: number;
  isPrime: boolean;
  nthPrime: number; // 0 if composite
  primeFactorization: number[];
  uniquePrimeFactors: number[];
  allFactors: number[];
}

export interface CheckPrimeProgress {
  type: "progress";
  progress: number; // 0-100
}

export type CheckPrimeMessage = CheckPrimeResponse | CheckPrimeProgress;
