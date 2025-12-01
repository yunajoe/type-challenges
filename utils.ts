// 제네릭 타입 T는 반드시 true 이어야 한다. 그리고 T를 반환해야 한다.
export type Expect<T extends true> = T;

// 제네릭 타입 T는 반드시 true 이어야 한다.
export type ExpectTrue<T extends true> = T;

// 제네릭 타입 T는 반드시 false 이어야 한다.
export type ExpectFalse<T extends false> = T;

// 제네릭 타입 T는 반드시 true 이어야 한다.
export type IsTrue<T extends true> = T;

// 제네릭 타입 T는 반드시 false 이어야 한다.

export type IsFalse<T extends false> = T;

//  X와 Y가 동일한 타입인지 비교하는 조건부 타입
// X와 Y가 동일하면은 true를, 동일하지 않으면은 false를 return 한다.
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

//  Equal<X,Y> 이 true일떄 => true extends tue 는 false!.즉, 같은 타입이면은 false
// Equal<X,Y>이 false일때 => true extends false 니까 true. 즉, 다른 타이이면은 true
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360

/*
 * 교차타입 A & B => A도 만족하고 B도 만족해야 하는 타입.
 * 그래서 1 & T 에서 T가 any일때와 any이지 않을때를 나눈다면은
 * 1. T가 any 일때와
 *  1 & T => 1. 왜냐하면은 any는 타입을 구제적으로 젝한하지 않는 타입이라 교차를 태도 A의 타입을 막거나 바꾸지 않는다.
 * 그래서 1 & any => 1.
 * string & any => string
 * {a : 1} & any => {a:1}
 *
 *  0 extends 1 & T (1를 반환) ? true: false
 *  0 extends 1 ? true: false
 *  위에서 true를 반환한다고 하던데 왜 그렇게 되쥬?
 * 
 * 조건부 타입에서 any가 피연선자로 들어오면 typesript 조건 전체를 true로 평가하는 경향이 있다.
 *  
 * 예를 들어 
 * 0 extends any ? true : false   // true
    string extends any ? true : false // true
    false extends any ? true : false // true
 * 
 * 
 * 0 extends (1 & any) ? true : false
 * 1이 중요하지 앟는다.
 * any가 관여했기 때문에 조건식을 true로 평가한 것이다. 
 * 즉, 0 extends 1 (any가 관여했기 떄문에 true 생각하자) ? true: false
 * 
 * 2. T가 any 이지 않을 때
 *.  1 & T => never 타입이므로. 0 extends never ? true: false. 
 *  즉, false 이다.
 *   
 * 
 * 결과는 T가 any이 면은 true, 아니면 false 를 return한다. 
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;
/**
 *
 * T가 any이 이면은 false, any가 아니면은 true
 *
 */

export type NotAny<T> = true extends IsAny<T> ? false : true;

// TODO: 여기서 부터 다시 해석해야 하낟.
export type Debug<T> = { [K in keyof T]: T[K] };
export type MergeInsertions<T> = T extends object
  ? { [K in keyof T]: MergeInsertions<T[K]> }
  : T;

export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>;

export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE
  ? true
  : false;
export type ExpectValidArgs<
  FUNC extends (...args: any[]) => any,
  ARGS extends any[]
> = ARGS extends Parameters<FUNC> ? true : false;

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
