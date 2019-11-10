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
              <h2>Follow University Recreation and Well-Being on Social Media</h2>
              <a>
                <a href="https://www.facebook.com/ourecwell" target="_blank"><Facebook className="fontSizeLarge"/>Facebook</a> |   
                <a href="https://twitter.com/OURecWell" target="_blank"><Twitter className="fontSizeLarge" />Twitter</a> | 
                <a href="https://www.instagram.com/ourecwell/" target="_blank" title="Instagram Link"><Instagram className="fontSizeLarge" />Instagram</a> |
                <a href="http://ourecwell.wordpress.com/" target="_blank"><Wordpress className="fontSizeLarge" />WordPress</a> |
                <a href="http://www.youtube.com/user/OUCampusRecreation" target="_blank"><Youtube className="fontSizeLarge" />YouTube</a>  
                </a> 
              <hr /> <br />
              <a>
                Thank you for your interest in signing up for the University Recreation and Well-Being email list!
                You will receive the Recreation and Well-Being Periodic Newsletter, as well as get periodic updates 
                on University Recreation and Well-Being Programs and Service Promotions, and Recreation Center hour changes/closures.  
                <br />
                Get connected today by signing up for the distribution list by completing the form below.  When you sign up you will 
                also be able to opt-in for the following targeted messages:
                <br />
                Newsletter - 3-4 times a year, University Recreation and Well-Being will produce a newsletter with information about 
                the department highlights, programs, services, and announcements. Modified Building Operational Hours - This targeted 
                audience subset will receive updates on changes to the building operational hours due to planned closures, Holiday Hours, 
                and Break Hours.  These announcements are generally sent out one week prior to the change in hours. Aquatic Center Swim 
                Meet Closures - This targeted audience subset will receive updates on when the Aquatic Center will be closed due to swim meets. 
                These announcements are generally sent out one week prior to the swim meet.
              </a>    
            </Container>
          <br />
        </div>   
    )

}

export default StayConnected
