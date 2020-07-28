import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Grid from '@material-ui/core/Grid';
import Book from './book';
import ServerRoutes from './ServerRoutes.js';
function getActive(){
  var url=window.location.href.split('/');
  return {name:url[url.length-2],url:window.location.href}
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function NestedBooks() {
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
      
        setLogged('true');
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
  const classes = useStyles();


  return (
      <div>
       <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}]}} brand='true' discuss='true' search='true' login={logged}/>
       <div style={{marginTop:"90px"}}>
       <SideNavbar links={{active:{name:'eBooks'},other:[{name:'Posts',url:'/discuss/'+getActive().name},{name:'Videos',url:'/discuss/'+getActive().name+'/videolectures'},{name:'eBooks',url:'/discuss/'+getActive().name+'/ebooks'},{name:'Articles',url:'/discuss/'+getActive().name+'/articles'},{name:'Presentations',url:'/discuss/'+getActive().name+'/presentations'}]}}/>
    <div style={{marginLeft:"250px"}}className={classes.root}>
      <Grid container spacing={1}>
        <Book/>
        <Book/>
        <Book/>
        <Book/>
        <Book/>
        <Book/>
        <Book/><Book/><Book/>
      </Grid>
    </div>
    </div>
    </div>
  );
}

export default NestedBooks;
