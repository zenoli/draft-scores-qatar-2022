import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import drafts from "./drafts.json"
import { getEvents, getOwners } from "./scores"

export const MatchesContext = React.createContext([])

export function useEvents() {
  const [loading, setLoading] = useState(true)
  const [matches, setMatches] = useState([])
  const owners = getOwners(drafts)
  const UPDATE_INTERVAL = 60 * 1000

  const events = getEvents(matches, owners)
  async function fetchMatches() {
    setLoading(true)
    const matchesResponse = await fetch(
      "https://worldcupjson.net/matches?details=true",
    )
    const matches = await matchesResponse.json()
    setLoading(false)
    console.log("FETCHING...")
    setMatches(matches)
  }

  useEffect(() => {
    fetchMatches()
    const intervalHandle = setInterval(fetchMatches, UPDATE_INTERVAL)
    return function cleanup() {
      clearInterval(intervalHandle)
    }
  }, [])

  return [events, loading]
}

function App() {
  const [matches, loading] = useEvents()
  return (
    <Outlet context={[matches, loading]} />
  )
}

export default App
