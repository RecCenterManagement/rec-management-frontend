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
  TablePagination,
  TableRow,
  TableHead,
  TextField,
  ButtonGroup,
  Button
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
  getAllUsers,
  getUsers,
  updateUser,
  deleteUser
} from '../actions/user-management'

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
  }
}))

const UserManagement = props => {
  const [state, setState] = useState({
    order: 'asc',
    sort: '',
    activePage: 1,
    itemsPerPage: 10
  })

  const [open, setOpen] = useState(props ? props.open : false)
  const [editable, setEditable] = useState('view')
  const [selectedEntity, setSelectedEntity] = useState({})
  const classes = useStyles()
  const dispatch = useDispatch()
  let history = useHistory()

  const users = useSelector(state => state.userManagement.users)
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const handleOpen = (type, entity) => {
    console.log('DIALOG')
    if (type === 'edit') {
      setEditable(true)
    } else {
      setEditable(false)
    }
    setSelectedEntity(entity)
    setOpen(!open)
  }
  const toggleActive = user => {
    dispatch(updateUser({ ...user, activated: !user.activated }))
  }
  const handleDelete = id => {
    dispatch(deleteUser(id))
    
  }
  console.log("before",open)

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
                <TableCell>{row.langKey}</TableCell>
                <TableCell>
                  {row.authorities.map(item => (
                    <div>{item}</div>
                  ))}
                </TableCell>
                <TableCell align='right'>{row.createdDate}</TableCell>
                <TableCell align='right'>{row.lastModifiedDate}</TableCell>
                <TableCell align='center'>{row.lastModifiedBy}</TableCell>
                <TableCell>
                  <ButtonGroup size='small' variant='contained' color='primary'>
                    <Button onClick={() => handleOpen('view', row)}>
                      View
                    </Button>
                    <Button onClick={() => handleOpen('edit', row)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(row.id)}>Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <UsersDialog open={open} entity={selectedEntity} editable={editable} />
    </>
  )
}

const UsersDialog = props => {
  const dispatch = useDispatch()
  const { editable } = props
  const [entity, setEntity] = useState(props.entity)
  const [open, setOpen] = useState(props.open)

  useEffect(() => {
    setEntity(props.entity)
    setOpen(props.open)
  }, [props.entity, props.open])

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value })
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleUpdate = entity => {
    dispatch(updateUser(entity))
    setOpen(!open)
  }

  console.log("afeter",props, open)
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle id='form-dialog-title'>User Editor</DialogTitle>
      <DialogContent>
        <TextField
          disabled={true}
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
          disabled={true}
          style={{ margin: '12px' }}
          id={'authorities'}
          label={'Authorities'}
          value={entity.authorities}
          type='text'
          fullWidth
        />
        <TextField
          disabled={true}
          style={{ margin: '12px' }}
          id={'createdDate'}
          label={'Created Date'}
          value={entity.createdDate}
          type='text'
          fullWidth
        />
        <TextField
          disabled={true}
          style={{ margin: '12px' }}
          id={'createdby'}
          label={'Created By'}
          value={entity.createdBy}
          type='text'
          fullWidth
        />
        <TextField
          disabled={true}
          style={{ margin: '12px' }}
          id={'modifiedDate'}
          label={'Modified Date'}
          value={entity.lastModifiedDate}
          type='text'
          fullWidth
        />
        <TextField
          disabled={true}
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
      </DialogContent>
      {editable && (
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(entity)} color='secondary'>
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}
export default UserManagement
