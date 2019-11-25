import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RecCenterVector from '../static/RecCenter.svg'
import { Button, Container, Table, TableCell, TableHead,
  TableRow, TableBody, Paper, Fab } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Wordpress, Twitter} from 'mdi-material-ui'
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
              <h1>Amenities</h1>
              <h3>Upper Level</h3>
              <a href="https://www.oakland.edu/Assets/upload/docs/Rec/RECUL.pdf" rel="noopener noreferrer" target="_blank">Upper Level Floor Plan (pdf)</a>
              <br /><br />
            <Grid container spacing={4}>
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

            <Grid container spacing={4}>
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
            <br /><br />
            <Grid container spacing={4}>

            <Grid item xs={6}>
                <b>3-Court Gym</b>
                <ul>
                  <li>19,760 sq ft</li>
                  <li>Comfortably fits 600 people</li>
                  <li>No food allowed</li>
                  <li>A/V: None</li>
                  <li>Setups: Basketball, volleyball, badminton</li>
                </ul>
            </Grid>
              
              <Grid item xs={6}>
                <b>Fitness Annex A*</b>
                <ul>
                  <li>Hoist Fitness MotionCage</li>
                  <li>Cable Cross Over Machines</li>
                  <li>Medicine Ball Wall</li>
                  <li>Stretching Mats</li>
                  <li>2 Water Rowers</li>
                  <li>Punching Bag</li>
                  <li>Functional Training Space</li>
                </ul>
              </Grid>
            </Grid>  
            
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <b>Fitness Annex B*</b>
                <ul>
                  <li>Spin Bikes</li>
                  <li>Functional Training Space</li>
                  <li>Free Weights</li>
                </ul>
              </Grid>
              <Grid item xs={6}>
                <b>Fitness Center</b>
                <ul>
                  <li>Cardio Equipment</li>
                  <li>Strength Equipment</li>
                </ul>
              </Grid>
            </Grid>  

            <Grid container spacing={4}>
              <Grid item xs={6}>
                <b>Activity Center</b>
                <ul>
                  <li>3,840 sq ft</li>
                  <li>No food allowed</li>
                  <li>A/V: None</li>
                  <li>Setups: Basketball</li>
                </ul>
              </Grid>
              <Grid item xs={6}>
                <b>David E. Herman Classroom</b>
                <ul>
                  <li>759 sq ft</li>
                  <li>Comfortably fits 30 people</li>
                  <li>A/V: Ceiling mounted LCD projector, level II classroom technology, computer, DVD/VCR, laptop connections, video camera connections</li>
                </ul>
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={6}>
                <b>Pioneer Classroom</b>
                <ul>
                  <li>Comfortable fits 30 people</li>
                  <li>A/V: TV, DVD/VCR</li>
                </ul>
              </Grid>
              <Grid item xs={6}>
                <b>Studio 897</b>
                <ul>
                  <li>2,107 sq ft</li>
                  <li>Primary use: Group Exercise</li>
                </ul>
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={6}>
                <b>Racquetball Courts (2)</b>
                <ul>
                  <li>Additional setups: Walleyball</li>
                </ul>
              </Grid>
            </Grid>
            <br />
            <a>*Fitness Annex A and B will be closed to general usage during schedule Group Ex Classes or Group Personal Training Classes</a>
            <br />
            <br />

          <h1>Lockers</h1>
          <h3>Day Use Lockers</h3>
          All Day Use Lockers are available free of charge. Patrons may bring their own lock or rent a lock from the Service Desk for $0.50 per use.
          Personal and rented day use locks must be removed from Day Use Lockers by posted closing time.
          Locks that are not removed prior to close will be cut and locker contents will be bagged and stored at the owner's expense ($5.00 locker content storage fee).
          <br />
          <br />
          Lockers available for day use are located:
          <br />
          <ul>
            <li>Men's Locker Room</li>
            <li>Women's Locker Room</li>
            <li>Across from Service Desk</li>
            <li>Across from the Activity Center</li>
            <li>Near the Track Entrance</li>
            <li>Outside Studio 919</li>
          </ul>

          <h3>Rental Lockers</h3>
          <p>
            A limited number of lockers are available for rent in varying durations. Locker rentals require a valid membership and will expire on the same day as the membership. 
            A lock is included in all locker rentals.
          </p>
        
          <Paper className={classes.root}>
              <table className={classes.table} aria-label="spanning table">
              <TableHead>
                    <TableRow>
                      <TableCell><b>Prices</b></TableCell>
                      <TableCell><b>1/2 Height Lockers</b></TableCell>
                      <TableCell><b>Full Height lockers</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1 Month</TableCell>
                    <TableCell>$5</TableCell>
                    <TableCell>$10</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4 Months / Semester</TableCell>
                    <TableCell>$15</TableCell>
                    <TableCell>$30</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>6 Month</TableCell>
                    <TableCell>$23</TableCell>
                    <TableCell>$46</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Annual</TableCell>
                    <TableCell>$40</TableCell>
                    <TableCell>$80</TableCell>
                  </TableRow>
                </TableBody>
            </table> 
          </Paper>
        <h3>Lost and Found</h3>
        <p>
        University Recreation & Well-Being strongly recommends that individuals not bring valuable items to the facility when working out. 
        All found items will be held at the Service Desk until the end of the following calendar month. 
        Valuable items, such as wallets, phones and jewelry, will be immediately turned over to the OU Police Department.
        </p>
        <br />

        <h1>Equipment Check Out and Rental</h1>
        <p>
          Rec Center Members can check out equipment for a variety of activities at the Service Desk in the lower level of the Recreation Center. 
          A valid Rec Center membership card is required to check out equipment.
          <br />
          <ul>
            <li>Equipment is due back at the conclusion of use or at building close, whichever comes first.</li>
            <li>Individuals checking out equipment are responsible for the proper treatment and timely return of the equipment issued.&nbsp;</li>
            <li>Returning equipment damaged may result in a replacement fee being assessed to the individual.&nbsp;</li>
            <li>Failure to return equipment in a timely or at all may result in a late or a replacement fee being assessed to the individual (please see fee notes below).</li>
          </ul>
        </p>

    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography className={classes.heading}>Equipment Available for No-Fee Checkout</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <ul>
              <li>Basketballs (men's and women's)</li>
              <li>Volleyballs</li>
              <li>Jump Ropes</li>
              <li>Table Tennis Paddles</li>
              <li>Soccer Balls&nbsp;</li>
              <li>Wallyballs</li>
              <li>Weight Belts</li>
              <li>Dip Belt</li>
              <li>Stability Discs</li>
              <li>Sliding Discs</li>
              <li>Foam Rollers 
                <ul>
                  <li>Short</li>
                  <li>Long</li>
                </ul>
              </li>
              <li>Kick Boards</li>
              <li>Resistance Bands</li>
              <li>Boxing Gloves</li>
              <li>TRX Sets</li>
              <li>Aqua Jogging Belts 
                <ul>
                  <li>S/M/L/XL</li>
                </ul>
              </li>
              <li>Yoga Mats (class participants only)</li>
              <li>Bosu Balls</li>
              <li>Hand Paddles</li>
            </ul>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Equipment Available for a Nominal Fee Check Out</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <ul>
              <li>Day Use Combination Lock ($0.50)</li>
              <li>Badminton Racket ($0.50)</li>
              <li>Racquetball Racket ($0.50)</li>
              <li>Aqua Fitness Barbells ($0.50)</li>
            </ul>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Fee Notes</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <b>Late Returns</b>
            <br />
            Equipment not returned by posting closing time and is:
            <ol>
              <li>Found in the building by staff or</li>
              <li>Returned at a later date</li>
            </ol>
            Will be communicated with and documented for the three strikes procedure.  
            Individuals who fail to return equipment in a timely manner three times in a given semester will have their ability to check out 
            equipment suspended for the rest of that semester.
            <br /><br />
            <b> Damage/Not Returned</b>
             <br />
             Will be assessed a replacement fee.  
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
    </div>

        <br />
      </Container>
      <br />
    </div>
  )
}

export default RecreationCenter