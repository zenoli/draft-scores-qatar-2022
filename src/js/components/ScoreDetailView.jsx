import { useLoaderData } from "react-router-dom"
import BackButton from "./BackButton"
import Header from "./Header"

export function loader({ params }) {
  console.log(params)
  return params
}

export default function ScoreDetailView(props) {
  const { participant, scoreType } = useLoaderData()

  const rows = []
  const displayScoreTypes = {
    goal: "goals",
    assist: "assists",
    booking: "bookings",
    cleanSheet: "clean sheets",
    total: "total score",
  }

  return (
    <div>
      <Header
        icon={<BackButton />}
        title={<h1> {`${displayScoreTypes[scoreType]} ${participant}`}</h1>}
      />
      <div className="m-4 rounded-lg overflow-auto relative">
        <table className="w-full">
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  )
}
