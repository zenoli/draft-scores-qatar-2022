function ScoreboardHeader({ setSortCategory }) {
  const HeaderCell = ({name, category}) => (
    <th
      className="sm:p-4 p-2 overflow-hidden"
      onClick={() => setSortCategory(category)}
    >
      {name}
    </th>
  )

  return (
    <thead className="uppercase bg-slate-800 text-white p-14">
      <tr>
        <HeaderCell name="Name" category="name" />
        <HeaderCell name="Goals" category="goals" />
        <HeaderCell name="Assists" category="assists" />
        <HeaderCell name="Bookings" category="bookings" />
        <HeaderCell name="Clean Sheets" category="cleanSheets" />
        <HeaderCell name="Total" category="total" />
      </tr>
    </thead>
  )
}

export default ScoreboardHeader
