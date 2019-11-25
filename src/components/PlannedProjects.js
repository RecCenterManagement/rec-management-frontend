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

const PlannedProjects = () => {
    const classes = useStyles()
    return(
      <div className={classes.background}>
        <br />
          <Container maxWidth="md" className={classes.cont}>
            <br />
            <img src="https://oakland.edu/Assets/upload/MediaGallery/Albums/1795/items/REC7793RecCenter8.png" 
            alt="image" className={classes.imagecenter}></img>
            <hr />
            <p className={classes.textcenter}>There are no planned projects currently.</p>
            <br />
          </Container>
        <br />
      </div>
    )
}

export default PlannedProjects