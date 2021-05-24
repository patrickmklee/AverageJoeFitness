const fetch = require('node-fetch');

export const FdcSearchFood = (key, query) => {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&dataType=Foundation&dataType=Branded&api_key=${process.env.REACT_APP_USDA_API_KEY}&pageSize=24`;
  const options = {
    method:'GET'
  }
  return fetch(url,options)
  // .then(res => res.json())
  // .catch(err => console.error('error:' + err));
    
};
export const FdcAbridgedFood = (key, query) => {
  return fetch(`https://api.nal.usda.gov/fdc/v1/foods/list?query=${query}&dataType=Foundation&api_key=${process.env.REACT_APP_USDA_API_KEY}&pageSize=24`, {
    method: 'GET'
  })
}

export const FdcGetFood = (key, id) => {
  let url = `https://api.nal.usda.gov/fdc/v1/food/${id}`
  let options = {method: 'GET', qs: {api_key: key}}
  fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
  // return fetch(`https://api.nal.usda.gov/fdc/v1/food/${id}?&api_key=${process.env.REACT_APP_USDA_API_KEY}`, {
  //   method: 'GET'
  // })
}