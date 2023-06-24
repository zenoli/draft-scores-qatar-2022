import { useState } from "react"
import GridLoader from "react-spinners/GridLoader"

import ScoreboardHeader from "./ScoreboardHeader"
import ScoreboardRow from "./ScoreboardRow"


function Scoreboard({ scores, loading }) {

  const [sortCategory, setSortCategory] = useState("total")

  function getTotal({goals, assists, bookings, clean_sheets}) {
    return goals + assists + bookings + clean_sheets
  }

  const scoreboardRows = scores.map((score, i) => (
    <ScoreboardRow
      key={i}
      name={score.participant}
      goals={score.goals}
      assists={score.assists}
      bookings={score.bookings}
      cleanSheets={score.clean_sheets}
      total={getTotal(score)}
    />
  ))

  const Spinner = ({ enabled }) => enabled && <GridLoader color="#0f172a" />

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
        <Spinner enabled={loading} />
      </div>
    </div>
  )
}

export default Scoreboard
