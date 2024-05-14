import proxyFn from '../src/index.js'

import { test, expectTypeOf, expect } from 'vitest'

test('proxy function', () => {
  const add = (a: number, b: number) => a + b

  expectTypeOf(add).toEqualTypeOf((a: number, b: number) => a + b)
  expectTypeOf(add).not.toEqualTypeOf<(...args: number[]) => number>()

  const a1 = proxyFn(add)({})
  //    ^?
  expectTypeOf(a1).toEqualTypeOf<typeof add>()

  const a2 = proxyFn(add)({
    //  ^?
    from() {
      return [1, 2]
    }
  })
  expectTypeOf(a2).toEqualTypeOf<() => number>()

  const a3 = proxyFn(add)({
    //  ^?
    async from() {
      return [1, 2]
    }
  })
  expectTypeOf(a3).toEqualTypeOf<() => Promise<number>>()
  expect(a3()).instanceOf(Promise)
  expect(a3()).resolves.toBe(3)

  const a4 = proxyFn(add)({
    //  ^?
    to(res) {
      expect(res).not.toBeInstanceOf(Promise)
      return `${res * 2}` as const
    }
  })
  expectTypeOf(a4).toEqualTypeOf<(a: number, b: number) => `${number}`>()
  expect(a4(1, 2)).toBe('6')

  const a5 = proxyFn(add)({
    //  ^?
    from() {
      return [1, 2]
    },
    to(res) {
      expect(res).not.toBeInstanceOf(Promise)
      return `${res * 2}` as const
    }
  })
  expectTypeOf(a5).toEqualTypeOf<() => `${number}`>()
  expect(a5()).toBe('6')

  const a6 = proxyFn(add)({
    //  ^?
    async from(...args: number[]) {
      return [0, args.reduce((a, b) => a + b, 0)]
    },
    to(res): [str: `${number}`, num: number] {
      expect(res).not.toBeInstanceOf(Promise)
      return [`${res}`, res]
    }
  })
  expectTypeOf(a6).toEqualTypeOf<(...args: number[]) => Promise<[str: `${number}`, num: number]>>()
  expect(a6(1, 2, 3)).instanceOf(Promise)
  expect(a6(1, 2, 3)).resolves.toEqual(['6', 6])

  const a7 = proxyFn(a6)({
    //  ^?
    from() {
      return [1, 2, 3]
    },
    async to(res) {
      expect(res).toBeInstanceOf(Promise)
      const [str, num] = await res
      return { str, num: num * 2 }
    }
  })
  expectTypeOf(a7).toEqualTypeOf<() => Promise<{ str: `${number}`; num: number }>>()
  expect(a7()).instanceOf(Promise)
  expect(a7()).resolves.toEqual({ str: '6', num: 12 })
})

test('proxy function with properties', () => {
  const adder = Object.assign(
    function _adder(a: number, b: number) {
      return a + b
    },
    {
      hello: 'addAlt',
      greet() {
        console.log(this.hello)
      }
    }
  )

  const b1 = proxyFn(adder)({})
  //    ^?
  expectTypeOf(b1).toEqualTypeOf<typeof adder>()
  expect(b1.hello).toBe('addAlt')
  expect(b1.greet).toBeInstanceOf(Function)
  expect(b1(1, 2)).toBe(3)

  const b2 = proxyFn(adder)({
    //  ^?
    async from() {
      return [1, 2]
    },
    to(res) {
      expect(res).not.toBeInstanceOf(Promise)
      return res
    }
  })
  expectTypeOf(b2).toEqualTypeOf<
    (() => Promise<number>) & {
      hello: string
      greet(): void
    }
  >()
  expect(b2.hello).toBe('addAlt')
  expect(b2.greet).toBeInstanceOf(Function)
  expect(b2()).instanceOf(Promise)
  expect(b2()).resolves.toBe(3)
})

test('should not return nested promises', () => {
  const getInventories = (id: number) =>
    Promise.resolve({
      ownerId: id,
      items: []
    })
  const getDefaultUser = () => Promise.resolve({ id: 42069 })

  const x = proxyFn(getInventories)(
    (() => {
      let currentId: number | null = null
      const getId = async () => {
        if (currentId !== null) return currentId
        return (currentId = (await getDefaultUser()).id)
      }
      return {
        async from() {
          return [await getId()]
        },
        async to(res) {
          return [await res, 'closure'] as const
        }
      }
    })()
  )
  expectTypeOf(x).toEqualTypeOf<
    () => Promise<readonly [{ ownerId: number; items: never[] }, 'closure']>
  >()
  expect(x()).instanceOf(Promise)
  expect(x()).resolves.toHaveLength(2)
  expect(x()).resolves.toEqual([{ ownerId: 42069, items: [] }, 'closure'])

  const y = proxyFn(getInventories)(
    (() => {
      const { getId } = new (class {
        currentId: number | null = null
        getId = async () => {
          if (this.currentId !== null) return this.currentId
          return (this.currentId = (await getDefaultUser()).id)
        }
      })()
      return {
        async from() {
          return [await getId()]
        },
        async to(res) {
          return [await res, 'class'] as const
        }
      }
    })()
  )

  expectTypeOf(y).toEqualTypeOf<
    () => Promise<readonly [{ ownerId: number; items: never[] }, 'class']>
  >()
  expect(y()).instanceOf(Promise)
  expect(y()).resolves.toHaveLength(2)
  expect(y()).resolves.toEqual([{ ownerId: 42069, items: [] }, 'class'])
})
