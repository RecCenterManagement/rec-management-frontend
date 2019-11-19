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

    },
    center: {
      textAlign: 'center',
      margin: 'auto',
    }
  }
))

const RecreationCenter = () => {
    const classes = useStyles()
    return(
        <div></div>
    )
}

export default RecreationCenter