import React from 'react';
import './App.css';
import SearchPage from './pages/SearchPage';
console.log(process.env.REACT_APP_USDA_API_KEY)
function App() {

  return <div className="App">{<SearchPage />}</div>;
  
}

export default App;
