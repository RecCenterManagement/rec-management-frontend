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

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: '5vh',
    height: '100%'
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.light,
    color: 'black'
  },
  media: {
    height: 240
  }
}))

const Settings = () => {
  const classes = useStyles()
  const username = 'admin'
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
                value="admin"
                onChange={console.log('hello')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Last Name"
                className={classes.textField}
                value="admin"
                onChange={console.log('hello')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Email Address"
                className={classes.textField}
                value="admin@localhost"
                onChange={console.log('hello')}
                margin="normal"
                variant="outlined"
              />
            </div>
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
      <Grid item xs={12} sm={12} md={5}>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader} title="Profile Picture" />
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
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
