export default function EventTableRow({
  type_of_event,
  player,
  time,
  extra_info,
  country,
  opponent,
}) {
  return (
    <tr className="font-normal even:bg-white odd:bg-slate-100 text-gray-500">
      <td className="sm:p-3 p-2">{country}</td>
      <td>{player}</td>
      <td>{type_of_event}</td>
      <td>{time}</td>
      <td>{opponent}</td>
    </tr>
    

  )
}
