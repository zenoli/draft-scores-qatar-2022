import { useLoaderData, useOutletContext } from "react-router-dom"
import { getEvents, getEventsOfTypes, getEventsWithOwners, getSortedScores } from "./scores"

export function loader({ params }) {
  console.log(params)
  return params
}

export default function ScoreDetailView(props) {
  const { participant, scoreType } = useLoaderData()
  const [events, loading] = useOutletContext()
  const ownerEvents = getEventsWithOwners(events, [participant])
  const ownerScoreTypeEvents = getEventsOfTypes(ownerEvents, [scoreType])



  return (
    <div>
      <div>{`Detail view of ${participant} of type ${scoreType}`}</div>
      <div>
        {JSON.stringify(ownerScoreTypeEvents)}
      </div>
    </div>)
}
