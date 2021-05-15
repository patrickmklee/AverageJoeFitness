import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import {MealProvider} from './utils/GlobalState'
import SearchPage from './pages/SearchPage';


const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
        <MealProvider>
        <SearchPage />
        </MealProvider>
        </div>
      </Router>
      </ApolloProvider>
  );
}

export default App;
