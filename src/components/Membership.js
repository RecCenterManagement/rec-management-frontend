import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RecCenterVector from '../static/RecCenter.svg'
import {
  Button,
  Container,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Paper
} from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

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

const Membership = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.background}>
        <br />
        <Container maxWidth="md" className={classes.cont}>
         <br />
          <a>
            <h2>Membership Rates and Information</h2>
          </a>
          <br />
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.th}>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>1 Month</TableCell>
                  <TableCell>4 Month</TableCell>
                  <TableCell>12 Month</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>OU Students</TableCell>
                  <TableCell>
                    Rec Center membership is included in <br />
                    tuition for students enrolled in the current
                    <br />
                    semester.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Students* <br />
                    (enrolled at other colleges or universities)
                  </TableCell>
                  <TableCell>$30</TableCell>
                  <TableCell>$100</TableCell>
                  <TableCell>N/A</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Secondary</TableCell>
                  <TableCell>$35</TableCell>
                  <TableCell>$125</TableCell>
                  <TableCell>N/A</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dependent</TableCell>
                  <TableCell>$25(all)</TableCell>
                  <TableCell>$50</TableCell>
                  <TableCell>N/A</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <i>*The student membership is the primary membership holder.</i>
          <br />
          <b>Secondary:</b> individuals 18 and older who live in the same
          residence as the primary member can be added to their account.
          <br />
          <b>Dependent:</b> Those ages 2-17 can be added to the primary member's
          account.
          <br />
          <br />
          <br />
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.th}>
                <TableRow>
                  <TableCell>Employees</TableCell>
                  <TableCell>1 Month</TableCell>
                  <TableCell>4 Month</TableCell>
                  <TableCell>12 Month</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Non Benefits-Eligible OU Employees*</TableCell>
                  <TableCell>$40</TableCell>
                  <TableCell>$150</TableCell>
                  <TableCell>$360</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Secondary</TableCell>
                  <TableCell>$35</TableCell>
                  <TableCell>$125</TableCell>
                  <TableCell>$330</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dependent</TableCell>
                  <TableCell>$25(all)</TableCell>
                  <TableCell>$50(all)</TableCell>
                  <TableCell>$100(all)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <i>
            *The Non Benefits-Eligible OU Employee membership is the primary
            membership holder.
          </i>
          <br />
          <b>Secondary:</b> individuals 18 and older who live in the same
          residence as the primary member can be added to their account.
          <br />
          <b>Dependent:</b> Those ages 2-17 can be added to the primary member's
          account.
          <br />
          <b>Payroll Deduction</b> — Faculty and staff with 12- or 9-month
          appointments may pay for annual spouse/dependents Rec Center
          membership through payroll deduction, where fees are automatically
          deducted from the employee’s paycheck in accordance with the
          university schedule. A payroll deduction form must be completed and
          signed when submitting a membership application.
          <br />
          <br />
          <br />
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.th}>
                <TableRow>
                  <TableCell>Community</TableCell>
                  <TableCell>1 Month</TableCell>
                  <TableCell>4 Month</TableCell>
                  <TableCell>12 Month</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Community</TableCell>
                  <TableCell>$45</TableCell>
                  <TableCell>$165</TableCell>
                  <TableCell>$440</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Secondary</TableCell>
                  <TableCell>$35</TableCell>
                  <TableCell>$125</TableCell>
                  <TableCell>$330</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dependent</TableCell>
                  <TableCell>$25(all)</TableCell>
                  <TableCell>$50(all)</TableCell>
                  <TableCell>$100(all)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <i>*The community membership is the primary membership holder.</i>
          <br />
          <b>Secondary:</b> individuals 18 and older who live in the same
          residence as the primary member can be added to their account.
          <br />
          <b>Dependent:</b> Those ages 2-17 can be added to the parent/legal
          guardian member's account. account.
          <br />
          <br />
          <br />
          <a>
            <b>Guest Passes</b>
          </a>
          <br />
          <p>
            -Guests of members are $10 per day, and there is a maximum of two
            guests per day that can be sponsored by a single member.
            <br />
            -Guests 16 and older must show state-issued photo ID.
            <br />
            -Guests sign-in with their sponsor member and must be accompanied by
            that member at all times within the facility.
            <br />
          </p>
          <br />
          <a>
            <b> Mini-Passes</b>
          </a>
          <br />
          <p>
            Eligible affiliates, who do not wish to join the Rec Center as a
            full member, may purchase a 10-entry mini-pass for $80. The
            purchaser must be eligible to purchase a full membership.
            Mini-Passes expire one year from purchase date, are for individual
            use only and are non-transferable. Mini-Passes do not include entry
            to GroupX classes but are eligible for single class passes.
          </p>
          <br />
          <a>
            <b>Refund</b>
          </a>
          <br />
          <p>
            Refunds are issued for medical or relocation purposes only. All
            requests must be submitted in writing to the Rec Center Director.
            All key fobs (if applicable) must be surrendered before a refund
            will be made. Refunds take about three to four weeks to process and
            have a $25 processing fee deducted from approved refund amount.
            <br />
            <br />
            <b>
              <i>Memberships are non-transferable.</i>
            </b>
          </p>
          <br />
        </Container>
        <br />
      </div>
    </>
  )
}

export default Membership
