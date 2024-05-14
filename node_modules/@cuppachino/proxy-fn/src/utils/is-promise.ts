/**
 * Returns true if the given thing is a promise.
 * @param anything The thing to check. Might be undefined.
 */
export const isPromise = <T>(anything: T | Promise<T> | undefined): anything is Promise<T> => {
  return !!anything && anything instanceof Promise
}
