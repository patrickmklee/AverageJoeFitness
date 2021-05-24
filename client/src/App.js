import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


import Home from './pages/Home';
import Detail from './pages/Detail';
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
        <div className="container">
        <ScheduleProvider>

        <Nav />
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/timeline" component={Timeline} />
            {/* <Route exact path="/addMeal" component={SearchPage} />
            <Route exact path="/foods/:id" component={Detail} /> */}

            <Route component={NoMatch} />

            </Switch>
        
            <footer className="text-muted py-5 border-top mt-4">
              <div className="container">
                <p className="mb-0">Average Joe Fitness source code on <a href="https://github.com/patrickmklee/AverageJoeFitness" target="_blank">GitHub</a>.</p>
              </div>
            </footer>
        </ScheduleProvider>
        </div>
      </Router>
      </ApolloProvider>
  );
}

export default App;
