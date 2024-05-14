# @cuppachino/proxy-fn

Proxy a function and optionally transform its parameters and output.

## Installation

Install using your favorite package manager.

```ps1
pnpm add @cuppachino/proxy-fn
```
```ps1
npm i @cuppachino/proxy-fn
```
```ps1
yarn add @cuppachino/proxy-fn
```

| | |
| - | - |
| Infers promises | ✅ |
| Retains properties assigned to the function | ✅ |
| Constrains the return type of `from` to extend the original function's parameters | ✅ |

#### Example function

```ts
const add = (a: number, b: number) => a + b
```

### From

```ts
/**
 * ```ts
 * (a: number, b: number, ...args: number[]) => number
 *
 * ProxyFn<
 *   // NewArgs
 *   [a: number, b: number, ...args: number[]],
 *   // NewReturnType
 *   number
 * >
 * ```
 */
const addMany = proxyFn(add)({
  from(a, b, ...args: number[]) {
    return [a, args.reduce(add, b)]
  }
})

addMany(1, 2, 3, 4) // number
```

### To

```ts
/**
 * ```ts
 * (a: number, b: number) => Promise<readonly [number, string]>
 *
 * ProxyFn<
 *   // NewArgs
 *   [a: number, b: number],
 *   // NewReturnType
 *   Promise<readonly [number, string]>
 * >
 * ```
 */
const infersPromises = proxyFn(add)({
  async to(sum) {
    const data = await Promise.resolve(`data for ${sum}`)
    return [sum, data] as const
  }
})

infersPromises(4, 8) // Promise<[sum: number, msg: string]>
```

### From & To

```ts
/**
 * ```ts
 * (() => Promise<[sum: number, msg: string]>) & { name: string }
 *
 * ProxyFn<
 *   // NewArgs
 *   [],
 *   // NewReturnType
 *   Promise<[sum: number, msg: string]>,
 *   // Properties
 *   { name: string }
 * >
 * ```
 */
const inferProperties = proxyFn(Object.assign(add.bind(null), { name: 'foo' }))(
  {
    async from() {
      const a = await Promise.resolve(1)
      const b = await Promise.resolve(2)
      return [a, b]
    },
    to(sum): [sum: number, msg: string] {
      return [sum, 'msg']
    }
  }
)

inferProperties() // Promise<[sum: number, msg: string]>
```
