export type Assigned<T> = T extends (...args: any[]) => any & (infer U extends {
    [K in keyof T]: T[K]
}) ? U : never