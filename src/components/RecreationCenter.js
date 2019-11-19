import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RecCenterVector from '../static/RecCenter.svg'
import { Button, Container, Table, TableCell, TableHead,
  TableRow, TableBody, Paper, Fab } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Wordpress, Twitter} from 'mdi-material-ui'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      overflowX: 'auto'
    },
    table: {
      minWidth: 896,
      backgroundColor: '#efebe9'
    },
    background: {
      backgroundColor: '#8e774d'
    },
    cont: {
      backgroundColor: '#fafafa',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    th: {
      backgroundColor: '#8d6e63'
    },
    signupButton: {
      margin: theme.spacing(1)

    },
    textcenter: {
      textAlign: 'center',
    },
    imagecenter: {
      width: '100%',
      marginTop: 'auto'
    }
  }
))

const RecreationCenter = () => {
    const classes = useStyles()
    return(
        <div className={classes.background}>
          <br />
            <Container maxWidth="md" className={classes.cont}>
              <br />
              <img src="https://www.oakland.edu/Assets/Oakland/recwell/graphics/sub-page-banners/REC-13599_Recreation%20Center.jpg" 
                alt="image" className={classes.imagecenter}></img>
              <hr />
              <h2>Amenities</h2>
              <h3>Upper Level</h3>
              <a href="https://www.oakland.edu/Assets/upload/docs/Rec/RECUL.pdf" rel="noopener noreferrer" target="_blank">Upper Level Floor Plan (pdf)</a>
              <br />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <b>Indoor Track</b>
                <ul>
                  <li>Four lanes</li>
                  <li>1/10th of a mile</li>
                </ul>
              </Grid>
              <Grid item xs={6}>
                <b>Studio 919</b>
                <ul>
                  <li>2,840 sq ft room with hard wood flooring</li>
                  <li>Primary Use: Group Exercise</li>
                </ul>
              </Grid>
            </Grid>  

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <b>Cardio Loft </b>
                <ul>
                  <li>Treadmills</li>
                  <li>Treadmill Desks</li>
                  <li>Recumbent Bikes</li>
                  <li>Ellipticals</li>
                </ul>
              </Grid>
              <Grid item xs={6}>
                <b>Social Lounge</b>
                <ul>
                  <li>Table/Chairs</li>
                  <li>Vending machines</li>
                </ul>
              </Grid>
            </Grid>  
            <h3>Lower Level</h3>
            <a href="/Assets/upload/docs/Rec/RECLL.pdf" rel="noopener noreferrer" target="_blank">Lower Level Floor Plan (pdf)</a>
            <br />
            
            </Container>
          <br />
        </div>
    )
}

export default RecreationCenter