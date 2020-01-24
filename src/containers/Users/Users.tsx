import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getUsers } from 'redux/reducers/users/actions';
import { getUserFromState } from 'redux/reducers/users/selectors';
import { User as UserType } from 'redux/reducers/users/types';
import { getAuth } from 'redux/reducers/auth/selectors';

import UsersModal from './UserModal';
import styles from './Users.module.scss';

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(getUserFromState);
  const auth = useSelector(getAuth);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserType>({
    name: '',
    login: '',
    phone: '',
    role: '',
    locationId: {
      _id: '',
      title: ''
    }
  });

  useEffect(() => {
    if (usersData.users.length === 0) {
      dispatch(getUsers(auth.user.token, 0, 1000));
    }
  });

  const createNew = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(getUsers(auth.user.token, 0, 1000));
  };

  const setClassnameIventory = (i: number) => {
    if (i % 2 !== 0) return styles.rowGrey;

    return '';
  };

  const showModal = (item: UserType) => {
    setEditUser(item);
    setOpen(true);
  };

  return (
    <div className={styles.users}>
      <Button variant="contained" color="primary" onClick={createNew}>
        Создать пользователя
      </Button>

      <TableContainer component={Paper} className={styles.root}>
        <Table
          className={styles.table}
          size="small"
          style={{ borderColor: 'black' }}
          stickyHeader
          aria-label="users table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left" className={styles.cellNumber}>
                Номер
              </TableCell>
              <TableCell align="left">Имя пользоваетля</TableCell>
              <TableCell align="left">Логин</TableCell>
              <TableCell align="left">Телефон</TableCell>
              <TableCell align="left">Роль</TableCell>
              <TableCell align="left">Локация</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.users.map((item, indexRow) => (
              <TableRow
                key={`USER_${indexRow}`}
                className={setClassnameIventory(indexRow)}
              >
                <TableCell align="left" component="th" scope="row">
                  {indexRow + 1}
                </TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item.login}</TableCell>
                <TableCell align="left">{item.phone}</TableCell>
                <TableCell align="left">{item.role}</TableCell>
                <TableCell align="left">
                  {item.locationId && item.locationId.title}
                </TableCell>
                <TableCell align="left" className={styles.del}>
                  <EditIcon
                    onClick={() => showModal(item)}
                    className={styles.actionEdit}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div id="modal-qr" className={styles.containerModal}>
          <UsersModal closeModal={handleClose} editUser={editUser} />
        </div>
      </Modal>
    </div>
  );
};

export default Users;
