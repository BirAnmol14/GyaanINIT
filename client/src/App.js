import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import PastMeets from './components/pastmeets'
import discuss from './components/discuss';
import discussVideo from './components/discussVideo';
import ebooks from './components/ebooks'
import Article from './components/article'
import Articlepage from './components/articlepage'
import presentations from './components/presentations'

function App() {
  return (
    <Router>
      <Route path="/pastmeets"  component={PastMeets}></Route>
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
    <Route path="/discuss/engineering/ebooks" exact component={ebooks}></Route>
    <Route path="/discuss/JEE/ebooks" exact component={ebooks}></Route>
    <Route path="/discuss/NEET/ebooks" exact component={ebooks}></Route>
    <Route path="/discuss/School/ebooks" exact component={ebooks}></Route>
    <Route path="/discuss/Medical/ebooks" exact component={ebooks}></Route>
    <Route path="/discuss/engineering/articles" exact component={Article}></Route>
    <Route path="/discuss/engineering/articles/post" exact component={Articlepage}></Route>
    <Route path="/discuss/engineering/presentations" exact component={presentations}></Route>
  </Router>
  );
}

export default App;
