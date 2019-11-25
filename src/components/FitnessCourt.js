import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RecCenterVector from '../static/RecCenter.svg'
import { Button, Container, Table, TableCell, TableHead,
  TableRow, TableBody, Paper, Fab } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Wordpress, Twitter} from 'mdi-material-ui'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 896,
    backgroundColor: '#efebe9',
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  imagecenter: {
    width: '100%',
    marginTop: 'auto'
  }
}
))

const FitnessCourt = () => {
    const classes = useStyles()
    return(
        <div className={classes.background}>
          <br />
          <Container maxWidth="md" className={classes.cont}>
              <br />
              <img src="https://oakland.edu/Assets/Oakland/recwell/graphics/sub-page-banners/CAM-21058_WebBanner.jpg" 
                alt="image" className={classes.imagecenter}></img>
                <hr />
                <a>
                Thanks to an innovative partnership with Priority Health, the new Priority Health Fitness Court is a free, 
                state-of-the-art, outdoor circuit training facility, available to the public and suitable for ages 14+, and appropriate for all fitness levels!
                </a>
                <h1>Facility</h1>
                <p>
                The Priority Health Fitness Court® is an open-air bodyweight circuit training gym, featuring all-level workouts that can be completed in as little as 7 minutes per circuit.
                By pairing the Fitness Court with its free mobile app, students can take classes and learn new workout routines — all in the fresh outdoors! 
                For early access to guided workouts, to get involved with on-campus training, or to learn how to qualify for the Fitness Court Challenge, download the free Fitness Court App on iOS or Android using the link below: 
                </p>
                <a href="https://nationalfitnesscampaign.com/app">https://nationalfitnesscampaign.com/app</a>
                <br />
                <p>
                As part of a nationwide movement launched by NFC to get people excited about health and wellness, twenty select universities were invited to join the Campaign in 2019.
                OU was selected based on its continued dedication to wellness resources and programming for the betterment of its community.
                <br />
                <br />
                “The investment in this new facility provides a space that will contribute to our President’s initiative to become the ‘Healthiest Campus For Michigan’, as well as consistent with positioning Oakland as the University of Choice”,
                 says Greg Jordan – Director of Recreation and University Well-Being.
                </p>

                <h1>National Fitness Campaign</h1>
                <p>
                ABOUT NFC: National Fitness Campaign, a social enterprise founded in 1979, partners with local communities and nationwide sponsors to promote healthy living. 
                The Fitness Court® ecosystem combines digital tools, evolving challenges and best in class equipment to create the world’s best outdoor gym experience. 
                With original locations in 4,000 cities worldwide, a flagship installation in San Francisco and 100 new locations across the United States, National Fitness Campaign is committed to making world class fitness free for everyone.
                </p>

                <h1>Launch Party</h1>
                <p>
                To celebrate the new Fitness Court, Rec Well will host an exciting ribbon cutting and launch party. This health and wellness event will include swag giveaways, snacks from local vendors, pumpin' music and... "The Pulse" – a FREE high intensity 15 minute group workout!
                <br /><br />
                Come ready to try out the new equipment. Proper workout attire is recommended. Attendance is free.
                </p>
                <br />
          </Container>
          <br />
        </div>
    )
}

export default FitnessCourt