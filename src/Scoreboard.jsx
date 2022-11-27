import drafts from "./drafts.json"
import api from "./api-sample.json"
import { processMatches } from "./scores.js"
import { Participants } from "./enums.js"
import { useState, useMemo } from "react"

function Scoreboard(props) {
  const [ count, setCount ] = useState(0)
  const doubleCount = useMemo(() => count * 2, [count])

  console.log(drafts)
  console.log(api)

  const scores = processMatches(api, drafts)
  return (
    <div>
      <button
        className="bg-sky-500 p-2 rounded-full"
        onClick={() => setCount(count => count + 1)}
      >
        Count:  {count}, Double count: {doubleCount}
      </button>
      <div>
        {`${Participants.CHRIS}: ${scores[Participants.CHRIS]}`}
      </div>
      <div>
        {`${Participants.FABIAN}: ${scores[Participants.FABIAN]}`}
      </div>
      <div>
        {`${Participants.JAKOB}: ${scores[Participants.JAKOB]}`}
      </div>
      <div>
        {`${Participants.JAN}: ${scores[Participants.JAN]}`}
      </div>
      <div>
        {`${Participants.JOEL}: ${scores[Participants.JOEL]}`}
      </div>
      <div>
        {`${Participants.JULIEN}: ${scores[Participants.JULIEN]}`}
      </div>
      <div>
        {`${Participants.OLI}: ${scores[Participants.OLI]}`}
      </div>
    </div>
  )
}

export default Scoreboard
