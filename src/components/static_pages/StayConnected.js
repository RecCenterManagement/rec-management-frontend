import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container, Fab } from '@material-ui/core'
import { BrowserRouter as Link } from 'react-router-dom'
import {
  Facebook,
  Instagram,
  Youtube,
  Wordpress,
  Twitter
} from 'mdi-material-ui'

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
    marginRight: 'auto'
  },
  th: {
    backgroundColor: '#8d6e63'
  },
  signupButton: {
    margin: theme.spacing(1)
  },
  center: {
    textAlign: 'center',
    margin: 'auto'
  }
}))

const StayConnected = () => {
  const classes = useStyles()
  return (
    <div className={classes.background}>
      <br />
      <Container maxWidth='md' className={classes.cont2}>
        <br />
        <h2>Follow University Recreation and Well-Being on Social Media</h2>
        <Fab
          color='secondary'
          href='https://www.facebook.com/ourecwell'
          target='_blank'
        >
          {' '}
          <Facebook />{' '}
        </Fab>{' '}
        {'   '}
        <Fab
          color='secondary'
          href='https://twitter.com/OURecWell'
          target='_blank'
        >
          <Twitter />
        </Fab>{' '}
        {'   '}
        <Fab
          color='secondary'
          href='https://www.instagram.com/ourecwell/'
          target='_blank'
        >
          <Instagram />
        </Fab>{' '}
        {'   '}
        <Fab
          color='secondary'
          href='http://ourecwell.wordpress.com/'
          target='_blank'
        >
          <Wordpress />
        </Fab>{' '}
        {'   '}
        <Fab
          color='secondary'
          href='http://www.youtube.com/user/OUCampusRecreation'
          target='_blank'
        >
          <Youtube />
        </Fab>{' '}
        {'   '}
        <hr /> <br />
        <a>
          <b>Thank you</b> for your interest in being on the University
          Recreation and Well-Being email list! You will receive the Recreation
          and Well-Being Periodic Newsletter, as well as get periodic updates on
          University Recreation and Well-Being Programs and Service Promotions,
          and Recreation Center hour changes/closures.
          <br />
          <Container maxWidth='md' className={classes.cont2}>
            <br />
            <h2 className={classes.center}>
              Follow University Recreation and Well-Being on Social Media
            </h2>
            <hr />
            <a>
              Click the buttons below to follow the Rec Center on social media:
              <br />
              <br />
              <Fab
                color='primary'
                href='https://www.facebook.com/ourecwell'
                target='_blank'
              >
                {' '}
                <Facebook />{' '}
              </Fab>{' '}
              {'   '}
              <Fab
                color='primary'
                href='https://twitter.com/OURecWell'
                target='_blank'
              >
                <Twitter />
              </Fab>{' '}
              {'   '}
              <Fab
                color='primary'
                href='https://www.instagram.com/ourecwell/'
                target='_blank'
              >
                <Instagram />
              </Fab>{' '}
              {'   '}
              <Fab
                color='primary'
                href='http://ourecwell.wordpress.com/'
                target='_blank'
              >
                <Wordpress />
              </Fab>{' '}
              {'   '}
              <Fab
                color='primary'
                href='http://www.youtube.com/user/OUCampusRecreation'
                target='_blank'
              >
                <Youtube />
              </Fab>{' '}
              {'   '}
            </a>
            <br />
            <br />
            <a>
              <b>Thank you</b> for your interest in being on the University
              Recreation and Well-Being email list! You will receive the
              Recreation and Well-Being Periodic Newsletter, as well as get
              periodic updates on University Recreation and Well-Being Programs
              and Service Promotions, and Recreation Center hour
              changes/closures.
              <br />
              <br />
              Get connected today by clicking on the button below to register an
              account. By having an account, you will also be able to receive
              the following targeted messages:
              <br />
              <ul>
                <li>
                  <b>Newsletter</b> - 3-4 times a year, University Recreation
                  and Well-Being will produce a newsletter with information
                  about the department highlights, programs, services, and
                  announcements.
                </li>
                <li>
                  <b>Modified Building Operational Hours</b> - This targeted
                  audience subset will receive updates on changes to the
                  building operational hours due to planned closures, Holiday
                  Hours, and Break Hours. These announcements are generally sent
                  out one week prior to the change in hours.
                </li>
                <li>
                  <b>Aquatic Center Swim Meet Closures</b> - This targeted
                  audience subset will receive updates on when the Aquatic
                  Center will be closed due to swim meets. These announcements
                  are generally sent out one week prior to the swim meet.
                </li>
              </ul>
              <br />
              <b>
                You must register an account to be on the email list. By
                registering, you'll be automatically added to the list.
              </b>
              <br />
              <i>You can unsubscribe at any time.</i>
              <br />
              <br />
              <Button
                variant='contained'
                color='primary'
                className={classes.signupButton}
                component={Link}
                to='/register'
              >
                Click Here to Register
              </Button>
              <br />
              <br />
            </a>
          </Container>
          <br />
          Get connected today by clicking on the button below for the
          distribution list by completing the form below. When you sign up you
          will also be able to opt-in for the following targeted messages:
          <br />
          <ul>
            <li>
              <b>Newsletter</b> - 3-4 times a year, University Recreation and
              Well-Being will produce a newsletter with information about the
              department highlights, programs, services, and announcements.
            </li>
            <li>
              <b>Modified Building Operational Hours</b> - This targeted
              audience subset will receive updates on changes to the building
              operational hours due to planned closures, Holiday Hours, and
              Break Hours. These announcements are generally sent out one week
              prior to the change in hours.
            </li>
            <li>
              <b>Aquatic Center Swim Meet Closures</b> - This targeted audience
              subset will receive updates on when the Aquatic Center will be
              closed due to swim meets. These announcements are generally sent
              out one week prior to the swim meet.
            </li>
          </ul>
          <br />
          <b>
            You must register an account and be logged in to be on the email
            list.
          </b>
          <br />
          <i>You can unsubscribe at any time.</i>
          <br />
          <br />
          <Button
            variant='contained'
            color='primary'
            className={classes.signupButton}
            component={Link}
            to='/register'
          >
            Click Here to Register
          </Button>
          <br />
          <br />
        </a>
      </Container>
      <br />
    </div>
  )
}

export default StayConnected
