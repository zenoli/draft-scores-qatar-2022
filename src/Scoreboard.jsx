import { useState, useMemo } from "react"
import drafts from "./drafts.json"
import api from "./api-full.json"
import {
  getEvents,
  getOwners,
  getEventsWithOwners
} from "./scores.js"
import { Participants } from "./enums.js"
import ScoreboardRow from "./ScoreboardRow"
import ScoreboardHeader from "./ScoreboardHeader"


function Scoreboard(props) {
  const [count, setCount] = useState(0)
  const [owners, setOwners] = useState(getOwners(drafts))
  const [events, setEvents] = useState(getEvents(api, owners))

  const doubleCount = useMemo(() => count * 2, [count])

  function handleClick(e) {
    setCount((count) => count + 1)
    console.log("Inside handleClick!!!")
  }

  return (
    <div>
      <button className="bg-sky-500 p-2 rounded-full" onClick={handleClick}>
        Oli: {count}, Double count: {doubleCount}
      </button>
      <table>
        <thead>
          <ScoreboardHeader/>
        </thead>
        <tbody>
          <ScoreboardRow name="Oli" events={getEventsWithOwners(events, ["Oli"])} />
          <ScoreboardRow name="Jakob" events={getEventsWithOwners(events, ["Jakob"])}/>
          <ScoreboardRow name="Joel" events={getEventsWithOwners(events, ["Joel"])}/>
          <ScoreboardRow name="Jan" events={getEventsWithOwners(events, ["Jan"])}/>
          <ScoreboardRow name="Julien" events={getEventsWithOwners(events, ["Julien"])}/>
          <ScoreboardRow name="Fabian" events={getEventsWithOwners(events, ["Fabian"])}/>
          <ScoreboardRow name="Chris" events={getEventsWithOwners(events, ["Chris"])}/>
        </tbody>
      </table>
      <div>{JSON.stringify(events)}</div>
    </div>
  )
}

export default Scoreboard
