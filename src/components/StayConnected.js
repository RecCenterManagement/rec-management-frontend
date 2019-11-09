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
    th: {
      backgroundColor: '#8d6e63'
    }
  }
)

const StayConnected = () => {
    const classes = useStyles()
    return (
        <div className = {classes.background}>

        </div>   
    )

}

export default StayConnected
