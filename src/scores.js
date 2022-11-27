import { EventType, Participants } from "./enums"
import { arrayToObject, invertAssociation } from "./utils"

function getScoreObject() {
  return arrayToObject(
    Object.values(Participants),
    (key) => key,
    (_) => 0,
  )
}

function getOwners(drafts) {
  const owners = {}
  for (const country in Object.keys(drafts)) {
    owners[country] = invertAssociation(drafts[country])
  }
  return owners
}


function getEvents(matches, owners) {
  const events = []
  for (const match of matches) {
    for (const event of match.home_team_events) {
      const owner = owners[event.home_team_country][event.player]
      if (owner) {
        event.owner = owner
        event.country = match.home_team_country
        event.opponent = match.away_team_country
        events.push(event)
      }
    }
    for (const event of match.away_team_events) {
      const owner = owners[event.away_team_country][event.player]
      if (owner) {
        event.owner = owner
        event.country = match.away_team_country
        event.opponent = match.home_team_country
        events.push(event)
      }
    }
  }
  return events
}


function getPlayerEvents(events, players, eventTypes) {
  return events.filter(event => {
    const c1 = eventTypes.includes(event.type_of_event)
    const c2 = players.includes(event.player)
    return c1 && c2
  })
}


function getOwnerEvents(events, owners, eventTypes) {
  return events.filter(event => {
    const c1 = eventTypes.includes(event.type_of_event)
    const c2 = owners.includes(event.owner)
    return c1 && c2
  })
}

function getMatchEvents(events, team1, team2) {
  return events.filter(event => {
    const countries = [team1, team2]
    const c1 = countries.includes(event.home_team_country)
    const c2 = countries.includes(event.away_team_country)
    return c1 && c2
  })
}


function* events(matches) {
  for (const match of matches) {
    for (const event of match.home_team_events) {
      event.opponent = match.away_team_country
      yield event
    }
    for (const event of match.away_team_events) {
      event.opponent = match.home_team_country
      yield event
    }

  }
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
