export const fetchSearchInstant = (query) => {
  return fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}&locale=en_US`, {
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-app-id": "932fd306",
    "x-app-key": "41545304a949b572b1cb869d23a83328"
  }
})}
export const fetchNatural = (query) => {
  return fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "x-app-id": "932fd306",
      "x-app-key": "41545304a949b572b1cb869d23a83328"
    },
    "body": "{\"query\":\""+query+"\",\"timezone\":\"US/Eastern\"}"
    })
}


export const FdcSearchFood = (key, query) => {
  fetch('https://api.nal.usda.gov/fdc/v1/foods/search', {
    method: 'POST',
    qs: {api_key: key},
    headers: {'Content-Type': 'application/json'},
    body: `{"query":${query},"dataType":["Foundation","SR Legacy"],"pageSize":25,"pageNumber":2,"sortBy":"dataType.keyword","sortOrder":"asc","brandOwner":"Kar Nut Products Company"}`
  })
}