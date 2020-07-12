import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import logo from '../components/logo.png';
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

function Book() {
    const classes = useStyles();
    return (
      <React.Fragment>
          <Grid container item xs={12} spacing={3}>
         
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.paper}><img src={logo}></img><></><h3>Topic</h3><p>This book is for the ..</p><button>Download</button></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper  elevation={3} className={classes.paper}><img src={logo}></img><></><h3>Topic</h3><p>This book is for the ..</p><button>Download</button></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper  elevation={3} className={classes.paper}><img src={logo}></img><></><h3>Topic</h3><p>This book is for the ..</p><button>Download</button></Paper>
        </Grid>
        </Grid>
      </React.Fragment>
    );
  }

 export default Book;