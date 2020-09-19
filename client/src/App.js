import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Join from './components/join';
import Create from './components/create.jsx';
import Login from './components/login';
import PastMeets from './components/pastmeets'
import Discuss from './components/discuss';
import DiscussVideo from './components/discussVideo';
import Ebooks from './components/ebooks'
import Article from './components/article'
import Articlepage from './components/articlepage'
import EditProfile from './components/editprofilepage'
import ViewProfile from './components/viewProfilePage'
import Dashboard from './components/dashboard'
import DashboardTopic from './components/dashboardTopic'
import ServerRoutes from './components/ServerRoutes.js';
import Presentations from './components/presentations';
import queryString from 'query-string';
import VideoCall from './components/VideoCall.jsx';
import Group from './components/group/group.jsx';
import Post from './components/posts/posts.jsx';
import UserProfile from './components/userProfile/userProfile.jsx';
function App() {
  function getNextUrl(){
    const obj=queryString.parse(window.location.search);
    if(obj && obj.type && (obj.type==='join'||obj.type==='create'||obj.type==='Dashboard')){
      return '/'+obj.type;
    }
    return '/';
  }
  //login check and pass to render-props
  var [logged,setLogged]=React.useState({status:false,user:null});
  async function loggedStatus(){
    const response=await fetch(ServerRoutes.loggedIn,{
      method: 'GET',
      credentials: 'include'
    })
    const status=await response.status;
    if(status===200){
      const res=await response.json();
      if(res.status===true){
        setLogged({user:res.user,status:true});
        if(window.location.href.includes('/login')){
            window.location.href=getNextUrl();
        }
        return;


      }else{
          setLogged({status:false,user:null});
          if(window.location.href.includes('/join')){
              window.location.href='/login?type=join';
          }else if(window.location.href.includes('/create')){
            window.location.href='/login?type=create';
          }else if (window.location.href.includes('/Dashboard')) {
            window.location.href='/login?type=Dashboard';
          }
          return;
      }
    }else{
      alert('Error '+status);
    }

  }

  React.useEffect(() => {
    loggedStatus();

  },[]);

  return (
    <Router>
    <Route exact path="/" render={(props) => <Home {...props} logged={logged} />}/>
    <Route path="/videoCall" render={(props) => <VideoCall {...props} logged={logged} />}/>
    <Route path="/group" render={(props) => <Group {...props} logged={logged} />}/>
    <Route path="/post" render={(props) => <Post {...props} logged={logged} />}/>
    <Route exact path="/pastmeets"  render={(props) => <PastMeets {...props} logged={logged} />}/>
    <Route exact path="/login"  render={(props) => <Login {...props} logged={logged} />}/>
    <Route exact path='/join'  render={(props) => <Join {...props} logged={logged} />}/>
    <Route exact path='/create'  render={(props) => <Create {...props} logged={logged} />}/>
    <Route exact path="/discuss/:category"  render={(props) => <Discuss {...props} logged={logged} />}/>
    <Route exact path="/discuss/:category/videolectures"render={(props) => <DiscussVideo {...props} logged={logged} />}/>
    <Route exact path="/discuss/:category/ebooks" render={(props) => <Ebooks {...props} logged={logged} />}/>
    <Route exact path="/discuss/:category/articles" render={(props) => <Article {...props} logged={logged} />}/>
    <Route exact path="/discuss/:category/articles/post" render={(props) => <Articlepage {...props} logged={logged} />}/>
    <Route exact path="/discuss/:category/presentations" render={(props) => <Presentations {...props} logged={logged} />}/>
    <Route exact path="/profile/edit" render={(props) => <EditProfile {...props} logged={logged} />}/>
    <Route exact path="/profile/" render={(props) => <ViewProfile {...props} logged={logged} />}/>
    <Route exact path="/Dashboard" render={(props) => <Dashboard {...props} logged={logged} />}/>
    <Route exact path="/Dashboard/:topic" render={(props) => <DashboardTopic {...props} logged={logged} />}/>
    <Route exct path="/u/:username" render={(props) => <UserProfile {...props} logged={logged} />}/>
  </Router>
  );
}

export default App;
