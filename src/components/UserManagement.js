import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  Grid,
  ButtonGroup,
  Button
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers, getUsers, updateUser } from '../actions/user-management'

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
  const classes = useStyles()
  const dispatch = useDispatch()
  let history = useHistory()

  const account = useSelector(state => state.authentication.account)

  const users = useSelector(state => state.userManagement.users)
  /*   const sort = prop => () => {
    setState(...state,
      {
        order: state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => sortUsers()
    );
  };

  const sortUsers = () => {
    getUsers();
    history.push(`${props.location.pathname}?page=${state.activePage}&sort=${state.sort},${state.order}`);
  }

  const handlePagination = activePage => setState({ ...state, activePage }, () => this.sortUsers());

  const getUsers = () => {
    dispatch(getUsers(state.activePage - 1, state.itemsPerPage, `${state.sort},${state.order}`));
  };

 */
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const toggleActive = user => {
    console.log(user)
    dispatch(
      updateUser({
        ...user,
        activated: !user.activated
      })
    )
  }

  return (
    <Card>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Login</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Activated</TableCell>
                <TableCell>Lan</TableCell>
                <TableCell>Profiles</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Modified Date</TableCell>
                <TableCell>Modified By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(row => (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell>{row.login}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
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
                  <TableCell>{row.createdDate}</TableCell>
                  <TableCell>{row.lastModifiedDate}</TableCell>
                  <TableCell>{row.lastModifiedBy}</TableCell>
                  <TableCell>
                    <ButtonGroup
                      size='small'
                      variant='contained'
                      color='primary'
                    >
                      <Button>View</Button>
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Card>
  )
}

export default UserManagement
