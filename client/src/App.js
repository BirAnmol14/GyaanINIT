import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './components/login';

function App() {
  return (
    <Router>
    <Route path="/login" exact component={Login}></Route>
    <Route path="/" exact component={Home}></Route>
    </Router>
  );
}

export default App;
