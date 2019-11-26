import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Table, TableCell, TableHead,
  TableRow, TableBody, Paper } from '@material-ui/core'

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
    backgroundColor: '#fafafa',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  th: {
    backgroundColor: '#8d6e63'
  },
  textcenter: {
      textAlign: 'center',
  },
  imagecenter: {
    width: '100%',
    marginTop: 'auto'
  }
})

const AquaticCenter = () => {
    const classes = useStyles()
    return ( 
        <div className={classes.background}>
            <br />
            <Container maxWidth="md" className={classes.cont}>
              <br />
            <img src="https://www.oakland.edu/Assets/Oakland/recwell/graphics/sub-page-banners/REC-13599_Aquatic%20Center.jpg" 
                alt="image" className={classes.imagecenter}></img>
                <hr />
                <h2>About the Aquatic Center</h2>
                The Oakland University Aquatic Center houses a 50-meter stretch pool with spectator seating for 1,000 and deck space for 670 participants. 
                Outside of recreational use by members, the Aquatic Center is the home of the Oakland University NCAA Division 1 swim team and hosts many 
                state and regional meets.
                <br />
                <h2>Hours of the Aquatic Center</h2>

                <Paper className={classes.root}>
              <Table className={classes.table} aria-label="spanning table">
              <TableHead>
                    <TableRow>
                      
                      <TableCell><b>Monday - Thursday</b></TableCell>
                      <TableCell><b>Friday</b></TableCell>
                      <TableCell><b>Saturday</b></TableCell>
                      <TableCell><b>Sunday</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>5:30am - 3pm / 5:30pm - 10pm</TableCell>
                    <TableCell>5:30am - 3pm / 5:30pm - 8pm</TableCell>
                    <TableCell>9am - 7:30pm</TableCell>
                    <TableCell>10am - 9pm</TableCell>
                  </TableRow>
                </TableBody>
              </Table> 
              </Paper>
              <br />
            </Container>
            <br />
        </div>
    )
}

export default AquaticCenter