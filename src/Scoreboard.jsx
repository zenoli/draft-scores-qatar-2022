import { useState, useEffect, useMemo } from "react"
import drafts from "./drafts.json"
import api from "./api-full.json"
import {
  getEvents,
  getOwners,
  getSortedScores,
} from "./scores.js"
import { Participants } from "./enums.js"
import ScoreboardRow from "./ScoreboardRow"
import ScoreboardHeader from "./ScoreboardHeader"

function Scoreboard(props) {
  async function fetchMatches() {
    const matchesResponse = await fetch(
      "https://worldcupjson.net/matches?details=true",
    )
    const matches = await matchesResponse.json()
    console.log("FETCHING...")
    setMatches(matches)
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  const [matches, setMatches] = useState([])
  const [sortCategory, setSortCategory] = useState("total")
  const [owners, setOwners] = useState(getOwners(drafts))

  const events = getEvents(matches, owners)
  const scores = getSortedScores(events, sortCategory)

  const scoreboardRows = scores.map(([owner, scores], i) => (
      <ScoreboardRow
        key={i}
        name={owner}
        goals={scores.goals}
        assists={scores.assists}
        bookings={scores.bookings}
        cleanSheets={scores.cleanSheets}
        total={scores.total}
      />
    ))

  return (
    <div className="rounded-lg overflow-auto">
      <table className="table-fixed border-spacing-4 w-full">
        <ScoreboardHeader
          setSortCategory={setSortCategory}
        />
        <tbody>{scoreboardRows}</tbody>
      </table>
    </div>
  )
}

export default Scoreboard
