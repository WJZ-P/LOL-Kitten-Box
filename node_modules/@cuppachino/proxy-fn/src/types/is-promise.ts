export type IsPromise<T> = T extends Promise<any> ? true : false
