import { Link } from "react-router-dom"

function ScoreboardRow({ name, goals, assists, bookings, cleanSheets, total }) {
  const Cell = (props) => (
    <th
      className={`sm:p-3 p-2 font-normal hover:bg-slate-200 hover:rounded-lg overflow-hidden cursor-pointer ${props.className}`}
    >
      <Link
        to={`details/${name}/${props.scoreType}`}
      >
        <div>
          {props.children}
        </div>
      </Link>
    </th>
  )
  return (
    <tr className="font-normal even:bg-white odd:bg-slate-100 text-gray-500">
      <Cell className="text-left font-bold">{name}</Cell>
      <Cell scoreType="goal">{goals.length}</Cell>
      <Cell scoreType="assist">{assists.length}</Cell>
      <Cell scoreType="booking">{bookings.length}</Cell>
      <Cell scoreType="cleanSheet">{cleanSheets.length}</Cell>
      <Cell scoreType="total" className="font-bold">{total.length}</Cell>
    </tr>
  )
}

export default ScoreboardRow
