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
            

        </div>



    )



  }

  export default FacilityHoursAndSchedule