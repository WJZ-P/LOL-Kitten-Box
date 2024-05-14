import type { Assigned } from '../types/assigned.js'
import type { DefinitelyAwaited } from '../types/definitely-awaited.js'
import type { If } from '../types/if.js'
import type { IsEmpty } from '../types/is-empty.js'
import type { IsPromise } from '../types/is-promise.js'
import type { MaybePromise } from '../types/maybe-promise.js'
import { isPromise } from '../utils/is-promise.js'

export type ProxyFnHandler<Fn extends (...args: any[]) => any> = <
  NewArgs extends any[] = Parameters<Fn>,
  NewReturnType = ReturnType<Fn>,
  ActualArgs extends MaybePromise<[...Parameters<Fn>, ...any[]]> = [...Parameters<Fn>]
>(
  props: Partial<{
    from(...args: NewArgs): ActualArgs
    to(res: ReturnType<Fn>): NewReturnType
  }>
) => ProxyFn<
  NewArgs,
  If<IsPromise<ActualArgs>, Promise<DefinitelyAwaited<NewReturnType>>, NewReturnType>,
  Assigned<Fn>
>

/**
 * The Proxy returned by a `ProxyFnHandler`.
 *
 * @param NewArgs The arguments that the proxy function will receive.
 * @param NewReturnType The return type of the proxy function.
 * @param Properties The properties of the original function.
 */
export type ProxyFn<
  NewArgs extends any[],
  NewReturnType,
  Properties
> = IsEmpty<Properties> extends true
  ? (...args: NewArgs) => NewReturnType
  : ((...args: NewArgs) => NewReturnType) & Properties

/**
 * Curried proxy creator. Proxy a function, and optionally transform its arguments and/or return value.
 * @param fn The function to proxy.
 * @returns A function that accepts an object with `from` and `to` methods.
 */
export const proxyFn = <Fn extends (...args: any[]) => any>(fn: Fn): ProxyFnHandler<Fn> => {
  /**
   * @param from A function that accepts the arguments that the proxy function will receive, and returns the arguments that the original function will receive.
   * @param to A function that accepts the return value of the original function, and returns the desired return value of the proxy function.
   * @returns `ProxyFn<From, To, WithProperties>`
   * @example
   * ```ts
   * const addRandom = proxyFn(add)({
   *   async from() {
   *     const generatedNumbers = await generateNumbers();
   *     return [generatedNumbers[0], generatedNumbers[1]];
   *   },
   *   to(result) {
   *     return result * 2;
   *   }
   * });
   * const randomNumber = await addRandom()
   * ```
   */
  return <
    NewArgs extends any[] = Parameters<Fn>,
    NewReturnType = ReturnType<Fn>,
    ActualArgs extends MaybePromise<[...Parameters<Fn>, ...any[]]> = [...Parameters<Fn>]
  >({
    from,
    to
  }: Partial<{
    from(...args: NewArgs): ActualArgs
    to(res: ReturnType<Fn>): NewReturnType
  }>) => {
    if (from && to) {
      return new Proxy(fn, {
        apply(target, thisArg, argArray) {
          const args = from(...(argArray as NewArgs))
          if (isPromise(args)) {
            return Promise.resolve(args).then((awaitedArgs) => {
              return to(Reflect.apply(target, thisArg, awaitedArgs))
            })
          } else {
            return to(Reflect.apply(target, thisArg, args))
          }
        }
      }) as any
    } else if (from && !to) {
      return new Proxy(fn, {
        apply(target, thisArg, argArray) {
          const args = from(...(argArray as NewArgs))
          if (isPromise(args)) {
            return Promise.resolve(args).then((awaitedArgs) =>
              Reflect.apply(target, thisArg, awaitedArgs)
            )
          } else {
            return Reflect.apply(target, thisArg, args)
          }
        }
      }) as any
    } else if (!from && to) {
      return new Proxy(fn, {
        apply(target, thisArg, argArray) {
          return to(Reflect.apply(target, thisArg, argArray))
        }
      }) as any
    } else {
      return new Proxy(fn, {}) as any
    }
  }
}
