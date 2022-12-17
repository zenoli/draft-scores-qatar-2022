const levenshteinDistance = (str1 = "", str2 = "") => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null))
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator, // substitution
      )
    }
  }
  return track[str2.length][str1.length]
}


// fetch("https://www.weltfussball.com/assists/wm-2022-in-katar/", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
//     "accept-language": "en-US,en;q=0.8",
//     "cache-control": "no-cache",
//     "pragma": "no-cache",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "none",
//     "sec-fetch-user": "?1",
//     "sec-gpc": "1",
//     "upgrade-insecure-requests": "1",
//     "cookie": "sprache=1; wfb_long_term=5; cc=5-CH-bs-basel"
//   },
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET"
// });
//

async function getCountryIds() {
  const response = await fetch("https://api.fifa.com/api/v3/competitions/teams/255711?language=en", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.6",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1"
    },
    "referrerPolicy": "no-referrer",
    "body": null,
    "method": "GET"
  });

  return await response.json()
}

async function fetchAssists() {
  const normalized = "Dušan Tadić".normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const response = await fetch("https://www.weltfussball.com/assists/wm-2022-in-katar/", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.8",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "sec-gpc": "1",
      "upgrade-insecure-requests": "1",
      "cookie": "sprache=1; __cf_bm=Cz9TCcZGmymAJdUdrFGZCqr1mqjEyf_ulO6.n5mtv3Y-1670859983-0-AaSZQitdjJYqJ5Qd5RYKdt9O3cgwOeJ8jGwH/2Wzrt1Bq+Y3DO4qKy3qLd/ufMePBGeQErgzP8mjK1QGbYMz+hzOqseNO4Ok5GuTy4bOBywl+fEyKEHhIj9Yy4AZ/tQaAvM+B15WVyWofOYa+PoSyHY=; weltfussball=3; wfb_long_term=9; cc=9-CH-bs-basel"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET"
  });
  return await response.text()
}


async function scrapeAssists() {
  const ASSISTS_URL = "https://www.weltfussball.com/assists/wm-2022-in-katar"
  // const response = await fetch(`https://crossorigin.me/${ASSISTS_URL}`, {})
  //

  const assists = await fetchAssists()
  console.log(assists)
  // const countriesProcessed = countries.Results.map(country => ({
  //   id: country.IdTeam,
  //   country: country.Abbreviation,
  //   name: country.Name[0].Description,
  // }))
  // console.log(countriesProcessed)

  // const response = await fetch(
  //   "https://sport.api.swisstxt.ch/v1/statistics?phaseId=4542&lang=de&limit=999",
  //   {
  //     headers: {
  //       accept: "*/*",
  //       "accept-language": "en-US,en;q=0.5",
  //       "cache-control": "no-cache",
  //       pragma: "no-cache",
  //       "sec-fetch-dest": "empty",
  //       "sec-fetch-mode": "cors",
  //       "sec-fetch-site": "cross-site",
  //       "sec-gpc": "1",
  //     },
  //     referrer: "https://www.srf.ch/",
  //     referrerPolicy: "no-referrer-when-downgrade",
  //     body: null,
  //     method: "GET",
  //     mode: "cors",
  //     credentials: "omit",
  //   },
  // )

  // const doc = await response.text()
  // const result = JSON.parse(doc)
  // const assists = result[1].items
  // const assistsProcessed = assists.map(x => {
  //   const { name, shortName, country } = x.competitor
  //   const ld = levenshteinDistance(
  //     name.toLowerCase(),
  //     "Abdelkarim Hassan".toLowerCase()
  //   )
  //   return ({
  //     name,
  //     shortName,
  //     country,
  //     assists: x.value,
  //     ld
  //   })
  // })

  // const assistsQatar = assistsProcessed.filter(a => a.country === "QAT")
  //   .sort((a, b) => a.ld - b.ld)
  // console.log(assistsQatar)
}

function main() {
  scrapeAssists()
}

main()
