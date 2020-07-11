import React from 'react';
import './home.css';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4),
        width:'100%',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
function Home() {
    const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    
  };
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div >

           




            <Grid
                container
                
                justify="flex-end"
                alignItems="flex-end"
            >
                 
                <Button  onClick={handleChange} variant="contained" color="primary">
              <MenuIcon fontSize="large"/>
              </Button>  
            
            </Grid>

        <div class="grad">
        <Fade in={checked}>
            <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="flex-end"
                spacing={6}
                >
                <Grid item xs={6}>
                    <Paper  elevation={3}  className={classes.paper}> pehla </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper   elevation={3}  className={classes.paper}> doosra</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper   elevation={3} className={classes.paper}> teesra </Paper>
                </Grid>
            </Grid>
            </Fade>
        </div>


        </div >
    )

}



export default Home;