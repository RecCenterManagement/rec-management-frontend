import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RecCenterVector from '../static/RecCenter.svg'
import { Button, Container, Table, TableCell, TableHead,
  TableRow, TableBody, Paper } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Wordpress, Twitter} from 'mdi-material-ui'



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
              alt="Stay Connected" width="728" height="200"></img>
              <h2>Follow University Recreation and Well-Being on Social Media</h2>
              <br />
              <Facebook className="fontSizeLarge"/>
              <Twitter />
              <Instagram />
              <Wordpress />
              <Youtube />       
            </Container>
          <br />
        </div>   
    )

}

export default StayConnected
