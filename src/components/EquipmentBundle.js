import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  Collapse,
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
import { get_equipment } from '../actions/equipment'

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

  useEffect(() => {
    dispatch(get_equipment_bundle())
  }, [dispatch])

  return (
    <>
      <Card className={classes.root}>
        <CardHeader className={classes.cardHeader} title='Equipment Bundles' />
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>ID</TableCell>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Equipment</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities &&
              entities.map(row => (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell align='left'>{row.name}</TableCell>
                  <TableCell align='left'>
                    {row.claims.map(claim => claim.equipment.name)}
                  </TableCell>
                  <TableCell align='center'>
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

  const [claimDictionary, setClaimDictionary] = useState({})

  const equipment = useSelector(state => state.equipment.entities)
  const [expanded, setExpanded] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setEntity({
      id: props.entity.id,
      name: props.entity.name,
      claims: props.entity.claims
    })
    dispatch(get_equipment())
    if (equipment && props.entity.claims) {
      let temp_dictionary = {}
      for (const e of equipment) {
        temp_dictionary[e.name] = {id: e.id, count: 0}
      }
      props.entity.claims.forEach(x => {
        temp_dictionary[x.equipment.name] = {id: x.equipment.id, count: x.count}
      })
      setClaimDictionary(temp_dictionary)
    }
  }, [props.entity])

  const removeEquipment = name => {
    const id = claimDictionary[name].id
    setClaimDictionary({ ...claimDictionary, [name]: {id, count: 0 }})
  }

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value })
  }

  const handleEquipmentChange = name => event => {
    const id = claimDictionary[name].id 
    event.target.value >= 0 &&
      setClaimDictionary({
        ...claimDictionary,
        [name]: {id, count: parseInt(event.target.value)}
      })
  }

  const handleSave = () => {
    console.log(claimDictionary)
    const new_claims = []
    Object.keys(claimDictionary).forEach(key => {
      if (claimDictionary[key].count > 0) {
        new_claims.push({
          count: claimDictionary[key].count,
          equipment: {
            id: claimDictionary[key].id,
            name: key
          }
        })
      }
    })
    let new_entity = entity
    new_entity.claims = new_claims
    dispatch(put_equipment_bundle(new_entity))
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id='form-dialog-title'>Bundle Editor</DialogTitle>
      <DialogContent>
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id='name'
          label='Bundle Name'
          value={entity.name}
          type='text'
          onChange={handleChange('name')}
          fullWidth
        />
        <div
          style={{ display: 'flex', flexDirection: 'column', marginTop: 12 }}
        >
          <Typography>Equipment List:</Typography>
          <div style={{ marginBottom: 12 }}>
            {Object.keys(claimDictionary).map(key => {
              if (claimDictionary[key].count != 0) {
                return (
                  <Chip
                    variant='outlined'
                    label={key}
                    onDelete={() => removeEquipment(key)}
                  />
                )
              }
            })}
          </div>
          {editable && (
            <>
              <Button
                style={{ width: 'max-content' }}
                color='secondary'
                onClick={() => setExpanded(!expanded)}
              >
                Add Equipment
              </Button>
              <Collapse in={expanded}>
                {equipment &&
                  equipment.map(element => (
                    <TextField
                      style={{ margin: '12px' }}
                      id={element.name}
                      label={element.name}
                      value={claimDictionary[element.name] && claimDictionary[element.name].count || 0}
                      type='number'
                      onChange={handleEquipmentChange(element.name)}
                    />
                  ))}
              </Collapse>
            </>
          )}
        </div>
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

export default EquipmentBundle
