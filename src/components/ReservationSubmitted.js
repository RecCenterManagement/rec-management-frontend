import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
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
  },
  linkButtons: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-around'
  }
}))

const ReservationSubmitted = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.background}>
        <br />
        <Container maxWidth="md" className={classes.cont}>
          <h2>Your reservation has been submitted.</h2>
          <p>
            Please wait until an administrator approves your request.
          </p>
          <div className={classes.linkButtons}>
            <Button variant='contained' color='secondary' component={Link} to="/">Home</Button>
            <Button variant='contained' color='secondary' component={Link} to="/my-reservations">My Reservations</Button>
            <Button variant='contained' color='secondary' component={Link} to="/create-reservation">Create Reservation</Button>
          </div>
          <br />
        </Container>
        <br />
      </div>
    </>
  )
}

export default ReservationSubmitted
