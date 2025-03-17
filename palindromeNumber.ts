import type { Equal, Expect } from "@type-challenges/utils";

// Test cases
type A1 = IsPalindromeNumber<0>;
type A2 = IsPalindromeNumber<123>;
type A3 = IsPalindromeNumber<121>;
type A4 = IsPalindromeNumber<12321>;
type A5 = IsPalindromeNumber<12345>;
type A6 = IsPalindromeNumber<123321>;

type TestCases = [
  Expect<Equal<A1, true>>,
  Expect<Equal<A2, false>>,
  Expect<Equal<A3, true>>,
  Expect<Equal<A4, true>>,
  Expect<Equal<A5, false>>,
  Expect<Equal<A6, true>>
];

// Solution
type IsPalindromeNumber<T extends number> = IsPalindromeNumberHelper<
  ToDigitArray<Stringify<T>>
>;

type IsPalindromeNumberHelper<T extends number[]> = T extends [
  infer Head extends number,
  ...infer Middle extends number[],
  infer Tail extends number
]
  ? Head extends Tail
    ? IsPalindromeNumberHelper<Middle>
    : false
  : true;

type Stringify<T extends number> = `${T}`;

type ToDigitArray<
  T extends string,
  Accumulator extends number[] = []
> = T extends `${infer Head extends number}${infer Rest}`
  ? ToDigitArray<Rest, [...Accumulator, Head]>
  : Accumulator;

// Test sub-functions
type ToDigitArrayTests = [
  Expect<Equal<ToDigitArray<"123">, [1, 2, 3]>>,
  Expect<Equal<ToDigitArray<"12345">, [1, 2, 3, 4, 5]>>,
  Expect<Equal<ToDigitArray<"123456">, [1, 2, 3, 4, 5, 6]>>
];

type StringifyTests = [
  Expect<Equal<Stringify<1>, "1">>,
  Expect<Equal<Stringify<123>, "123">>,
  Expect<Equal<Stringify<12345>, "12345">>
];
