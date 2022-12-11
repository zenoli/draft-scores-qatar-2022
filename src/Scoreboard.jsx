import { useState, useEffect, useMemo } from "react"
import GridLoader from "react-spinners/GridLoader";

import { getSortedScores } from "./scores.js"
import ScoreboardRow from "./ScoreboardRow"
import ScoreboardHeader from "./ScoreboardHeader"

function Scoreboard({events, loading}) {

  const [sortCategory, setSortCategory] = useState("total")
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
          sortCategory={sortCategory}
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
