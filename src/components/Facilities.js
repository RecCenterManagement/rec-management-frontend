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
  TextField
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { get_facilities, put_facility } from '../actions/facilities'

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
    if (type === 'edit') {
      setEditable(true)
    } else {
      setEditable(false)
    }
    setSelectedEntity(entity)
    setOpen(true)
  }

  useEffect(
    () => {
      dispatch(get_facilities())
    },
    [dispatch]
  )

  return (
    <>
      <Card className={classes.root}>
        <CardHeader className={classes.cardHeader} title="Facility Entities" />
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Footage</TableCell>
              <TableCell align="right">Capacity</TableCell>
              <TableCell align="right">AV Support</TableCell>
              <TableCell align="right">Food Allowed</TableCell>
              <TableCell align="right">Color Code</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities &&
              entities.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="right">{row.footage}</TableCell>
                  <TableCell align="right">{row.capacity}</TableCell>
                  <TableCell align="right">{row.avSupport}</TableCell>
                  <TableCell align="right">{row.foodAllowed}</TableCell>
                  <TableCell align="right">{row.colorCode}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button onClick={() => handleOpen('view', row)}>
                        View
                      </Button>
                      <Button onClick={() => handleOpen('edit', row)}>
                        Edit
                      </Button>
                      <Button>Delete</Button>
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
    id: 0,
    name: '',
    footage: '',
    capacity: '',
    avSupport: '',
    foodAllowed: false,
    colorCode: '',
    description: ''
  })

  const dispatch = useDispatch()

  useEffect(
    () => {
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
    },
    [props.entity]
  )

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value })
  }

  const handleSave = () => {
    dispatch(put_facility(entity))
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle id="form-dialog-title">Facilities Editor</DialogTitle>
      <DialogContent>
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Entity Name"
          value={entity.name}
          type="text"
          onChange={handleChange('name')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Footage"
          value={entity.footage}
          type="text"
          onChange={handleChange('footage')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Capacity"
          value={entity.capacity}
          type="number"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="AV Support"
          value={entity.avSupport}
          type="text"
          onChange={handleChange('avSupport')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Food Allowed"
          value={entity.foodAllowed}
          type="text"
          onChange={handleChange('foodAllowed')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Color Code"
          value={entity.colorCode}
          type="text"
          onChange={handleChange('colorCode')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Description"
          value={entity.description}
          type="text"
          onChange={handleChange('description')}
          fullWidth
        />
      </DialogContent>
      {editable && (
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary">
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default Facilities
