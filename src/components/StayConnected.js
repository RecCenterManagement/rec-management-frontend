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
      backgroundColor: '#343434'
    },
    cont: {
      backgroundColor: '#fafafa'
    },
    cont2: {
      backgroundColor: '#fafafa',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    th: {
      backgroundColor: '#8d6e63'
    }
  }
)

const StayConnected = () => {
    const classes = useStyles()
    return (
        <div className = {classes.background}>
          <br />
            <Container maxWidth="md" className={classes.cont2}>
              <img src="https://www.oakland.edu/Assets/Oakland/recwell/graphics/sub-page-banners/REC-13599_Stay%20Connected.jpg" 
              title="Stay Connected" alt="Stay Connected" width="728" height="200"></img>
            </Container>
            <br />
            <Container maxWidth="md" className={classes.cont2}>
              
            </Container>
          <br />
        </div>   
    )

}

export default StayConnected
