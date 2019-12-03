import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  get_facilities,
  put_facility,
  delete_facility,
  post_facility
} from '../../actions/facilities'

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: 'hide',
    margin: 24
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.light,
    color: 'black'
  }
}))

const Facilities = props => {
  const classes = useStyles()
  const entities = useSelector(state => state.facilities.entities)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState({})
  const [editable, setEditable] = useState('view')

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = (type, entity) => {
    if (type === 'edit' || type === 'new') {
      setEditable(true)
    } else {
      setEditable(false)
    }
    setSelectedEntity(entity)
    setOpen(true)
  }

  const handleDelete = entity => {
    dispatch(delete_facility(entity.id))
  }

  useEffect(() => {
    dispatch(get_facilities())
  }, [dispatch])

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          className={classes.cardHeader}
          title='Facility Entities'
          action={
            <IconButton
              color='inherit'
              onClick={() => handleOpen('new', null)}
              aria-label='add'
            >
              <AddIcon />
            </IconButton>
          }
        />

        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='right'>Footage</TableCell>
              <TableCell align='right'>Capacity</TableCell>
              <TableCell align='right'>AV Support</TableCell>
              <TableCell align='right'>Food Allowed</TableCell>
              <TableCell align='right'>Color Code</TableCell>
              <TableCell align='right'>Description</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities &&
              entities.map(row => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell align='left'>{row.name}</TableCell>
                  <TableCell align='right'>{row.footage}</TableCell>
                  <TableCell align='right'>{row.capacity}</TableCell>
                  <TableCell align='right'>{row.avSupport}</TableCell>
                  <TableCell align='right'>
                    {row.foodAllowed ? 'true' : 'false'}
                  </TableCell>
                  <TableCell align='right'>{row.colorCode}</TableCell>
                  <TableCell align='right'>{row.description}</TableCell>
                  <TableCell align='center'>
                    <ButtonGroup>
                      <Button onClick={() => handleOpen('view', row)}>
                        View
                      </Button>
                      <Button onClick={() => handleOpen('edit', row)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(row)}>Delete</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
      <FacilitiesDialog
        open={open}
        handleClose={handleClose}
        entity={selectedEntity}
        editable={editable}
      />
    </>
  )
}

const FacilitiesDialog = props => {
  const { open, handleClose, editable } = props

  const [entity, setEntity] = useState({
    name: '',
    footage: 0,
    capacity: 0,
    avSupport: false,
    foodAllowed: false,
    colorCode: '',
    description: ''
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (props.entity) {
      setEntity({
        id: props.entity.id,
        name: props.entity.name,
        footage: props.entity.footage,
        capacity: props.entity.capacity,
        avSupport: props.entity.avSupport,
        foodAllowed: props.entity.foodAllowed,
        colorCode: props.entity.colorCode,
        description: props.entity.description
      })
    } else {
      //for some reason the entity has to be reset here
      setEntity({
        name: '',
        footage: 0,
        capacity: 0,
        avSupport: false,
        foodAllowed: false,
        colorCode: '',
        description: ''
      })
    }
  }, [props.entity])

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value })
  }

  const handleChangeCheckbox = name => event => {
    setEntity({ ...entity, [name]: event.target.checked })
  }

  const handleSave = () => {
    if (props.entity) {
      dispatch(put_facility(entity))
    } else {
      dispatch(post_facility(entity))
      handleClose()
      setEntity({
        name: '',
        footage: 0,
        capacity: 0,
        avSupport: 'false',
        foodAllowed: false,
        colorCode: '',
        description: ''
      })
    }
  }
  console.log(entity.foodAllowed)
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle id='form-dialog-title'>Facilities Editor</DialogTitle>
      <DialogContent>
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id='name'
          label='Entity Name'
          value={entity.name}
          type='text'
          required
          onChange={handleChange('name')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id='footage'
          label='Footage'
          value={entity.footage}
          color
          type='number'
          onChange={handleChange('footage')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id='capacity'
          label='Capacity'
          value={entity.capacity}
          type='number'
          onChange={handleChange('capacity')}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              disabled={!editable}
              style={{ margin: '12px' }}
              id='av'
              checked={entity.avSupport}
              onChange={handleChangeCheckbox('avSupport')}
              value={entity.avSuppor}
              color='primary'
            />
          }
          label='AV Support'
        />
        <FormControlLabel
          control={
            <Checkbox
              disabled={!editable}
              style={{ margin: '12px' }}
              id='food'
              label='Food Allowed'
              checked={entity.foodAllowed}
              onChange={handleChangeCheckbox('foodAllowed')}
              value={entity.foodAllowed}
              color='primary'
            />
          }
          label='Food Allowed'
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id='name'
          label='Color Code'
          value={entity.colorCode}
          type='text'
          onChange={handleChange('colorCode')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id='name'
          label='Description'
          value={entity.description}
          type='text'
          onChange={handleChange('description')}
          fullWidth
        />
      </DialogContent>
      {editable && (
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='secondary'>
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default Facilities
