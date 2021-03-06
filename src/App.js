import React, { useState, useEffect } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { allRoutes } from './routes/index';
import Ajax from './utils/Ajax';
import endpoints from './endpoints/index';
import checkToken from './utils/sessionCheck'

export default function App() {
  Ajax.baseUrl = endpoints.BASE_URL;
  
  const [isLogged, setIsLogged] = useState(false);

  let tokens = {...localStorage}

  console.log('TOKENS', tokens);

  useEffect(() => {
    if (tokens.access !== undefined) {
      checkToken(() => { setIsLogged(true) })
    } else {
      setIsLogged(false)
    }
  }, []);

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
                <Component 
                  {...props} 
                  isLogged={isLogged} 
                  setIsLogged={setIsLogged}
                />
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
                  <Component 
                    {...props}
                    isLogged={isLogged}
                    setIsLogged={setIsLogged}
                  />
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
