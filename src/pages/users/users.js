import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import styles from './userTable.module.css';
import Pagination from './pagination';
import { Delete } from '../../shared/deleteHandler';


const UserTables = () => {

  const navigate = useNavigate();
  const { deleteFunction } = Delete()


  const editHandler = (id) => {
    navigate(`/edit-user/?userId=${id}`);
  }

  const deleteHandler = (id, setData) => {
    deleteFunction(id, 'users', setData);
  }

  const addNewUserHandler = () => {
    navigate('/new-user');
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Users Listing</CardTitle>
          <CardTitle title='Add New User' className={styles.addNewUser} onClick={addNewUserHandler} >
            <i className="bi bi-person-plus-fill"></i>
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the Users
          </CardSubtitle>
          <Pagination editHandler={editHandler} deleteHandler={deleteHandler} />
        </CardBody>
      </Card>
    </div>
  );
};

export default UserTables;
