import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getMembership } from '../actions/membership'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, CardHeader, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    cardHeader: {
        backgroundColor: theme.palette.primary.light,
        color: 'black'
    },
    contentSection: {
        margin: '20px'
    }
}))

const membershipTypeToString = type => {
    switch (type) {
        case "STUDENT":
            return "Student"
        case "EMPLOYEE":
            return "Employee"
        case "COMMUNITY":
            return "Community"
        default:
            return "Unkown"
    }
}

const MembershipStatus = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const membership = useSelector(state => state.membership.entity)
    const account = useSelector(state => state.authentication.account)

    const [membershipStatus, setMembershipStatus] = useState("")
    const [membershipType, setMembershipType] = useState("")
    const [expirationDate, setExpirationDate] = useState("")

    useEffect(() => {
        dispatch(getMembership(account.id))
    }, [account])

    useEffect(() => {
        if (membership == null) {
            setMembershipStatus("No current membership")
            setMembershipType("N/A")
            setExpirationDate("N/A")
        } else {
            setMembershipType(membershipTypeToString(membership.membershipType))
            setExpirationDate(membership.expirationDate)
            var expirationDateObj = new Date(expirationDate)
            var currentDate = new Date(Date.now())
            if (currentDate < expirationDateObj) {
                setMembershipStatus("Membership is active")
            } else {
                setMembershipStatus("Membership is expired")
            }
        }
    }, [membership])

    return (
        <Card>
            <CardHeader title={`Your Membership Status`} className={classes.cardHeader} />
            <CardContent>
                <Grid container direction="row" spacing={0}>
                    <Grid item>
                        <section className={classes.contentSection}>
                            <h2>{membershipStatus}</h2>
                            {membership == null &&
                                <Button
                                    size='medium'
                                    color='secondary'
                                    onClick={() => history.push('/membership')}
                                >
                                    Read more
                                </Button>
                            }
                        </section>
                    </Grid>
                    <Grid item>
                        <section className={classes.contentSection}>
                            <h2>Membership type</h2>
                            <p>{membershipType}</p>
                        </section>
                    </Grid>
                    <Grid item>
                        <section className={classes.contentSection}>
                            <h2>Expiration date</h2>
                            <p>{expirationDate}</p>
                        </section>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default MembershipStatus