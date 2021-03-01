import React from 'react';
import { Home } from './containers/Home';
import { About } from './containers/About';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Route, Switch } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Switch>
      <Footer />
    </div>
  );
};