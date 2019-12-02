import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles,} from '@material-ui/core/styles'
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
    ButtonGroup,
} from '@material-ui/core'
import { get_reservations, put_reservation } from '../actions/reservations'
import ReservationsDialog from './ReservationForm.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const ReservationManagement = () => {

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
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
        );
    }

    function desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    function getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
    }

    const headCells = [
        { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
        { id: 'event', numeric: true, disablePadding: false, label: 'Event Name' },
        { id: 'estimatedParticipants', numeric: true, disablePadding: false, label: 'Participants (Est.)' },
        { id: 'startTime', numeric: true, disablePadding: false, label: 'Start Time' },
        { id: 'endTime', numeric: true, disablePadding: false, label: 'End Time' },
        { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
        { id: 'actions', numeric: false, disablePadding: false, label: 'Actions'}
    ];

    function EnhancedTableHead(props) {
        const { classes, order, orderBy, onRequestSort } = props;
        const createSortHandler = property => event => {
            onRequestSort(event, property);
        };

        return (
            <TableHead style={{backgroundColor: '#8e774d'}}> 
                <TableRow>
                    {headCells.map(headCell => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'center' : 'center'} // header alignment (probably doesn't need to be conditional ternary operator)
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
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        tableWrapper: {
            overflowX: 'auto',
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
            width: 1,
        },
        tabRoot: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
        th:{
            backgroudColor: '#8d6e63',
            color: '#8d6e63',
        },
        createReservation:{
            backgroudColor: '#8d6e63',
            color: '#8d6e63',
            align: "right",
        },
    }));

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('event');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const reservations = useSelector(state => state.reservations.entities)
    const [rows, setRows] = useState([])
    const [pending, setPending] = useState([])
    const [approved, setApproved] = useState([])
    const [denied, setDenied] = useState([])
    const [all, setAll] = useState([])
    const [editable, setEditable] = useState('view')
    const [open, setOpen] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState({})

    const dispatch = useDispatch()

    const handleApproval = (reservation) => {
        reservation.status = 'APPROVED'
        dispatch(put_reservation(reservation))
    }

    const handleDenial = (reservation) => {
        reservation.status = 'DENIED'
        dispatch(put_reservation(reservation))
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

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        dispatch(get_reservations())
    }, [])

    useEffect(() => {
        const resPred = status => res => status == res.status
        setPending(reservations.filter(resPred('PENDING')))
        setApproved(reservations.filter(resPred('APPROVED')))
        setDenied(reservations.filter(resPred('DENIED')))
        setAll(reservations)
    }, [reservations])

    useEffect(() => {
        // value: 0 -> pending, 1 -> approved, 2 -> denied
        switch (value) {
            case 0:
                setRows(pending);
                break;
            case 1:
                setRows(approved);
                break;
            case 2:
                setRows(denied);
                break;
            case 3:
                setRows(all);
                break;
        }
    }, [pending, approved, denied, all, value]);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } 
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } 
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } 
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setPage(0);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <div className={classes.tabRoot}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleTabChange} aria-label="simple tabs example" >
                        <Tab label="Pending" />
                        <Tab label="Approved"/>
                        <Tab label="Denied" />
                        <Tab label="All" />
                    </Tabs>
                </AppBar>
                {/*
                <br />
                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <ButtonGroup>
                        <Button 
                            color="secondary"
                            component={Link}
                            to="/calendar"> 
                            + Create New Reservation
                        </Button>
                    </ButtonGroup>
                </Grid>
                */}
                <TabPanel value={value} index={0}>
                    <Container>
                        <Paper className={classes.paper} color={classes.palette} >
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
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    {rows.length !== 0 ? (
                                    <TableBody>
                                        {stableSort(rows, getSorting(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                const isItemSelected = isSelected(row.name);
                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={event => handleClick(event, row.name)}
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell component="th" scope="row" padding="center">{row.id}</TableCell>
                                                        <TableCell align="center">{row.event}</TableCell>
                                                        <TableCell align="center">{row.estimatedParticipants}</TableCell>
                                                        <TableCell align="center">
                                                            <div>{new Date (row.startTime).toDateString()}</div>
                                                            <div>{new Date(row.startTime).toLocaleTimeString()}</div>
                                                       </TableCell>
                                                       <TableCell align="center">
                                                            <div>{new Date (row.endTime).toDateString()}</div>
                                                            <div>{new Date(row.endTime).toLocaleTimeString()}</div>
                                                        </TableCell>
                                                        <TableCell align="center">{row.status}</TableCell>
                                                        <TableCell align="center">
                                                            {row.actions}
                                                            <Grid item>
                                                                <ButtonGroup size="small" aria-label="small outlined button group">
                                                                    <Button onClick={() => handleApproval(row)} color="secondary">Approve</Button>
                                                                    <Button onClick={() => handleDenial(row)} color="secondary">Deny</Button>
                                                                    <Button onClick={() => handleOpen('edit', row)} color="secondary">Edit</Button>
                                                                </ButtonGroup>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        }
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    ) : (
                                        <div style={{ padding: '20px' }}>
                                          <Typography>No reservations for this criteria</Typography>
                                        </div>
                                      )}
                                </Table>
                                <ReservationsDialog
                                    open={open}
                                    handleClose={handleClose}
                                    entity={selectedEntity}
                                    editable={editable}
                                    create={false}
                                />
                            </div>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'previous page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'next page',
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                        {/*
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />*/}
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
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    {rows.length !== 0 ? (
                                    <TableBody>
                                        {stableSort(rows, getSorting(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={event => handleClick(event, row.name)}
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell component="th" scope="row" padding="center">{row.id}</TableCell>
                                                        <TableCell align="center">{row.event}</TableCell>
                                                        <TableCell align="center">{row.estimatedParticipants}</TableCell>
                                                        <TableCell align="center">
                                                            <div>{new Date (row.startTime).toDateString()}</div>
                                                            <div>{new Date(row.startTime).toLocaleTimeString()}</div>
                                                       </TableCell>
                                                       <TableCell align="center">
                                                            <div>{new Date (row.endTime).toDateString()}</div>
                                                            <div>{new Date(row.endTime).toLocaleTimeString()}</div>
                                                        </TableCell>
                                                        <TableCell align="center">{row.status}</TableCell>
                                                        <TableCell align="center">
                                                            {row.actions}   
                                                            <ButtonGroup fullWidth aria-label="full width outlined button group">
                                                                <Button onClick={() => handleDenial(row)} color="secondary">Deny</Button>
                                                                <Button onClick={() => handleOpen('edit', row)} color="secondary">Edit</Button>
                                                            </ButtonGroup>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        }
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    ) : (
                                        <div style={{ padding: '20px' }}>
                                          <Typography>No reservations for this criteria</Typography>
                                        </div>
                                      )}
                                </Table>
                                <ReservationsDialog
                                    open={open}
                                    handleClose={handleClose}
                                    entity={selectedEntity}
                                    editable={editable}
                                    create={false}
                                />
                            </div>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'previous page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'next page',
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                        {/*
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />*/}
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
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    {rows.length !== 0 ? (
                                    <TableBody>
                                        {stableSort(rows, getSorting(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={event => handleClick(event, row.name)}
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell component="th" scope="row" padding="center">{row.id}</TableCell>
                                                        <TableCell align="center">{row.event}</TableCell>
                                                        <TableCell align="center">{row.estimatedParticipants}</TableCell>
                                                        <TableCell align="center">
                                                            <div>{new Date (row.startTime).toDateString()}</div>
                                                            <div>{new Date(row.startTime).toLocaleTimeString()}</div>
                                                       </TableCell>
                                                       <TableCell align="center">
                                                            <div>{new Date (row.endTime).toDateString()}</div>
                                                            <div>{new Date(row.endTime).toLocaleTimeString()}</div>
                                                        </TableCell>
                                                        <TableCell align="center">{row.status}</TableCell>
                                                        <TableCell align="center">
                                                            {row.actions}
                                                            <ButtonGroup fullWidth aria-label="full width outlined button group">
                                                                <Button onClick={() => handleApproval(row)}color="secondary">Approve</Button>
                                                                <Button onClick={() => handleOpen('edit', row)} color="secondary">Edit</Button>
                                                            </ButtonGroup>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        }
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    ) : (
                                        <div style={{ padding: '20px' }}>
                                          <Typography>No reservations for this criteria</Typography>
                                        </div>
                                      )}
                                </Table>
                                <ReservationsDialog
                                    open={open}
                                    handleClose={handleClose}
                                    entity={selectedEntity}
                                    editable={editable}
                                    create={false}
                                />
                            </div>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'previous page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'next page',
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                        {/*
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />*/}
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
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    {rows.length !== 0 ? (
                                    <TableBody>
                                        {stableSort(rows, getSorting(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={event => handleClick(event, row.name)}
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell component="th" scope="row" padding="center">{row.id}</TableCell>
                                                        <TableCell align="center">{row.event}</TableCell>
                                                        <TableCell align="center">{row.estimatedParticipants}</TableCell>
                                                        <TableCell align="center">
                                                            <div>{new Date (row.startTime).toDateString()}</div>
                                                            <div>{new Date (row.startTime).toLocaleTimeString()}</div>
                                                       </TableCell>
                                                       <TableCell align="center">
                                                            <div>{new Date (row.endTime).toDateString()}</div>
                                                            <div>{new Date (row.endTime).toLocaleTimeString()}</div>
                                                        </TableCell>
                                                        <TableCell align="center">{row.status}</TableCell>
                                                        <TableCell align="center">
                                                            {row.actions}
                                                            <ButtonGroup fullWidth aria-label="full width outlined button group">
                                                                <Button onClick={() => handleOpen('view', row)} color="secondary">View</Button>
                                                            </ButtonGroup>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        }
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    ) : (
                                        <div style={{ padding: '20px' }}>
                                          <Typography>No reservations for this criteria</Typography>
                                        </div>
                                      )}
                                </Table>
                            </div>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'previous page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'next page',
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                        {/*
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />*/}
                    </Container>
                </TabPanel>
            </div>   
        </div>
    );
}

export default ReservationManagement