import { EventType, Participants } from "./enums.js"
import { arrayToObject, invertAssociation } from "./utils.js"

function getScoreObject() {
  return arrayToObject(
    Object.values(Participants),
    (key) => key,
    (_) => 0,
  )
}

export function getOwners(drafts) {
  const owners = {}
  for (const country of Object.keys(drafts)) {
    owners[country] = invertAssociation(drafts[country])
  }
  return owners
}

export function getEvents(matches, owners) {
  const events = []
  for (const match of matches) {
    for (const event of match.home_team_events) {
      event.country = match.home_team_country
      event.opponent = match.away_team_country
      const owner = owners[event.country] && owners[event.country][event.player]
      if (owner) {
        event.owner = owner
        events.push(event)
      }
    }
    for (const event of match.away_team_events) {
      event.country = match.away_team_country
      event.opponent = match.home_team_country
      const owner = owners[event.country] && owners[event.country][event.player]
      if (owner) {
        event.owner = owner
        events.push(event)
      }
    }
  }
  return events
}

export function getEventsWithPlayers(events, players) {
  return events.filter((event) => players.includes(event.player))
}

export function getEventsWithOwners(events, owners) {
  return events.filter((event) => owners.includes(event.owner))
}

export function getMatchEvents(events, team1, team2) {
  return events.filter((event) => {
    const countries = [team1, team2]
    const c1 = countries.includes(event.home_team_country)
    const c2 = countries.includes(event.away_team_country)
    return c1 && c2
  })
}

export function getEventsOfTypes(events, types) {
  return events.filter(event => types.includes(event.type_of_event))
}

export function getScores(events) {
  return Object.values(Participants)
    .map(owner => ([owner, getEventsWithOwners(events, [owner])]))
    .map(([owner, ownerEvents]) => ([owner, getScoresOfOwner(ownerEvents)]))
}

export function sortScores(scores, scoreType) {
  if (scoreType === "name")
    return scores.sort((a, b) => b.name < a.name ? -1 : 1)
  else
    return scores.sort((a, b) => b[1][scoreType].length - a[1][scoreType].length)
}

export function getSortedScores(events, scoreType) {
  const scores = getScores(events)
  return sortScores(scores, scoreType)
}

export function getScoresOfOwner(events) {
  const goals = getEventsOfTypes(events, [EventType.GOAL])
  const assists = []
  const bookings = getEventsOfTypes(events, [EventType.BOOKING])
  const cleanSheets = []
  const total = [...goals, ...assists, ...bookings, ...cleanSheets]
  return { goals, assists, bookings, cleanSheets, total }
}


function addScores(score1, score2) {
  const sum = {}
  Object.keys(score1).map((p) => (sum[p] = score1[p] + score2[p]))
  return sum
}

export function processMatches(matches, drafts) {
  return matches.reduce(
    (score, match) => addScores(processMatch(match, drafts), score),
    getScoreObject(),
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
    getScoreObject(),
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

function foo() {
  const x = 5
  const y = 2
  const z = x + y
  console.log("x")
  
}

foo()
