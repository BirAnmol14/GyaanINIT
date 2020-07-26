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
import editProfile from './components/editprofilepage'
import Dashboard from './components/dashboard'
import DashboardTopic from './components/dashboardTopic'
function App() {
  return (
    <Router>
    <Route path="/pastmeets"  component={PastMeets}></Route>
    <Route path="/login" exact component={Login}></Route>
    <Route path="/" exact component={Home}></Route>
    <Route path="/discuss/Engineering" exact component={discuss}></Route>
    <Route path="/discuss/JEE" exact component={discuss}></Route>
    <Route path="/discuss/NEET" exact component={discuss}></Route>
    <Route path="/discuss/School" exact component={discuss}></Route>
    <Route path="/discuss/Medical" exact component={discuss}></Route>
    <Route path="/discuss/Engineering/videolectures" exact component={discussVideo}></Route>
    <Route path="/discuss/JEE/videolectures" exact component={discussVideo}></Route>
    <Route path="/discuss/NEET/videolectures" exact component={discussVideo}></Route>
    <Route path="/discuss/School/videolectures" exact component={discussVideo}></Route>
    <Route path="/discuss/Medical/videolectures" exact component={discussVideo}></Route>
    <Route path="/discuss/Engineering/ebooks" exact component={ebooks}></Route>
    <Route path="/discuss/JEE/ebooks" exact component={ebooks}></Route>
    <Route path="/discuss/NEET/ebooks" exact component={ebooks}></Route>
    <Route path="/discuss/School/ebooks" exact component={ebooks}></Route>
    <Route path="/discuss/Medical/ebooks" exact component={ebooks}></Route>
    <Route path="/discuss/Engineering/articles" exact component={Article}></Route>
    <Route path="/discuss/Engineering/articles/post" exact component={Articlepage}></Route>
    <Route path="/discuss/Engineering/presentations" exact component={presentations}></Route>
    <Route path="/discuss/Medical/articles" exact component={Article}></Route>
    <Route path="/discuss/Medical/articles/post" exact component={Articlepage}></Route>
    <Route path="/discuss/Medical/presentations" exact component={presentations}></Route>
    <Route path="/discuss/JEE/articles" exact component={Article}></Route>
    <Route path="/discuss/JEE/articles/post" exact component={Articlepage}></Route>
    <Route path="/discuss/JEE/presentations" exact component={presentations}></Route>
    <Route path="/discuss/NEET/articles" exact component={Article}></Route>
    <Route path="/discuss/NEET/articles/post" exact component={Articlepage}></Route>
    <Route path="/discuss/NEET/presentations" exact component={presentations}></Route>
    <Route path="/discuss/School/articles" exact component={Article}></Route>
    <Route path="/discuss/School/articles/post" exact component={Articlepage}></Route>
    <Route path="/discuss/School/presentations" exact component={presentations}></Route>
    <Route path="/profile/edit" exact component={editProfile}></Route>
    <Route path="/Dashboard" exact component={Dashboard}></Route>
    <Route path="/Dashboard/:topic" exact component={DashboardTopic}></Route>
  
  </Router>
  );
}

export default App;
