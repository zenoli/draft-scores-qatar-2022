import { AiFillCaretDown } from "react-icons/all"

function ScoreboardHeader({ sortCategory, setSortCategory }) {
  const HeaderCell = ({name, category}) => {
    const isSorted = sortCategory === category
    
    return (
      <th
        className="sm:p-4 p-2 overflow-hidden cursor-pointer"
        onClick={() => setSortCategory(category)}
      >
        <div className="flex justify-center items-center gap-1">
          <div>
            {name}
          </div>
          <div>
            {isSorted && <AiFillCaretDown />}
          </div>
        </div>
      </th>
    )
  }

  return (
    <thead className="uppercase bg-slate-800 text-white text-xs">
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
