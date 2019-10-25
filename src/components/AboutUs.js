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
    minWidth: 650,
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


const AboutUs = () => {
    const classes = useStyles()
    return (    
        <div className={classes.background}>
        <br />
        <Container maxWidth="md" className={classes.cont}>
        <br />
        <a>
            <h1>About Us</h1>
        </a>  
        <p>
            The <b>University Recreation and Well-Being</b> is a department within the Division of Student Affairs.<br /><br />
            <b>Department Vision:</b> A leader in providing excellent and comprehensive experiences that promote
            student success and community well-being.<br /><br />
            <b>Department Mission:</b> The Mission of University Recreation and Well-Being is to 
            offer programs, services and facilities that foster student development, create a connection 
            to Oakland University and motivate our community toward a life-long commitment of well-being.
        </p>
           
        </Container>
        <br />
        </div> 
    )

}

export default AboutUs