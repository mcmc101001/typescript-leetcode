import type { Equal, Expect } from "@type-challenges/utils";

export type Add<T extends number, U extends number> = [
  ...CreateCountArray<T>,
  ...CreateCountArray<U>
]["length"] extends infer R
  ? R extends number
    ? R
    : never
  : never;

export type Subtract<
  T extends number,
  U extends number
> = CreateCountArray<T> extends [...CreateCountArray<U>, ...infer R]
  ? R["length"]
  : never;

type CreateCountArray<
  T extends number,
  R extends 1[] = []
> = R["length"] extends T ? R : CreateCountArray<T, Push<R, 1>>;

export type Push<T extends unknown[], V> = [...T, V];

// Test cases

type TestCreateCountArray = [
  Expect<Equal<CreateCountArray<3>, [1, 1, 1]>>,
  Expect<Equal<CreateCountArray<0>, []>>
];

type TestSubtract = [
  Expect<Equal<Subtract<3, 1>, 2>>,
  Expect<Equal<Subtract<3, 3>, 0>>
];

type TestPush = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1], 2>, [1, 2]>>
];
