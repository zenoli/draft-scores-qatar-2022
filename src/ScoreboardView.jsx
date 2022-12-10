import { useOutletContext } from "react-router-dom"
import Scoreboard from "./Scoreboard"

function ScoreboardView() {
  const [events, loading] = useOutletContext()
  return (
    <div className="ScoreboardView flex justify-center m-4 sm:m-8">
      {events.length > 0 && <Scoreboard events={events} loading={loading}/>}
    </div>
  )
}

export default ScoreboardView
