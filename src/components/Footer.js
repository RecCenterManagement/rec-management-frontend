import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  footer_link: {
    color: 'white',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'none'
    }
  },
  footer_column: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  }
}))

const Footer = props => {
  const classes = useStyles()

  return (
    <footer
      style={{ backgroundColor: '#212121', color: 'white', paddingTop: 24 }}
    >
      <Grid container>
        <Grid item xs={12} sm={3} med={3}>
          <div className={classes.footer_column}>
            <strong>Recreation Center</strong>
            <hr />
            <p>
              The Mission of University Recreation and Well-Being is to offer
              programs, services and facilities that foster student development,
              create a connection to Oakland University and motivate our
              community toward a life-long commitment of well-being.
            </p>
            <strong>Contact</strong>
            <hr />
            <p>
              <i className="fa fa-home mr-3" /> Rochester, MI 48309-4482, US
            </p>
            <p>
              <i className="fa fa-envelope mr-3" /> rec@oakland.edu
            </p>
            <p>
              <i className="fa fa-phone mr-3" /> (248) 370-4REC (4732)
            </p>
            <p>
              <i className="fa fa-print mr-3" /> (248) 370-4889
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={3} med={3}>
          <div className={classes.footer_column}>
            <strong>Academics</strong>
            <hr />
            <p>
              <a className={classes.footer_link} href="#!">
                Arts and Sciences
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Business Administration
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Education and Human Services
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Engineering and Computer Science
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Health Sciences
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Nursing
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                OUWB School of Medicine
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Graduate School
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Honors College
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Integrative Studies
              </a>
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={3} med={3}>
          <div className={classes.footer_column}>
            <strong>Info For</strong>
            <hr />
            <p>
              <a className={classes.footer_link} href="#!">
                Alumni
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Current Students
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Donors
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Faculty and Staff
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Future Graduate Students
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Future Undergraduate Students
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Mission and Vision
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Strategic Plan
              </a>
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={3} med={3}>
          <div className={classes.footer_column}>
            <strong>Quick Links</strong>
            <hr />
            <p>
              <a className={classes.footer_link} href="#!">
                About OU
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Community Engagement
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Directory
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Diversity, Equity, and Inclusion
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Eye Research Institute
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Important Dates
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Jobs at OU
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Macomb-OU Incubator
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Macomb Programs
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                OU INC
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                University Offices
              </a>
            </p>
            <p>
              <a className={classes.footer_link} href="#!">
                Webmaster
              </a>
            </p>
          </div>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
