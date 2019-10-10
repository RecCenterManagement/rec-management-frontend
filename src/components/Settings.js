import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
  Typography,
  TextField,
  CardActions,
  CardHeader,
  Grid
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { saveAccountForm } from '../actions/authentication'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: '5vh',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.light,
    color: 'black'
  },
  media: {
    height: 240,
    backgroundSize: 240
  }
}))

const Settings = props => {
  const classes = useStyles()

  const account = useSelector(state => state.authentication.account)

  const [form_field, set_form_field] = useState({
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    username: account.login
  })

  const { firstName, lastName, email, username } = form_field

  const handleChange = name => event => {
    set_form_field({ ...form_field, [name]: event.target.value })
  }

  const handleSubmit = () => {
    saveAccountForm({
      ...account,
      firstName: firstName,
      lastName: lastName,
      email: email,
      login: username
    })
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={7}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={`${username} profile`}
          />
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                id="outlined-name"
                label="First Name"
                className={classes.textField}
                value={firstName}
                onChange={handleChange('firstName')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Last Name"
                className={classes.textField}
                value={lastName}
                onChange={handleChange('lastName')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Email Address"
                className={classes.textField}
                value={email}
                onChange={handleChange('email')}
                margin="normal"
                variant="outlined"
              />
            </div>
          </CardContent>
          <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="medium" color="secondary" onClick={handleSubmit}>
              Save
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader} title="Profile Picture" />
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={account.imageUrl}
              title="Contemplative Reptile"
            />
          </CardActionArea>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Thinking of changing your look? Click the button below to switch
              to a fancy new profile picture
            </Typography>
          </CardContent>
          <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="small" color="secondary">
              Edit
            </Button>
            <Button size="small" color="secondary">
              Save
            </Button>
            <Button size="small" color="secondary">
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Settings
