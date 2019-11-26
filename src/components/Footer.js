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
    textAlign: 'left',
    padding: '10%',
  },
  strong_text: {
  color: '#8e774d',
  textDecoration: 'underline'
  }
}))

const Footer = props => {
  const classes = useStyles()

  return (
    <footer
      style={{ backgroundColor: '#212121', color: 'white', paddingTop: 24,  lineHeight: 2.0, }}
    >
      <Grid container>
        <Grid item xs={12} sm={3} med={3}>
          <div className={classes.footer_column}>
            <strong className={classes.strong_text} >Recreation Center</strong>
            <p>
              The Mission of University Recreation and Well-Being is to offer
              programs, services and facilities that foster student development,
              create a connection to Oakland University and motivate our
              community toward a life-long commitment of well-being.
            </p>
            <strong className={classes.strong_text} >Contact</strong>
            <p>
              <i className="fa fa-home mr-3" /> Rochester, MI 48309-4482, US <br />
              <i className="fa fa-envelope mr-3" /> rec@oakland.edu <br />
              <i className="fa fa-phone mr-3" /> (248) 370-4REC (4732) <br />
              <i className="fa fa-print mr-3" /> (248) 370-4889 <br />
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={3} med={3}>
          <div className={classes.footer_column}>
            <strong className={classes.strong_text} >Academics</strong>
            <p>
              <a className={classes.footer_link} href="https://www.oakland.edu/cas" target='blank' >
                Arts and Sciences  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/business" target='blank' >
                Business Administration  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/sehs" target='blank' >
                Education and Human Services  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/secs" target='blank' >
                Engineering and Computer Science  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/shs" target='blank'>
                Health Sciences  <br />
              </a>
                 <a className={classes.footer_link} href="https://www.oakland.edu/nursing" target='blank'>
                Nursing <br />
              </a>
               <a className={classes.footer_link} href="https://www.oakland.edu/medicine" target='blank'>
                OUWB School of Medicine <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/grad" target='blank'>
                Graduate School <br />
              </a>
               <a className={classes.footer_link} href="https://www.oakland.edu/hc" target='blank'>
                Honors College <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/bis" target='blank'>
                Integrative Studies <br />
              </a>
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={3} med={3}>
          <div className={classes.footer_column}>
            <strong className={classes.strong_text} >Info For</strong>
            <p>
              <a className={classes.footer_link} href="https://www.oakland.edu/alumni" target='blank'>
                Alumni  <br />
              </a>
             <a className={classes.footer_link} href="https://www.oakland.edu/students" target='blank'>
                Current Students  <br />
              </a>
                    <a className={classes.footer_link} href="https://www.oakland.edu/giving" target='blank'>
                Donors  <br />
              </a>
                       <a className={classes.footer_link} href="https://www.oakland.edu/faculty-and-staff" target='blank'>
                Faculty and Staff  <br />
              </a>
                       <a className={classes.footer_link} href="https://www.oakland.edu/grad" target='blank'>
                Future Graduate Students  <br />
              </a>
                      <a className={classes.footer_link} href="https://www.oakland.edu/futurestudents" target='blank'>
                Future Undergraduate Students  <br />
              </a>
                 <a className={classes.footer_link} href="https://www.oakland.edu/about/ou-mission-and-vision/" target='blank'>
                Mission and Vision  <br />
              </a>
                    <a className={classes.footer_link} href="https://www.oakland.edu/president/strategic-planning/" target='blank'>
                Strategic Plan  <br />
              </a>
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={3} med={3}>
          <div className={classes.footer_column}>
            <strong className={classes.strong_text} >Quick Links</strong>
            <p>
              <a className={classes.footer_link} href="https://www.oakland.edu/about" target='blank'>
                About OU  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/community" target='blank'>
                Community Engagement  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/directory" target='blank'>
                Directory  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/diversity/" target='blank'>
                Diversity, Equity, and Inclusion  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/eri" target='blank'>
                Eye Research Institute  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/registrar/important-dates/" target='blank'>
                Important Dates  <br />
              </a>
              <a className={classes.footer_link} href="https://jobs.oakland.edu/" target='blank'>
                Jobs at OU  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/macombouinc" target='blank'>
                Macomb-OU Incubator  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/macomb/" target='blank'>
                Macomb Programs  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/ouinc" target='blank'>
                OU INC  <br />
              </a>
              <a className={classes.footer_link} href="https://www.oakland.edu/universityoffices" target='blank'>
                University Offices  <br />
              </a>
            </p>
          </div>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
