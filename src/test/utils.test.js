import { describe, test, expect } from "vitest"
import { arrayToObject, invertAssociation, zip } from "../utils"

describe("Utils", () => {
  test("Array to object", () => {
    const array = [
      ["one", 1],
      ["two", 2],
      ["three", 3],
    ]
    const obj = arrayToObject(
      array,
      ([k, _]) => k,
      ([_, v]) => v,
    )

    const x = 5
    console.log(x)


    const expectedObj = {
      one: 1,
      two: 2,
      three: 3,
    }
    expect(obj).toEqual(expectedObj)
  })

  test("Invert association", () => {
    const obj = {
      one: 1,
      two: 2,
      three: 3,
    }

    const objInv = invertAssociation(obj)

    const expectedObj = {
      1: "one",
      2: "two",
      3: "three",
    }

    expect(objInv).toEqual(expectedObj)
  })

  test("Zip", () => {
    const a = [1, 2, 3]
    const b = ["one", "two", "three"]

    const zipOutput = zip(a, b)
    const zipExpected = [
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]

    expect(zipOutput).toEqual(zipExpected)
  })
})
