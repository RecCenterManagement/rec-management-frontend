import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  Box,
  AppBar,
  Grid,
  Button,
  ButtonGroup
} from '@material-ui/core'
import { get_reservations } from '../actions/reservations'

const ReservationManagement = () => {
  function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    )
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }

  function getSorting(order, orderBy) {
    return order === 'desc'
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy)
  }

  const headCells = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'event', numeric: true, disablePadding: false, label: 'Event Name' },
    {
      id: 'estimatedParticipants',
      numeric: true,
      disablePadding: false,
      label: 'Participants (Est.)'
    },
    {
      id: 'startTime',
      numeric: true,
      disablePadding: false,
      label: 'Start Time'
    },
    { id: 'endTime', numeric: true, disablePadding: false, label: 'End Time' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' }
  ]

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props
    const createSortHandler = property => event => {
      onRequestSort(event, property)
    }

    return (
      <TableHead style={{ backgroundColor: '#8e774d' }}>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                     ? 'sorted descending'
                     : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    tableWrapper: {
      overflowX: 'auto'
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    },
    tabRoot: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    th: {
      backgroudColor: '#8d6e63',
      color: '#8d6e63'
    }
  }))

  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('event')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const reservations = useSelector(state => state.reservations.entities)

  const [rows, setRows] = useState([])
  const [pending, setPending] = useState([])
  const [approved, setApproved] = useState([])
  const [denied, setDenied] = useState([])
  const [all, setAll] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_reservations())
  }, [])

  useEffect(
    () => {
      const resPred = status => res => status == res.status
      setPending(reservations.filter(resPred('PENDING')))
      setApproved(reservations.filter(resPred('APPROVED')))
      setDenied(reservations.filter(resPred('DENIED')))
      setAll(reservations)
    },
    [reservations]
  )

  useEffect(
    () => {
      // value: 0 -> pending, 1 -> approved, 2 -> denied
      switch (value) {
      case 0:
        setRows(pending)
        break
      case 1:
        setRows(approved)
        break
      case 2:
        setRows(denied)
        break
      case 3:
        setRows(all)
        break
      }
    },
    [pending, approved, denied, all, value]
  )

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <div className={classes.tabRoot}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="simple tabs example"
          >
            <Tab label="Pending" {...a11yProps(0)} />
            <Tab label="Approved" {...a11yProps(1)} />
            <Tab label="Denied" {...a11yProps(2)} />
            <Tab label="All" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Container>
            <Paper className={classes.paper} color={classes.palette}>
              <div className={classes.tableWrapper}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    className={classes.th}
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getSorting(order, orderBy))
                     .slice(
                       page * rowsPerPage,
                       page * rowsPerPage + rowsPerPage
                     )
                     .map(row => {
                       const isItemSelected = isSelected(row.name)

                       return (
                         <TableRow
                           hover
                           onClick={event => handleClick(event, row.name)}
                           aria-checked={isItemSelected}
                           tabIndex={-1}
                           key={row.name}
                           selected={isItemSelected}
                         >
                           <TableCell
                             component="th"
                             scope="row"
                             padding="right"
                           >
                             {row.id}
                           </TableCell>
                           <TableCell align="right">{row.event}</TableCell>
                           <TableCell align="right">
                             {row.estimatedParticipants}
                           </TableCell>
                           <TableCell align="right">{row.startTime}</TableCell>
                           <TableCell align="right">{row.endTime}</TableCell>
                           <TableCell align="right">{row.status}</TableCell>
                           <TableCell align="right">
                             {row.actions}
                             <Grid item>
                               <ButtonGroup
                                 size="small"
                                 aria-label="small outlined button group"
                               >
                                 <Button color="secondary">Approve</Button>
                                  <Button color="secondary">Deny</Button>
                                  <Button color="secondary">View</Button>
                                </ButtonGroup>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{ height: (dense ? 33 : 53) * emptyRows }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'previous page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Container>
            <Paper className={classes.paper}>
              <div className={classes.tableWrapper}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getSorting(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.name)

                        return (
                          <TableRow
                            hover
                            onClick={event => handleClick(event, row.name)}
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="right"
                            >
                              {row.id}
                            </TableCell>
                            <TableCell align="right">{row.event}</TableCell>
                            <TableCell align="right">
                              {row.estimatedParticipants}
                            </TableCell>
                            <TableCell align="right">{row.startTime}</TableCell>
                            <TableCell align="right">{row.endTime}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">
                              {row.actions}
                              <ButtonGroup
                                fullWidth
                                aria-label="full width outlined button group"
                              >
                                <Button color="secondary">Deny</Button>
                                <Button color="secondary">View</Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{ height: (dense ? 33 : 53) * emptyRows }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'previous page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Container>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Container>
            <Paper className={classes.paper}>
              <div className={classes.tableWrapper}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getSorting(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.name)

                        return (
                          <TableRow
                            hover
                            onClick={event => handleClick(event, row.name)}
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="right"
                            >
                              {row.id}
                            </TableCell>
                            <TableCell align="right">{row.event}</TableCell>
                            <TableCell align="right">
                              {row.estimatedParticipants}
                            </TableCell>
                            <TableCell align="right">{row.startTime}</TableCell>
                            <TableCell align="right">{row.endTime}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">
                              {row.actions}
                              <ButtonGroup
                                fullWidth
                                aria-label="full width outlined button group"
                              >
                                <Button color="secondary">Approve</Button>
                                <Button color="secondary">View</Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{ height: (dense ? 33 : 53) * emptyRows }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'previous page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Container>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Container>
            <Paper className={classes.paper}>
              <div className={classes.tableWrapper}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getSorting(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.name)

                        return (
                          <TableRow
                            hover
                            onClick={event => handleClick(event, row.name)}
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="right"
                            >
                              {row.id}
                            </TableCell>
                            <TableCell align="right">{row.event}</TableCell>
                            <TableCell align="right">
                              {row.estimatedParticipants}
                            </TableCell>
                            <TableCell align="right">{row.startTime}</TableCell>
                            <TableCell align="right">{row.endTime}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">
                              {row.actions}
                              <ButtonGroup
                                fullWidth
                                aria-label="full width outlined button group"
                              >
                                <Button color="secondary">Approve</Button>
                                <Button color="secondary">View</Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{ height: (dense ? 33 : 53) * emptyRows }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'previous page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Container>
        </TabPanel>
      </div>
    </div>
  )
}

export default ReservationManagement
