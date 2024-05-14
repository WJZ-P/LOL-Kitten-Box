import type { IsNever } from './is-never.js'

export type IsEmpty<T> = IsNever<keyof NonNullable<T>>
