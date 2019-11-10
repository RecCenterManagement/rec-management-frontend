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
  Typography,
  Chip
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  get_equipment_bundle,
  put_equipment_bundle
} from '../actions/equipment-bundle'

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

const EquipmentBundle = props => {
  const classes = useStyles()
  const entities = useSelector(state => state.equipment_bundle.entities)
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
      dispatch(get_equipment_bundle())
    },
    [dispatch]
  )

  return (
    <>
      <Card className={classes.root}>
        <CardHeader className={classes.cardHeader} title="Equipment Bundles" />
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Equipment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities &&
              entities.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    {row.claims.map(claim => claim.equipment.name)}
                  </TableCell>
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
      <BundleDialog
        open={open}
        handleClose={handleClose}
        entity={selectedEntity}
        editable={editable}
      />
    </>
  )
}

const BundleDialog = props => {
  const { open, handleClose, editable } = props

  const [entity, setEntity] = useState({
    id: 0,
    name: '',
    claims: []
  })

  const dispatch = useDispatch()

  useEffect(
    () => {
      setEntity({
        id: props.entity.id,
        name: props.entity.name,
        claims: props.entity.claims
      })
    },
    [props.entity]
  )

  const removeEquipment = id => {
    setEntity(oldState => ({
      ...oldState,
      claims: oldState.claims.filter(e => e.id !== id)
    }))
  }

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value })
  }

  const handleSave = () => {
    dispatch(put_equipment_bundle(entity))
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle id="form-dialog-title">Bundle Editor</DialogTitle>
      <DialogContent>
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Bundle Name"
          value={entity.name}
          type="text"
          onChange={handleChange('name')}
          fullWidth
        />
        <div
          style={{ display: 'flex', flexDirection: 'column', marginTop: 12 }}
        >
          <Typography>Equipment List:</Typography>
          <div style={{ marginBottom: 12 }}>
            {entity.claims &&
              entity.claims.map(claim => (
                <Chip
                  variant="outlined"
                  label={claim.equipment.name}
                  onDelete={() => removeEquipment(claim.equipment.id)}
                />
              ))}
          </div>
          {editable && (
            <Button style={{ width: 'max-content' }} color="secondary">
              Add Equipment
            </Button>
          )}
        </div>
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

export default EquipmentBundle
