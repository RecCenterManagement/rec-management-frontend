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
    backgroundColor: '#fafafa',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  th: {
    backgroundColor: '#8d6e63'
  },
  textcenter: {
      textAlign: 'center',
  }
})

const AquaticCenter = () => {
    const classes = useStyles()
    return ( 
        <div className={classes.background}>
            <br />
            <Container maxWidth="md" className={classes.cont}>
                
                <h1 className={classes.textcenter}>Aquatic Center</h1>
                <hr />
                <br />
            </Container>
            <br />
        </div>
    )
}

export default AquaticCenter