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
  return fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${process.env.REACT_APP_USDA_API_KEY}&pageSize=4`, {
    method: 'GET'
  })
}