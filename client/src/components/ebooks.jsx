import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Grid from '@material-ui/core/Grid';
import Book from './book';
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
  const classes = useStyles();


  return (
      <div>
       <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login'},{name:'Create Meet',url:'/login'}]}} brand='true' discuss='true' search='true'/>
            <SideNavbar />
    <div style={{marginLeft:"250px"}}className={classes.root}>
      <Grid container spacing={1}>
        <Book/>
        <Book/>
        <Book/>
        <Book/>
        <Book/>
        <Book/>
      </Grid>
    </div>
    </div>
  );
}

export default NestedBooks;
