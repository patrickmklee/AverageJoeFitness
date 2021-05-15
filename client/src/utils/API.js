export const FdcSearchFood = (key, query) => {
  return fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&dataType=Foundation&dataType=SR Legacy&api_key=${process.env.REACT_APP_USDA_API_KEY}&pageSize=24`, {
    method: 'GET'
  })
}