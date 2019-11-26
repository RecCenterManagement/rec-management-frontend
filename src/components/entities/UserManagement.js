import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TextField,
  ButtonGroup,
  Button,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Divider,
  Typography,
  Grid
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers, updateUser, deleteUser } from '../actions/user-management'
import {
  getMembership,
  getMemberships,
  updateMembership,
  deleteMembership,
  createMembership
} from '../actions/membership'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: '5vh',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.light,
    color: 'black'
  },
  media: {
    height: 240,
    backgroundSize: 240
  },
  formControl: {
    margin: '12px'
  }
}))

const UserManagement = props => {
  const [open, setOpen] = useState(props ? props.open : false)
  const [editable, setEditable] = useState('view')
  const [selectedEntity, setSelectedEntity] = useState({})
  const classes = useStyles()
  const dispatch = useDispatch()

  const users = useSelector(state => state.userManagement.users)
  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getMemberships())
  }, [dispatch])

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = (type, entity) => {
    if (type === 'edit') {
      setEditable(true)
    } else {
      setEditable(false)
    }
    setSelectedEntity(entity)
    dispatch(getMembership(entity.id))
    setOpen(true)
  }
  const toggleActive = user => {
    dispatch(updateUser({ ...user, activated: !user.activated }))
    dispatch(getAllUsers())
  }
  const handleDelete = login => {
    dispatch(deleteUser(login))
  }

  return (
    <>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title='User Management' />
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align='left'>Login</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>Activated</TableCell>
              <TableCell align='right'>Lan</TableCell>
              <TableCell align='right'>Profiles</TableCell>
              <TableCell align='right'>Created Date</TableCell>
              <TableCell align='right'>Modified Date</TableCell>
              <TableCell align='right'>Modified By</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(row => (
              <TableRow key={row.id}>
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell align='left'>{row.login}</TableCell>
                <TableCell align='right'>{row.email}</TableCell>
                <TableCell align='right'>
                  <Button onClick={() => toggleActive(row)}>
                    {row.activated ? 'Activated' : 'Deactivated'}
                  </Button>
                </TableCell>
                <TableCell align='right'> {row.langKey}</TableCell>
                <TableCell align='right'>
                  {row.authorities.map(item => (
                    <div>{item}</div>
                  ))}
                </TableCell>
                <TableCell align='right'>{row.createdDate}</TableCell>
                <TableCell align='right'>{row.lastModifiedDate}</TableCell>
                <TableCell align='right'>{row.lastModifiedBy}</TableCell>
                <TableCell align='center'>
                  <ButtonGroup size='small' variant='contained' color='primary'>
                    <Button onClick={() => handleOpen('view', row)}>
                      View
                    </Button>
                    <Button onClick={() => handleOpen('edit', row)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(row.login)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <UsersDialog
        open={open}
        entity={selectedEntity}
        editable={editable}
        handleClose={handleClose}
      />
    </>
  )
}

const UsersDialog = props => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { open, handleClose, editable } = props
  const [entity, setEntity] = useState({})
  const membership = useSelector(state => state.membership.entity)
  const memberships = ['STUDENT', 'COMMUNITY', 'EMPLOYEE']
  const [membershipEntity, setMembershipEntity] = useState({
    id: Math.floor(Math.random() * 10),
    expirationDate: new Date(),
    membershipType: 'Unknown'
  })
  const [addMembership, setAddMembership] = useState(false)

  useEffect(() => {
    setEntity(props.entity)
    membership
      ? setMembershipEntity(membership)
      : setMembershipEntity({
          ...membershipEntity,
          user: props.entity,
          id: props.entity.id
        })
  }, [props.entity, membership])

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value })
  }
  const handleUpdate = () => {
    dispatch(updateUser(entity))
    if (membership) {
      dispatch(updateMembership(membershipEntity))
    } else {
      dispatch(createMembership(membershipEntity))
    }
    dispatch(getAllUsers())
    handleClose()
  }

  const handleChangeMembershipType = name => event => {
    setMembershipEntity({ ...membershipEntity, [name]: event.target.value })
  }
  const handleAddMembership = () => {
    setAddMembership(true)
  }
  const handleMembershipExpirationDate = date => {
    setMembershipEntity({ ...membershipEntity, expirationDate: date })
  }
  const handleDeleteMembership = membership => {
    membership && dispatch(deleteMembership(membership.id))
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id='form-dialog-title'>User Information</DialogTitle>
      <DialogContent>
        <TextField
          disabled
          style={{ margin: '12px' }}
          id={'id'}
          label={'ID'}
          value={entity.id}
          type='text'
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id={'login'}
          label={'Login'}
          value={entity.login}
          type='text'
          onChange={handleChange('login')}
          fullWidth
        />
        <FormControlLabel
          label='Activated'
          labelPlacement='top'
          id={'activated'}
          disabled={!editable}
          value={entity.activated}
          control={
            <Button onClick={() => handleChange('activated')}>
              {entity.activated ? 'Activated' : 'Deactivated'}
            </Button>
          }
        />

        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id={'firstName'}
          label={'First Name'}
          value={entity.firstName}
          type='text'
          onChange={handleChange('firstName')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id={'lastName'}
          label={'Last Name'}
          value={entity.lastName}
          type='text'
          onChange={handleChange('lastName')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id={'email'}
          label={'Email'}
          value={entity.email}
          type='text'
          onChange={handleChange('email')}
          fullWidth
        />

        <TextField
          disabled
          style={{ margin: '12px' }}
          id={'authorities'}
          label={'Authorities'}
          value={entity.authorities}
          type='text'
          fullWidth
        />
        <TextField
          disabled
          style={{ margin: '12px' }}
          id={'createdDate'}
          label={'Created Date'}
          value={entity.createdDate}
          type='text'
          fullWidth
        />
        <TextField
          disabled
          style={{ margin: '12px' }}
          id={'createdby'}
          label={'Created By'}
          value={entity.createdBy}
          type='text'
          fullWidth
        />
        <TextField
          disabled
          style={{ margin: '12px' }}
          id={'modifiedDate'}
          label={'Modified Date'}
          value={entity.lastModifiedDate}
          type='text'
          fullWidth
        />
        <TextField
          disabled
          style={{ margin: '12px' }}
          id={'modifiedBy'}
          label={'Modified By'}
          value={entity.lastModifiedBy}
          type='text'
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id={'imageUrl'}
          label={'Image Url'}
          value={entity.imageUrl}
          type='text'
          onChange={handleChange('imageUrl')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id={'langKey'}
          label={'Language'}
          value={entity.langKey}
          type='text'
          onChange={handleChange('langKey')}
          fullWidth
        />
        <Divider />
        <Typography variant='h6'>Membership Information</Typography>
        {membership || addMembership ? (
            <Grid  container direction="row">
            <FormControl className={classes.formControl}>
              <InputLabel id='membership'>Membership</InputLabel>
              <Select
                disabled={!editable}
                labelId='membership-select'
                id='membership-select'
                defaultValue={
                  membershipEntity
                    ? membershipEntity.membershipType
                    : 'COMMUNITY'
                }
                value={
                  membershipEntity
                    ? membershipEntity.membershipType
                    : 'COMMUNITY'
                }
                onChange={handleChangeMembershipType('membershipType')}
                input={<Input />}
              >
                {memberships.map(membership => (
                  <MenuItem key={membership} value={membership}>
                    {membership
                      .toLowerCase()
                      .replace(/\w/, e => e.toUpperCase())}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='flex-start'>
                <KeyboardDatePicker
                  disabled={!editable}
                  margin='12px'
                  id={'membershipDate'}
                  label='Membership Expiration Date'
                  value={
                    membershipEntity ? membershipEntity.expirationDate : 'N/A'
                  }
                  onChange={handleMembershipExpirationDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  disablePast
                  format='yyyy/MM/dd'
                />
                </Grid>
            </MuiPickersUtilsProvider>
            {membershipEntity && (
              <Typography variant='h7'>
                {membershipEntity.expirationDate <= new Date()
                  ? 'Membership is expired'
                  : 'Membership is active'}
              </Typography>
            )}
            <Button onClick={() => handleDeleteMembership(membership)}>
              Delete Membership
            </Button>
            </Grid>
        ) : (
          <Button onClick={handleAddMembership}> Add Membership</Button>
        )}
      </DialogContent>
      {editable && (
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleUpdate} color='secondary'>
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}
export default UserManagement
