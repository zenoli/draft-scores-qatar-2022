import { getEventsOfTypes } from "./scores.js"

function ScoreboardRow({ name, goals, assists, bookings, cleanSheets, total }) {
  const Cell = (props) => (
    <th
      className={`sm:p-3 p-2 font-normal hover:bg-slate-200 hover:rounded-lg overflow-hidden cursor-pointer ${props.className}`}
    >
      {props.children}
    </th>
  )
  return (
    <tr className="font-normal even:bg-white odd:bg-slate-100 text-gray-500">
      <Cell className="text-left font-bold">{name}</Cell>
      <Cell>{goals.length}</Cell>
      <Cell>{assists.length}</Cell>
      <Cell>{bookings.length}</Cell>
      <Cell>{cleanSheets.length}</Cell>
      <Cell className="font-bold">{total.length}</Cell>
    </tr>
  )

}

export default ScoreboardRow
