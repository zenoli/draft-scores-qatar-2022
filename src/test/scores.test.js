import { describe, test, expect } from "vitest"
import matches from "./match-sample.json"
import drafts from "../drafts.json"
import { getEvents, getOwners } from "../scores"


describe("Scores", () => {
  test("getOpponents", () => {
    const draftsSample = {
      ENG: {
        Chris: "Harry Maguire",
        Faebe: "Harry Kane",
      },
      IRN: {
        Chris: "Alireza Jahanbakhsh",
        Faebe: "Ali Gholizadeh",
      },
    }

    const expectedOwners = {
      ENG: {
        "Harry Maguire": "Chris",
        "Harry Kane": "Faebe"
      },
      IRN: {
        "Alireza Jahanbakhsh": "Chris",
        "Ali Gholizadeh": "Faebe"
      },
    }
    const owners = getOwners(draftsSample)
    expect(owners).toEqual(expectedOwners)
  })

  test("getEvents", () => {
    const result = getEvents(matches, getOwners(drafts))
    const expected = [
      {
        id: 16,
        type_of_event: "goal",
        player: "Jude Bellingham",
        time: "35'",
        extra_info: null,
        owner: "Jakob",
        country: "ENG",
        opponent: "IRN",
      },
      {
        id: 15,
        type_of_event: "booking",
        player: "Alireza Jahanbakhsh",
        time: "25'",
        extra_info: null,
        owner: "Chris",
        country: "IRN",
        opponent: "ENG",
      },
    ]
    expect(result).toEqual(expected)
  })
})
