import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom"
import { getEvents, getEventsOfTypes, getEventsWithOwners, getSortedScores } from "./scores"
import BackButton from "./BackButton"
import Header from "./Header"
import EventTableRow from "./EventTableRow"

export function loader({ params }) {
  console.log(params)
  return params
}

export default function ScoreDetailView(props) {
  const navigate = useNavigate()
  const { participant, scoreType } = useLoaderData()
  const [events, loading] = useOutletContext()
  const ownerEvents = getEventsWithOwners(events, [participant])
  const ownerScoreTypeEvents = getEventsOfTypes(ownerEvents, [scoreType])

  const eventsToShow = scoreType === "total" ? ownerEvents : ownerScoreTypeEvents
  const rows = eventsToShow.map(event => <EventTableRow key={event.id} {...event} />)

  const displayScoreTypes = {
    "goal": "goals",
    "assist": "assists",
    "booking": "bookings",
    "cleanSheet": "clean sheets",
    "total": "total score",
  }

  return (
    <div >
      <Header 
        icon={<BackButton />}
        title= {<h1> {`${displayScoreTypes[scoreType]} ${participant}`}</h1>}
      />
      <div className="m-4 rounded-lg overflow-auto relative">
        <table className="w-full">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>)
}
