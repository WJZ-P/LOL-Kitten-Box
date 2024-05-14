export type DefinitelyAwaited<T> = T extends Promise<infer U> ? U : T
