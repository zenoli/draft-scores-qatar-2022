import { getEventsOfTypes } from "./scores.js"

function ScoreboardRow({name, events}) {

  const goals = getEventsOfTypes(events, ["goal"])
  const assists = []
  const cards = getEventsOfTypes(events, ["booking"])
  const cleanWests = []

  const total = [goals, assists, cards, cleanWests]
    .reduce((total, next) => total += next.length, 0)

  return (
    <tr>
      <td>{name}</td>
      <td>{goals.length}</td>
      <td>{assists.length}</td>
      <td>{cards.length}</td>
      <td>{cleanWests.length}</td>
      <td>{total}</td>
    </tr>
  )

}

export default ScoreboardRow
