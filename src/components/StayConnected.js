import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RecCenterVector from '../static/RecCenter.svg'
import { Button, Container, Table, TableCell, TableHead,
  TableRow, TableBody, Paper } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Wordpress, Twitter} from 'mdi-material-ui'



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
    cont2: {
      backgroundColor: '#fafafa',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    th: {
      backgroundColor: '#8d6e63'
    },
    signupButton: {
      margin: theme.spacing(1)
    }
  }
))

const StayConnected = () => {
    const classes = useStyles()
    return (
        <div className = {classes.background}>
          <br />
            <Container maxWidth="md" className={classes.cont2}>
              <br />
              <h2>Follow University Recreation and Well-Being on Social Media</h2>
              <a>
                <a href="https://www.facebook.com/ourecwell" target="_blank"><Facebook />Facebook</a> |   
                <a href="https://twitter.com/OURecWell" target="_blank"><Twitter />Twitter</a> | 
                <a href="https://www.instagram.com/ourecwell/" target="_blank" title="Instagram Link"><Instagram />Instagram</a> |
                <a href="http://ourecwell.wordpress.com/" target="_blank"><Wordpress />WordPress</a> |
                <a href="http://www.youtube.com/user/OUCampusRecreation" target="_blank"><Youtube />YouTube</a>  
                </a> 
              <hr /> <br />
              <a>
                <b>Thank you</b> for your interest in being on the University Recreation and Well-Being email list!
                You will receive the Recreation and Well-Being Periodic Newsletter, as well as get periodic updates 
                on University Recreation and Well-Being Programs and Service Promotions, and Recreation Center hour changes/closures.  
                <br /><br />
                Get connected today by clicking on the button below for the distribution list by completing the form below.  When you sign up you will 
                also be able to opt-in for the following targeted messages:
                <br />
                <ul>
                  <li>
                    <b>Newsletter</b> - 3-4 times a year, University Recreation and Well-Being will produce a newsletter with information about 
                    the department highlights, programs, services, and announcements.
                  </li>
                  <li>
                    <b>Modified Building Operational Hours</b> - This targeted 
                    audience subset will receive updates on changes to the building operational hours due to planned closures, Holiday Hours, 
                    and Break Hours.  These announcements are generally sent out one week prior to the change in hours.
                  </li>
                  <li>
                    <b>Aquatic Center Swim Meet Closures</b> - This targeted audience subset will receive updates on when the Aquatic Center will be closed due to swim meets. 
                    These announcements are generally sent out one week prior to the swim meet.
                  </li>
                </ul>
                <br />
                <b>You must register an account and be logged in to be on the email list.</b>
                <br />
                <i>You can unsubscribe at any time.</i><br /><br />
                <Button variant="contained" color="primary" className={classes.signupButton}>
                  Subscribe to the Email list
                </Button><br /><br />
              </a>    
            </Container>
          <br />
        </div>   
    )

}

export default StayConnected
