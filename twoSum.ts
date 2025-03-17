import type { Equal, Expect } from "@type-challenges/utils";
import { Add, Push, Subtract } from "./utils";

// Test cases
type A1 = TwoSum<[2, 7, 11, 15], 9>;
type A2 = TwoSum<[3, 2, 4], 6>;
type A3 = TwoSum<[3, 3, 3], 6>;
type A4 = TwoSum<[3, 7, 5, 9, 12, 11], 15>;
type A5 = TwoSum<[3, 3, 6], 7>;
type A6 = TwoSum<[4, 7, 9], 8>;

type TestCases = [
  Expect<Equal<A1, [0, 1]>>,
  Expect<Equal<A2, [1, 2]>>,
  Expect<Equal<A3, [0, 1]>>,
  Expect<Equal<A4, [0, 4]>>,
  Expect<Equal<A5, never>>,
  Expect<Equal<A6, never>>
];

// Solution
type TwoSum<
  T extends number[],
  K extends number,
  Accumulator extends 1[] = []
> = T extends [infer Head extends number, ...infer Tail extends number[]]
  ? Subtract<K, Head> extends never
    ? TwoSum<Tail, K, Push<Accumulator, 1>>
    : IndexOf<Tail, Subtract<K, Head>> extends -1
    ? TwoSum<Tail, K, Push<Accumulator, 1>>
    : [
        Accumulator["length"],
        Add<Add<1, Accumulator["length"]>, IndexOf<Tail, Subtract<K, Head>>>
      ]
  : never;

type IndexOf<
  T extends number[],
  V extends number,
  Count extends 1[] = []
> = T extends [infer Head, ...infer Tail extends number[]]
  ? Head extends V
    ? Count["length"]
    : IndexOf<Tail, V, [...Count, 1]>
  : -1;

// Test sub-functions
type TestIndexOf = [
  Expect<Equal<IndexOf<[2, 7, 11, 15], 7>, 1>>,
  Expect<Equal<IndexOf<[3, 2, 4], 4>, 2>>,
  Expect<Equal<IndexOf<[3, 3], 3>, 0>>,
  Expect<Equal<IndexOf<[3, 3, 6], 7>, -1>>,

  // @ts-expect-error
  Expect<Equal<IndexOf<[3, 3, 6], never>, never>>
];
