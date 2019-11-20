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
  Grid,
  Chip
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {
  get_reservations_by_user_id,
  delete_reservation
} from '../actions/reservations'
import ReservationsListForm from './ReservationsListForm.js'
import ReservationsRecreationForm from './ReservationsRecreationForm.js'

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
  const [filteredReservations, setFilteredReservations] = useState([])
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [openDelte, setOpenDelte] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState({})
  const [recreate, setRecreate] = useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleCloseDelte = () => {
    dispatch(get_reservations_by_user_id(accountID))
    setOpenDelte(false)
  }
  const handleClose = () => {
    setOpen(false)
    setRecreate(false)
  }
  const handleOpen = (type, entity) => {
    if (type === 'delete') {
      setOpenDelte(true)
    } else if (type === 'edit') {
      setOpen(true)
    } else if (type === 'recreate') {
      setRecreate(true)
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
    if (r && r.length !== 0) {
      let res = []
      if (value !== 'PAST') {
        res = r.filter(
          res => res.status === value && new Date(res.endTime) >= new Date()
        )
      } else {
        res = r.filter(res => new Date(res.endTime) < new Date())
      }
      setFilteredReservations(res)
    }
  }
  useEffect(() => {
    handleFilterReservations(reservations)
  }, [dispatch, reservations, value])
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
            <Tab value='PAST' label='Past' />
          </Tabs>
        </AppBar>
        {reservations &&
        filteredReservations &&
        filteredReservations.length !== 0 ? (
          ['APPROVED', 'PENDING', 'DENIED', 'PAST'].map((panel, index) => {
            return (
              <TabPanel value={value} name={panel} index={index}>
                {filteredReservations.map(row => (
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      key={row.name}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Grid
                        container
                        direction='row'
                        justify='flex-start'
                        spacing={2}
                        alignItems='center'
                      >
                        <Grid item>
                          <Typography variant='h5'>{row.event}</Typography>
                        </Grid>
                        {panel === 'PAST' && (
                          <Grid item>
                            <Chip
                              size='small'
                              label={row.status}
                              color={'primary'}
                            />
                          </Grid>
                        )}
                      </Grid>
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
                              {new Date(row.startTime).toDateString() +
                                ' ' +
                                new Date(row.startTime).toLocaleTimeString() +
                                '  - ' +
                                new Date(row.endTime).toLocaleTimeString() +
                                ' ' +
                                new Date(row.endTime).toDateString()}
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
                                  return (
                                    equipment &&
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
                        {row.facilities && row.facilities.length !== 0 && row.facilities[0]!==null && (
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
                                
                                return (
                                  facility &&
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
                        {panel !== 'PAST' && row.status === 'PENDING' && (
                          <Button onClick={() => handleOpen('edit', row)}>
                            Edit
                          </Button>
                        )}
                        {panel !== 'PAST' &&
                          (row.status === 'PENDING' ||
                            row.status === 'APPROVED') && (
                            <Button onClick={() => handleOpen('delete', row)}>
                              Delete Event
                            </Button>
                          )}
                        {panel == 'PAST' && (
                          <Button onClick={() => handleOpen('recreate', row)}>
                            Recreate Event
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
      <ReservationsListForm
        open={open}
        handleClose={handleClose}
        entity={selectedEntity}
        editable
        create={false}
      />
      <ReservationsListForm
        open={recreate}
        handleClose={handleClose}
        entity={selectedEntity}
        editable
        create={true}
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
