<h1 align="center">Type Space</h1>

<p align="center">
  <p>
  Welcome to Type Space, a suite of utility types for enhancing your TypeScript code. With
  <code>@cuppachino/type-space</code>, you can perform a wide range of type operations,
  including numeric calculations, string manipulation, tuple operations, and more.
  </p>
  <div align="center">
    <a href="https://github.com/Cuppachino/type-space/issues">Report Problem</a>
    🌘🧑‍🚀
    <a href="https://github.com/Cuppachino/type-space/pulls">Contribute</a>
  </div>
</p>

## 📦 Installation

Use your favorite package manager to install `@cuppachino/type-space` as a developer dependency.

[@cuppachino/type-space](https://www.npmjs.com/package/@cuppachino/type-space)

```ps
pnpm add -D @cuppachino/type-space
```

```ps
npm install --save-dev @cuppachino/type-space
```

# 🔎 Quick Reference

The source code is fully tsdoc'd, so you can use your IDE's intellisense to reference examples and descriptions at any time. Click any `type` for more documentation.

## 🍎 Base Types

- [`NumberLiteral`](src/number-literal.ts): A stringified number literal.
- [`Stringifiable`](src/stringifiable.ts): An alias for `string | number | bigint | boolean | null | undefined`.
- [`UnknownArray`](src/unknown-array.ts): An alias for `unknown[] | readonly unknown[]`,
  safer than `any`.
- [`UnknownRecord`](src/unknown-record.ts): An alias for `Record<PropertyKey, unknown>`,
  safer than `any` or `{}`.

## 🧮 Arithmetic Types

- [`Absolute`](src/math/absolute.ts): Coerces a number literal to a positive `number` of the same magnitude.
- [`Add`](src/math/add.ts): Return the sum of two number literals.
- [`Subtract`](src/math/subtract.ts): Return the difference between two number literals.

## 🔢 Numeric Types

- [`IntoNumber`](src/into-number.ts): Coerce a `NumberLike` type to a `number`
- [`IntoNumberLiteral`](src/into-number-literal.ts): Coerce a `NumberLike` type to a `NumberLiteral`
- [`IsInteger`](src/math/is-integer.ts): A boolean type that is true if a number literal is an integer.
- [`IsPositive`](src/math/is-positive.ts): A boolean type that is true if a number literal is positive.
- [`IsNegative`](src/math/is-negative.ts): A boolean type that is true if a number literal is negative.
- [`IsWhole`](src/math/is-whole.ts): A boolean type that is true if a number literal is a whole number.
- [`NumberLike`](src/number-like.ts): Coerce either a `number` or a `NumberLiteral` into a union between the two.
- [`ParseNumberLiteral`](src/parse-number-literal.ts): Coerce a `NumberLiteral` type to a `number`

## 💭 String Types

- [`Chars`](src/chars.ts): Splits a string literal into a tuple of characters. Reads more clearly than `Split` in some cases.
- [`ReverseString`](src/strings/reverse-string.ts): Reverse a string literal.
- [`Split`](src/split.ts): Splits a string literal into a tuple of characters, separated by the given delimiter.
- [`SplitAt`](src/strings/split-at.ts): Split a string literal into a tuple of two strings, separated by the given index, non-inclusive.
- [`Stringify`](src/stringify.ts): Converts a type to a string literal type, if possible.
- [`StringIncludes`](src/string-includes.ts): A boolean type that is true if a string literal includes a given substring (⊆).
- [`StringIncludesProper`](src/string-includes-proper.ts): A boolean type that is true if a string literal includes a given substring, and the substring is not the entire string (⊂).

## 📜 Tuple Types

- [`CreateTuple`](src/create-tuple.ts): Generate a fixed-length tuple.
- [`Flat`](src/flat.ts): Recursively flatten a tuple up to a given depth.
- [`IndexOf`](src/index-of.ts): Return a union of a tuple's indices.
- [`Indices`](src/indices.ts): Generate a tuple of a tuple's indices.
- [`Join`](src/join.ts): Joins a tuple of strings into a single string, separated by a delimiter.
- [`Length`](src/length.ts): Extract the length property from an array or
  tuple.
- [`MergeAll`](src/merge-all.ts): Merge all type members of a tuple into a
  single type.
- [`PartitionKeys`](src/partition-keys.ts): Extract a union of keys for each member in a tuple into a new tuple; order is preserved.
- [`PartitionValues`](src/partition-values.ts): Create a tuple of value(s) for the given key(s) in each member of a tuple; order is preserved.
- [`PartitionPick`](src/partition-pick.ts): Maps picked properties from each member of a tuple into a new tuple; order is preserved.
- [`Reverse`](src/tuples/reverse.ts): Reverse the order of elements in a tuple type.

### A la Array.prototype

> #### sig
>
> ```ts
> Action :: <Tuple> -> NewTuple
> ```

- [`Pop`](src/tuples/pop.ts): Remove the last element from a tuple. Does not return the removed element.
- [`PopBy`](src/tuples/pop-by.ts): Remove the last `N` elements from a tuple.
- [`Push`](src/tuples/push.ts): Adds one element type to the end of a tuple. Does not return the new length of the tuple.
- [`Shift`](src/tuples/shift.ts): Remove the first element from a tuple type. Does not return the removed element.
- [`ShiftBy`](src/tuples/shift-by.ts): Remove the first `N` elements from a tuple.
- [`Unshift`](src/tuples/unshift.ts): Adds one element type to the beginning of a tuple. Does not return the new length of the tuple.

## 🧰 Utility Types

- [`Assert`](src/assert.ts): Assert that a type is assignable to another type; shorthand for `T extends U ? T : never`.
- [`Combine`](src/combine.ts): Simplify a type by mapping over its properties.
- [`KeyOf`](src/key-of.ts): Extract all keys from every member of a union type, unlike `keyof` which only preserves shared members' keys.
- [`Mutable`](src/mutable.ts): Recursively removes the `readonly` modifier from all properties of a type.
- [`PartialSome`](src/partial-some.ts): Return a new type that allows the specified keys to be undefined.
- [`PickAll`](src/pick-all.ts): Extract properties from _all_ members in a union, missing properties default to `| undefined`.
- [`RequireSome`](src/require-some.ts): Return a new type requiring the selected keys.
- [`Simplify`](src/simplify.ts): Simplify a type by mapping over its inferred properties - use when `Combine` cannot infer a deep type.
- [`Subset`](src/subset.ts): TypeScript equivalent of `⊆`.
- [`UnionLiteral`](src/union-literal.ts): Create a union from a literal and primitive type without losing the literal type.
- [`UnionToIntersection`](src/union-to-intersection.ts): Create an intersection from all members of a union type.
- [`UnionToTuple`](src/union-to-tuple.ts): Convert a union to a tuple type. The order is not guaranteed.
- [`Zip`](src/zip.ts): From a tuple of keys and a tuple of values, create a new record.

### Extract

- [`ExtractRequired`](src/extract/extract-required.ts): Extract all non-optional properties from a type; ℹ️[exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes).
- [`ExtractOptional`](src/extract/extract-optional.ts): Extract all optional properties from a type; ℹ️[exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)
- [`ExtractFunctions`](src/extract/extract-functions.ts): Create a new type of
  all property functions and methods in a type.
- [`ExtractSetMembers`](src/extract/extract-set-members.ts): Create a union
  type of members in a `Set`.

### Extends

> #### | sig
>
> ```ts
> Extends :: <T, R = T> -> boolean
> ```
>
> - `T` is the type to check.
> - `R` is the type returned when `T` extends the name of the generic.

- [`ExtendsFunction`](src/extends/extends-function.ts): Return a type if the
  given type extends a function or method.

---

I hope you have fun with these utilities. Thank you for using `type-space`!
