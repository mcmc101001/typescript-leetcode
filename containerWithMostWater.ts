import type { Equal, Expect } from "@type-challenges/utils";
import { Add, Subtract } from "./utils";

// Test cases
type A1 = ContainerWithMostWater<[1, 8, 6, 2, 5, 4, 8, 3, 7]>;
type A2 = ContainerWithMostWater<[1, 1]>;
type A3 = ContainerWithMostWater<[4, 3, 2, 1, 4]>;
type A4 = ContainerWithMostWater<[1, 2, 1]>;

type TestCases = [
  Expect<Equal<A1, 49>>,
  Expect<Equal<A2, 1>>,
  Expect<Equal<A3, 16>>,
  Expect<Equal<A4, 2>>
];

// Solution
type ContainerWithMostWater<T extends number[]> = T extends [
  infer Head extends number,
  ...infer Middle extends number[],
  infer Tail extends number
]
  ? Max<
      Max<
        ContainerWithMostWater<[...Middle, Tail]>,
        ContainerWithMostWater<[Head, ...Middle]>
      >,
      Multiply<Min<Head, Tail>, Subtract<T["length"], 1>>
    >
  : T extends [infer Head extends number, infer Tail extends number]
  ? Min<Head, Tail>
  : 0;

type Min<T extends number, U extends number> = Subtract<T, U> extends never
  ? T
  : U;

type Max<T extends number, U extends number> = Subtract<T, U> extends never
  ? U
  : T;

type Multiply<
  T extends number,
  U extends number,
  Accumulator extends number = 0,
  Counter extends 1[] = []
> = Counter["length"] extends T
  ? Accumulator
  : Multiply<T, U, Add<Accumulator, U>, [...Counter, 1]>;

// Test sub-functions
