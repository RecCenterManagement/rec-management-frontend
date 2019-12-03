import React, { useEffect, useState } from 'react'
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
  IconButton
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  get_equipment,
  post_equipment,
  put_equipment,
  delete_equipment
} from '../../actions/equipment'

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

const Reservations = props => {
  const classes = useStyles()
  const entities = useSelector(state => state.equipment.entities)
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
    dispatch(delete_equipment(entity.id))
  }

  useEffect(() => {
    dispatch(get_equipment())
  }, [dispatch])

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          className={classes.cardHeader}
          title='Equipment Entities'
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
              <TableCell align='left'>ID</TableCell>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Inventory Size</TableCell>

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
                  <TableCell align='left'>{row.inventorySize}</TableCell>

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
      <EquipmentDialog
        open={open}
        handleClose={handleClose}
        entity={selectedEntity}
        editable={editable}
      />
    </>
  )
}

const EquipmentDialog = props => {
  const { open, handleClose, editable } = props
  const dispatch = useDispatch()

  const [entity, setEntity] = useState({
    name: '',
    inventorySize: 0
  })

  useEffect(() => {
    if (props.entity) {
      setEntity({
        id: props.entity.id,
        name: props.entity.name,
        inventorySize: props.entity.inventorySize
      })
    } else {
      setEntity({ name: '', inventorySize: 0 })
    }
  }, [props.entity])

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value })
  }

  const handleSave = () => {
    if (props.entity) {
      dispatch(put_equipment(entity))
    } else {
      dispatch(post_equipment(entity))
    }
    setEntity({ name: '', inventorySize: 0 })
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle id='form-dialog-title'>Equipment Editor</DialogTitle>
      <DialogContent>
        <TextField
          style={{ margin: '12px' }}
          id='id'
          label='Entity ID'
          type='text'
          fullWidth
          disabled
          value={entity.id}
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id='name'
          label='Entity Name'
          value={entity.name}
          type='text'
          onChange={handleChange('name')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id='inventorySize'
          label='Inventory Size'
          value={entity.inventorySize}
          type='number'
          onChange={handleChange('inventorySize')}
          fullWidth
        />
      </DialogContent>
      {editable && (
        <DialogActions>
          <Button onClick={handleSave} color='secondary'>
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

export default Reservations
