import { useState, useEffect, useMemo } from "react"
import drafts from "./drafts.json"
import api from "./api-full.json"
import GridLoader from "react-spinners/GridLoader";

import {
  getEvents,
  getOwners,
  getSortedScores,
} from "./scores.js"
import { Participants } from "./enums.js"
import ScoreboardRow from "./ScoreboardRow"
import ScoreboardHeader from "./ScoreboardHeader"
import { Outlet } from "react-router-dom";

function Scoreboard(props) {
  async function fetchMatches() {
    setLoading(true)
    const matchesResponse = await fetch(
      "https://worldcupjson.net/matches?details=true",
    )
    const matches = await matchesResponse.json()
    setLoading(false)
    console.log("FETCHING...")
    setMatches(matches)
  }
  const UPDATE_INTERVAL = 60 * 1000

  useEffect(() => {
    fetchMatches()
    const intervalHandle = setInterval(fetchMatches, UPDATE_INTERVAL)
    return function cleanup() {
      clearInterval(intervalHandle)
    }
  }, [])

  const [loading, setLoading] = useState(true)
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

  const Spinner = ({ enabled }) => enabled && <GridLoader color="#0f172a"/>

  return (
    <div className="rounded-lg overflow-auto relative">
      <table className="table-fixed border-spacing-4 w-full">
        <ScoreboardHeader
          setSortCategory={setSortCategory}
        />
        <tbody>{scoreboardRows}</tbody>
      </table>
      <div className="absolute top-0 w-full h-full flex justify-center items-center pointer-events-none">
        <Spinner enabled={loading}/>
      </div>
    </div>
  )
}

export default Scoreboard
