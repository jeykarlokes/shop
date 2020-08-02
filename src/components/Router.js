import {BrowserRouter,Route,Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import React from 'react';
import Notfound from './Notfound';
import App from './App';

const Router = () => (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={StorePicker} />
          <Route path="/store/:storeId" component={App} />
          <Route component={ Notfound } />
        </Switch>
    </BrowserRouter>

    );
    
export default Router;