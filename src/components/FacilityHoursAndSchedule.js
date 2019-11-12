import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RecCenterVector from '../static/RecCenter.svg'
import { Button, Container, Table, TableCell, TableHead,
  TableRow, TableBody, Paper } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const useStyles = makeStyles({
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
      backgroundColor: '#fafafa'
    },
    th: {
      backgroundColor: '#8d6e63'
    }
  })

  const FacilityHoursAndSchedule = () => {
    const classes = useStyles()
    return (
        <div className = {classes.background}>
            <br />
            <Container maxWidth="md" className={classes.cont}>
              <br />
              <a>
                <h1>Facility Hours and Schedule</h1>
              </a>
              <p>
                Please note that the hours may change for any reason at any time.
              </p>
              <Paper className={classes.root}>
              <table className={classes.table} aria-label="spanning table">
              <TableHead>
                    <TableRow>
                      <TableCell><b>Facility</b></TableCell>
                      <TableCell><b>Monday - Thursday</b></TableCell>
                      <TableCell><b>Friday</b></TableCell>
                      <TableCell><b>Saturday</b></TableCell>
                      <TableCell><b>Sunday</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Recreation Center</TableCell>
                    <TableCell>5:30am - 11pm</TableCell>
                    <TableCell>5:30am - 9pm</TableCell>
                    <TableCell>8am - 8pm</TableCell>
                    <TableCell>10am -10pm</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Aquatic Center</TableCell>
                    <TableCell>5:30am - 3pm/5:30pm - 10pm</TableCell>
                    <TableCell>5:30am - 3pm/5:30pm - 8pm</TableCell>
                    <TableCell>9am - 7:30pm</TableCell>
                    <TableCell>10am - 9pm</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hillcrest Fitness Center</TableCell>
                    <TableCell>11:30am - 8pm</TableCell>
                    <TableCell>CLOSED</TableCell>
                    <TableCell>CLOSED</TableCell>
                    <TableCell>CLOSED</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rec Superfield*</TableCell>
                    <TableCell>Dawn - 10pm</TableCell>
                    <TableCell>Dawn - 8pm</TableCell>
                    <TableCell>Dawn - 8pm</TableCell>
                    <TableCell>Dawn - 10pm</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tennis/Track*</TableCell>
                    <TableCell>9am - 10pm</TableCell>
                    <TableCell>9am - 8pm</TableCell>
                    <TableCell>8am - 8pm</TableCell>
                    <TableCell>10am - 10pm</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Disc Golf**</TableCell>
                    <TableCell>Dawn - Dusk</TableCell>
                    <TableCell>Dawn - Dusk</TableCell>
                    <TableCell>Dawn - Dusk</TableCell>
                    <TableCell>Dawn - Dusk</TableCell>
                  </TableRow>
                </TableBody>
              </table> 
              </Paper>
              <a><i>
                  *If you are on the outdoor facilities during off-hours, police may be called and you will
                  be subjected to arrest.<br />
                  **There are basically no time limits on these facilities.                
              </i></a>
              <br />
              <br />
            </Container>
            <br />
        </div>
    )
  }

  export default FacilityHoursAndSchedule
