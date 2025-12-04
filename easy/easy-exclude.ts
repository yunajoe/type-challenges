import { Equal, Expect } from "./../utils";

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
  Expect<
    Equal<MyExclude<string | number | (() => void), Function>, string | number>
  >
];

/**
 * T 타입중에서 U에 해당되는 타입들이라면은 never(never는 UNION 타입으로 안된다. 그렇지 않으면은 T 타입)
 *
 */
type MyExclude<T, U> = T extends U ? never : T;
