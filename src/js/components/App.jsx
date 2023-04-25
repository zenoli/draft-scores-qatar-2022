import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import drafts from "@resources/drafts.json"
import { getEvents, getOwners } from "@lib/scores"

export const MatchesContext = React.createContext([])


export function useEvents() {
  const [loading, setLoading] = useState(true)
  const [matches, setMatches] = useState([])
  const owners = getOwners(drafts)
  const UPDATE_INTERVAL = 60 * 1000

  console.table(drafts)
  const events = getEvents(matches, owners, drafts)

  async function fetchMatches() {
    setLoading(true)
    const matchesResponse = await fetch(
      "https://worldcupjson.net/matches?details=true",
    )
    let matches = await matchesResponse.json()
    if (matches.message != null)
      matches = []
    setLoading(false)
    console.log("FETCHING...")
    setMatches(matches)
  }

  useEffect(() => {
    fetchMatches()
    // const intervalHandle = setInterval(fetchMatches, UPDATE_INTERVAL)
    // return function cleanup() {
    //   clearInterval(intervalHandle)
    // }
  }, [])

  return [events, loading]
}

function App() {
  const [events, loading] = useEvents()
  return (
    <Outlet context={[events, loading]} />
  )
}

export default App
