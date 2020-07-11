import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import discuss from './components/discuss';
import discussVideo from './components/discussVideo';

function App() {
  return (
    <Router>
    <Route path="/login" exact component={Login}></Route>
    <Route path="/" exact component={Home}></Route>
    <Route path="/discuss/engineering" exact component={discuss}></Route>
    <Route path="/discuss/JEE" exact component={discuss}></Route>
    <Route path="/discuss/NEET" exact component={discuss}></Route>
    <Route path="/discuss/School" exact component={discuss}></Route>
    <Route path="/discuss/Medical" exact component={discuss}></Route>
    <Route path="/discuss/engineering/videolectures" exact component={discussVideo}></Route>
    <Route path="/discuss/JEE/videolectures" exact component={discussVideo}></Route>
    <Route path="/discuss/NEET/videolectures" exact component={discussVideo}></Route>
    <Route path="/discuss/School/videolectures" exact component={discussVideo}></Route>
    <Route path="/discuss/Medical/videolectures" exact component={discussVideo}></Route>
    </Router>
  );
}

export default App;
