import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Book from './book';

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
       <Navbar logged='true'  brand='true' join='true' create='true' discuss='true' search='true'/>
            <SideNavbar />
    <div style={{marginLeft:"250px"}}className={classes.root}>
      <Grid container spacing={1}>
        <Book/>
        <Book/>
        <Book/>
        <Book/><Book/>
        <Book/>

        
      </Grid>
    </div>
    </div>
  );
}

export default NestedBooks;