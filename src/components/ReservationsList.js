import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import {
  AppBar,
  Tab,
  Tabs,
  ButtonGroup,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Grid
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  get_reservations_by_user_id,
  delete_reservation
} from '../actions/reservations'
import ReservationsDialog from './ReservationForm.js'

function TabPanel(props) {
  const { children, value, index, name, ...other } = props
  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== name}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  border: {
    borderLeft: '0.12em solid #0074b7',
    paddingLeft: '0.5em',
    marginLeft: '0.75em'
  }
}))

export default function ReservationsList() {
  const classes = useStyles()
  const [value, setValue] = React.useState('APPROVED')
  const accountID = useSelector(state => state.authentication.account.id)
  const reservations = useSelector(state => state.reservations.entities)
  const [date, setDate] = useState(new Date())
  const [filteredReservations, setFilteredReservations] = useState([])
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [openDelte, setOpenDelte] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState({})

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleCloseDelte = () => {
    dispatch(get_reservations_by_user_id(accountID))
    setOpenDelte(false)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = (type, entity) => {
    if (type === 'delete') {
      setOpenDelte(true)
    } else if (type === 'edit') {
      setOpen(true)
    } else {
      setOpen(true)
    }
    setSelectedEntity(entity)
  }
  useEffect(() => {
    if (accountID) {
      dispatch(get_reservations_by_user_id(accountID))
    }
  }, [dispatch, accountID])

  const handleFilterReservations = r => {
    if (r && r.length !== 0)
      setFilteredReservations(r.filter(res => res.status === value))
  }
  useEffect(() => {
    handleFilterReservations(reservations)
  }, [dispatch, reservations, value])
  console.log('list', reservations)
  return (
    <>
      <div className={classes.root}>
        <AppBar position='static' color='primary'>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='Reservations category tabs'
            centered
          >
            <Tab value='APPROVED' label='Approved' />
            <Tab value='PENDING' label='Pending' />
            <Tab value='DENIED' label='Denied' />
          </Tabs>
        </AppBar>
        {reservations &&
        reservations.filter(res => res.status === value).length !== 0 ? (
          ['APPROVED', 'PENDING', 'DENIED'].map((panel, index) => {
            return (
              <TabPanel value={value} name={panel} index={index}>
                {filteredReservations.map(row => (
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      key={row.name}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography variant='h5'>{row.event}</Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                      <Grid
                        container
                        direction='column'
                        justify='flex-start'
                        spacing={2}
                      >
                        <Grid
                          item
                          container
                          direction='row'
                          justify='flex-start'
                          alignItems='center'
                          spacing={1}
                        >
                          <Grid item>
                            <Typography variant='h6'>
                              Estimated participants:
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant='body2'>
                              {row.estimatedParticipants}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          direction='row'
                          justify='flex-start'
                          alignItems='center'
                          spacing={1}
                        >
                          <Grid item>
                            <Typography variant='h6'>Time:</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>
                              {new Date(row.startTime).toDateString()} -
                              {new Date(row.endTime).toDateString()}
                            </Typography>
                          </Grid>
                        </Grid>

                        {row.equipmentReservations &&
                          row.equipmentReservations.length !== 0 && (
                            <Grid item>
                              <Typography gutterBottom variant='h6'>
                                Equipment Reservations:
                              </Typography>
                              <Grid
                                container
                                direction='column'
                                justify='flex-start'
                              >
                                {row.equipmentReservations.map(equipment => {
                                  console.log('equipment', equipment)

                                  return (
                                    <Grid item className={classes.border}>
                                      <Typography variant='h6'>
                                        {equipment.equipment.name}
                                      </Typography>
                                    </Grid>
                                  )
                                })}
                              </Grid>
                            </Grid>
                          )}
                        {row.facilities && row.facilities.length !== 0 && (
                          <Grid item>
                            <Typography gutterBottom variant='h6'>
                              Facilities:
                            </Typography>
                            <Grid
                              container
                              direction='row'
                              justify='flex-start'
                              spacing={2}
                            >
                              {row.facilities.map(facility => {
                                console.log('facility', facility)
                                return (
                                  <Grid item className={classes.border}>
                                    <Typography variant='h6'>
                                      {facility.name}
                                    </Typography>
                                    <Typography>
                                      Description: {facility.description}
                                    </Typography>
                                    <Typography>
                                      AV Support: {facility.avSupport}
                                    </Typography>
                                    <Typography>
                                      Capacity: {facility.capacity}
                                    </Typography>
                                    <Typography>
                                      Color: {facility.colorCode}
                                    </Typography>

                                    <Typography>
                                      {facility.foodAllowed
                                        ? 'Food Allowed'
                                        : 'No Food Allowed'}
                                    </Typography>
                                    <Typography>
                                      Footage: {facility.footage}
                                    </Typography>
                                    {facility.equipmentBundles && (
                                      <>
                                        <Typography>
                                          EquipmentBundles:
                                        </Typography>
                                        <Grid
                                          container
                                          direction='row'
                                          justify='flex-start'
                                          spacing={2}
                                        >
                                          {facility.equipmentBundles.map(
                                            equipment => {
                                              console.log(
                                                'equipmentbundles',
                                                equipment
                                              )

                                              return (
                                                <Grid item>
                                                  <Typography>
                                                    {equipment.name}
                                                  </Typography>
                                                </Grid>
                                              )
                                            }
                                          )}
                                        </Grid>
                                      </>
                                    )}
                                  </Grid>
                                )
                              })}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                      <ButtonGroup
                        style={{ display: 'flex', justifyContent: 'right' }}
                      >
                        {index === 1 && (
                          <Button onClick={() => handleOpen('edit', row)}>
                            Edit
                          </Button>
                        )}
                        {(index === 0 || index === 1) && (
                          <Button onClick={() => handleOpen('delete', row)}>
                            Delete Event
                          </Button>
                        )}
                      </ButtonGroup>
                    </ExpansionPanelActions>
                  </ExpansionPanel>
                ))}
              </TabPanel>
            )
          })
        ) : (
          <div style={{ padding: '20px' }}>
            <Typography>No reservations for this criteria</Typography>
          </div>
        )}
      </div>
      <ConfirmationDialog
        open={openDelte}
        handleCloseDelte={handleCloseDelte}
        entity={selectedEntity}
      />
      <ReservationsDialog
        open={open}
        handleClose={handleClose}
        entity={selectedEntity}
        editable
        create={false}
      />
    </>
  )
}
const ConfirmationDialog = props => {
  const { open, handleCloseDelte } = props
  const dispatch = useDispatch()

  const [entity, setEntity] = useState({
    id: 0,
    event: ''
  })

  useEffect(() => {
    setEntity({
      id: props.entity.id,
      event: props.entity.event
    })
  }, [props.entity])
  const handleDelete = () => {
    dispatch(delete_reservation(entity.id))
    handleCloseDelte()
  }

  return (
    <Dialog open={open} onClose={handleCloseDelte} fullWidth>
      <DialogTitle id='form-dialog-title'>
        Are you sure you want to delete this event?
      </DialogTitle>
      <DialogContent>
        <Typography>
          You are about to delete your reservationt for the following event
          {entity.event}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelte} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleDelete} color='secondary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
