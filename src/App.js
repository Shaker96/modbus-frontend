import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { allRoutes } from './routes/index';
import Ajax from './utils/Ajax';
import Login from './views/Login';

export default function App() {

  Ajax.baseUrl = 'http://127.0.0.1:8000/api/';

  const isLogged = !!localStorage.token

  let req = new Ajax('token/obtain', {
    username: ""
  })

  console.log('APP', isLogged);

  return (
    <Router>
      <Switch>
        {allRoutes.private.map((route) => {
          console.log(route);
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
          render={() => (
            <Login/>
          )}
        />
      </Switch>
    </Router>
  );
}
