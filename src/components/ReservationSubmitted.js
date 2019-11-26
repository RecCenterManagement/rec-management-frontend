import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

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
          <br />
        </Container>
        <br />
      </div>
    </>
  )
}

export default ReservationSubmitted
