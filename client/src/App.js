import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


import Home from './pages/Home';
import SearchPage from './pages/SearchPage';

import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Timeline from './pages/Timeline';
import Nav from './components/Nav';

import {ScheduleProvider} from './utils/GlobalState'



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
        <ScheduleProvider>

        <Nav />
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/timeline" component={Timeline} />
            <Route exact path="/addMeal" component={SearchPage} />
            <Route component={NoMatch} />

            </Switch>
        </ScheduleProvider>
        </div>
      </Router>
      </ApolloProvider>
  );
}

export default App;
