import { Expect, Equal } from "type-testing";

type test_doll_actual = BoxToys<"doll", 1>;
//   ^?
type test_doll_expected = ["doll"];
type test_doll = Expect<Equal<test_doll_expected, test_doll_actual>>;

type test_nutcracker_actual = BoxToys<"nutcracker", 3 | 4>;
//   ^?
type test_nutcracker_expected =
  | ["nutcracker", "nutcracker", "nutcracker"]
  | ["nutcracker", "nutcracker", "nutcracker", "nutcracker"];
type test_nutcracker = Expect<
  Equal<test_nutcracker_expected, test_nutcracker_actual>
>;

// solution
// Credits to https://catchts.com/tuples
type BoxToys<
  TName extends string,
  TBoxes extends number
> = UnionToArray<TBoxes> extends number[]
  ? TuplesFromArray<TName, UnionToArray<TBoxes>>
  : [];

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

type Tuple<
  TName extends string,
  N extends number,
  Cache extends string[] = []
> = Cache["length"] extends N ? Cache : Tuple<TName, N, [...Cache, TName]>;

type TuplesFromArray<
  TName extends string,
  NArray extends number[]
> = NArray extends [infer Head, ...infer Tail]
  ?
      | Tuple<TName, Head extends number ? Head : never>
      | TuplesFromArray<TName, Tail extends number[] ? Tail : []>
  : never;
