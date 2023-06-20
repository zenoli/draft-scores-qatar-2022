import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import drafts from "@resources/drafts.json"
import { getEvents, getOwners } from "@lib/scores"

export const MatchesContext = React.createContext([])


export function useScores() {
  const [loading, setLoading] = useState(false)
  const [scores, setScores] = useState([])
  console.log("Use scores...")

  async function fetchScores() {
    setLoading(true)
    const scores = await fetch("/api/scores")
    setScores(await scores.json())
    setLoading(false)
    console.log(scores)
  }

  useEffect(() => {
    fetchScores()
  }, [])

  return [scores, loading]
}

function App() {
  const [scores, loading] = useScores()
  return (
    <Outlet context={[scores, loading]} />
  )
}

export default App
