import { useOutletContext } from "react-router-dom"
import Header from "./Header"
import Scoreboard from "./Scoreboard"
import { IoFootball } from "react-icons/all"

function ScoreboardView() {
  const [scores, loading] = useOutletContext()
  return (
    <div>
      <Header
        icon={<IoFootball />}
        title={<h1>Ravensburger Scoreboard</h1>}
      />
      <div className="ScoreboardView flex justify-center m-4 sm:m-8">
        {<Scoreboard scores={scores} loading={loading}/>}
      </div>
    </div>
  )
}

export default ScoreboardView
