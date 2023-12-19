import { Expect, Equal } from "type-testing";

type TwelveDaysOfChristmas = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type test_0_actual = DayCounter<1, 12>;
//   ^?
type test_0_expected = TwelveDaysOfChristmas;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type DaysUntilChristmas =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;
type test_1_actual = DayCounter<1, 25>;
//   ^?
type test_1_expected = DaysUntilChristmas;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

// solution
// Credits to https://catchts.com/range-numbers
type ComputeRange<
  N extends number,
  Result extends Array<unknown> = []
> = Result["length"] extends N
  ? Result
  : ComputeRange<N, [...Result, Result["length"]]>;

type Add<A extends number, B extends number> = [
  ...ComputeRange<A>,
  ...ComputeRange<B>
]["length"];

type IsGreater<A extends number, B extends number> = IsLiteralNumber<
  [...ComputeRange<B>][Last<[...ComputeRange<A>]>]
> extends true
  ? false
  : true;

type Last<T extends any[]> = T extends [...infer _, infer Last]
  ? Last extends number
    ? Last
    : never
  : never;

type RemoveLast<T extends any[]> = T extends [...infer Rest, infer _]
  ? Rest
  : never;

type IsLiteralNumber<N> = N extends number
  ? number extends N
    ? false
    : true
  : false;

type DayCounter<
  Min extends number,
  Max extends number,
  Result extends Array<unknown> = [Min]
> = IsGreater<Last<Result>, Max> extends true
  ? RemoveLast<Result>[number]
  : DayCounter<Min, Max, [...Result, Add<Last<Result>, 1>]>;
