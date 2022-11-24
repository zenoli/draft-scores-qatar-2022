import { EventType, Participants } from "./enums"
import { arrayToObject, zip } from "./utils"

function getScoreObject() {
  return arrayToObject(
    Object.values(Participants),
    (key) => key,
    (_) => 0,
  )
}

function addScores(score1, score2) {
  const sum = {}
  Object.keys(score1).map(p => sum[p] = score1[p] + score2[p])
  return sum
}

export function processMatches(matches, drafts) {
  return matches.reduce(
    (score, match) => addScores(processMatch(match, drafts), score),
    getScoreObject()
  )
}


function processMatch(match, drafts) {
  const homeTeam = match.home_team_country
  const awayTeam = match.away_team_country

  const homeTeamDrafts = drafts["ENG"]
  const awayTeamDrafts = drafts["IRN"]

  const homeTeamScore = processEvents(match.home_team_events, homeTeamDrafts)
  const awayTeamScore = processEvents(match.away_team_events, awayTeamDrafts)

  return addScores(homeTeamScore, awayTeamScore)
}

function processEvents(events, teamDrafts) {
  return events.reduce(
    (score, event) => addScores(score, processEvent(event, teamDrafts)),
    getScoreObject()
  )
}

function processEvent(event, teamDrafts) {
  const player = event.player
  switch (event.type_of_event) {
    case EventType.GOAL:
      return processGoalEvent(player, teamDrafts)
    case EventType.BOOKING:
      return processBookingEvent(player, teamDrafts)
    default:
      return getScoreObject()
  }
}

function processGoalEvent(player, teamDrafts) {
  const scores = getScoreObject()
  for (const [participant, draftedPlayer] of Object.entries(teamDrafts)) {
    scores[participant] += +(player === draftedPlayer)
  }
  return scores
}

function processBookingEvent(player, teamDrafts) {
  const scores = getScoreObject()
  for (const [participant, draftedPlayer] of Object.entries(teamDrafts)) {
    scores[participant] += +(player === draftedPlayer)
  }
  return scores
}
