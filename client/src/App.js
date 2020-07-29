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
import Dashboard from './components/dashboard'
import DashboardTopic from './components/dashboardTopic'
import ServerRoutes from './components/ServerRoutes.js';
import Presentations from './components/presentations';
function App() {
  //login check and pass to render-props
  var [logged,setLogged]=React.useState('false');
  async function loggedStatus(){
    
    
    const response=await fetch(ServerRoutes.loggedIn,{
      method: 'GET',
      credentials: 'include'
    })
    const status=await response.status;
    if(status===200){
      const res=await response.json();
      if(res.status===true){
     
      
        setLogged({user:res.user,status:'true'});
   
        return;
        
        
      }else{
          setLogged('false');
          return;
      }
    }else{
      alert('Error '+status);
    }
  
  }
  React.useEffect(() => {
    loggedStatus();
  });

  return (
    <Router>
    <Route exact path="/" render={(props) => <Home {...props} logged={logged} />}/>
    <Route exact path="/pastmeets"  render={(props) => <PastMeets {...props} logged={logged} />}/>
    <Route exact path="/login"  render={(props) => <Login {...props} logged={logged} />}/>
    <Route exact path='/join'  render={(props) => <Join {...props} logged={logged} />}/>
    <Route exact path='/create'  render={(props) => <Create {...props} logged={logged} />}/>
    <Route exact path="/discuss/Engineering"  render={(props) => <Discuss {...props} logged={logged} />}/>
    <Route exact path="/discuss/JEE"  render={(props) => <Discuss {...props} logged={logged} />}/>
    <Route exact path="/discuss/NEET"  render={(props) => <Discuss {...props} logged={logged} />}/>
    <Route exact path="/discuss/School"  render={(props) => <Discuss {...props} logged={logged} />}/>
    <Route exact path="/discuss/Medical"  render={(props) => <Discuss {...props} logged={logged} />}/>
    <Route exact path="/discuss/Engineering/videolectures"render={(props) => <DiscussVideo {...props} logged={logged} />}/>
    <Route exact path="/discuss/JEE/videolectures" render={(props) => <DiscussVideo {...props} logged={logged} />}/>
    <Route exact path="/discuss/NEET/videolectures" render={(props) => <DiscussVideo {...props} logged={logged} />}/>
    <Route exact path="/discuss/School/videolectures" render={(props) => <DiscussVideo {...props} logged={logged} />}/>
    <Route exact path="/discuss/Medical/videolectures" render={(props) => <DiscussVideo {...props} logged={logged} />}/>
    <Route exact path="/discuss/Engineering/ebooks" render={(props) => <Ebooks {...props} logged={logged} />}/>
    <Route exact path="/discuss/JEE/ebooks" render={(props) => <Ebooks {...props} logged={logged} />}/>
    <Route exact path="/discuss/NEET/ebooks" render={(props) => <Ebooks {...props} logged={logged} />}/>
    <Route exact path="/discuss/School/ebooks" render={(props) => <Ebooks {...props} logged={logged} />}/>
    <Route exact path="/discuss/Medical/ebooks" render={(props) => <Ebooks {...props} logged={logged} />}/>
    <Route exact path="/discuss/Engineering/articles" render={(props) => <Article {...props} logged={logged} />}/>
    <Route exact path="/discuss/Engineering/articles/post" render={(props) => <Articlepage {...props} logged={logged} />}/>
    <Route exact path="/discuss/Engineering/presentations" render={(props) => <Presentations {...props} logged={logged} />}/>
    <Route exact path="/discuss/Medical/articles" render={(props) => <Article {...props} logged={logged} />}/>
    <Route exact path="/discuss/Medical/articles/post" render={(props) => <Articlepage {...props} logged={logged} />}/>
    <Route exact path="/discuss/Medical/presentations" render={(props) => <Presentations {...props} logged={logged} />}/>
    <Route exact path="/discuss/JEE/articles" render={(props) => <Article {...props} logged={logged} />}/>
    <Route exact path="/discuss/JEE/articles/post" render={(props) => <Articlepage {...props} logged={logged} />}/>
    <Route exact path="/discuss/JEE/presentations" render={(props) => <Presentations {...props} logged={logged} />}/>
    <Route exact path="/discuss/NEET/articles" render={(props) => <Article {...props} logged={logged} />}/>
    <Route exact path="/discuss/NEET/articles/post" render={(props) => <Articlepage {...props} logged={logged} />}/>
    <Route exact path="/discuss/NEET/presentations" render={(props) => <Presentations {...props} logged={logged} />}/>
    <Route exact path="/discuss/School/articles" render={(props) => <Article {...props} logged={logged} />}/>
    <Route exact path="/discuss/School/articles/post" render={(props) => <Articlepage {...props} logged={logged} />}/>
    <Route exact path="/discuss/School/presentations" render={(props) => <Presentations {...props} logged={logged} />}/>
    <Route exact path="/profile/edit" render={(props) => <EditProfile {...props} logged={logged} />}/>
    <Route exact path="/Dashboard" render={(props) => <Dashboard {...props} logged={logged} />}/>
    <Route exact path="/Dashboard/:topic" render={(props) => <DashboardTopic {...props} logged={logged} />}/>

  </Router>
  );
}

export default App;
