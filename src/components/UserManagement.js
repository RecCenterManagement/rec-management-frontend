import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  Grid
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { getUsers,updateUser } from '../actions/user-management'


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

const UserManagement = (props) => {
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

 const  toggleActive = user => () => {
    dispatch(updateUser({
      ...user,
      activated: !user.activated
    }));
  }; */
  useEffect(() => {
  getUsers(1,2,'asc')
}, [dispatch])
  console.log(account.username, users[0])
  return (
<Paper>
    <Grid container spacing={4}>
     <Table>
     <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(row => (
            <TableRow key={'row.name'}>
              <TableCell component="th" scope="row">
                {'row.name'}
              </TableCell>
              <TableCell>{'row'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
         </Table>   
    </Grid>
    </Paper>
  )
}

export default UserManagement
