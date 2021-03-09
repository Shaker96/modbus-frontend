import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { allRoutes } from './routes/index';
import Ajax from './utils/Ajax';

export default function App() {

  Ajax.baseUrl = 'http://127.0.0.1:8000/api/';

  const isLogged = false; /* !!localStorage.token */

  // let req = new Ajax('token/obtain', {
  //   username: ""
  // })

  console.log('APP', isLogged);

  return (
    <Router>
      <Switch>
        {allRoutes.public.map((route) => {
          const { component: Component } = route;
          return (
            <Route
              path={`${route.path}`}
              key={route.path}
              exact={route.exact}
              render={(props) => 
                <Component {...props}/>
              }
            />
          );
        })}
        {allRoutes.private.map((route) => {
          const { component: Component } = route;
          return (
            <Route
              path={`${route.path}`}
              key={route.path}
              exact={route.exact}
              render={(props) => 
                isLogged ? (
                  <Component {...props}/>
                ) : (
                  <Redirect to='/login'/>
                )
              }
            />
          );
        })}
        <Route
          path='/'
          key='/'
          exact={true}
          render={() => 
            <Redirect to='/dashboard'/>
          }
        />
      </Switch>
    </Router>
  );
}
