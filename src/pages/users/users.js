import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import styles from './userTable.module.css';
import Pagination from './pagination';
import Modal from '../../shared/modal';

const UserTables = () => {

  const [showModal, setShoWModal] = useState(false);
  const [id, setId] = useState();

  const modalRef = useRef(null);
  const deleteRef = useRef(null);
  const navigate = useNavigate();

  const editHandler = (id) => {
    navigate(`/edit-user/?userId=${id}`);
  }

  const showModalHandler = (id, setData) => {
    setShoWModal(true);
    setId(id);
  }

  const cancelHandler = () => { setShoWModal(false); }

  const addNewUserHandler = () => {
    navigate('/new-user');
  }
  const footer = (
    <div>
      <Button color="primary" onClick={() => deleteRef.current(id)}>Yes</Button>
      <Button color="secondary" onClick={cancelHandler}> No</Button>
    </div>
  )
  return (
    <React.Fragment>
      {showModal && <Modal
        refToggle={modalRef}
        toggle
        header='DELETE'
        body='Do you want to delete?'
        footer={footer}
      />}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Users Listing</CardTitle>
          <CardTitle title='Add New User' className={styles.addNewUser} onClick={addNewUserHandler} >
            <i className="bi bi-person-plus-fill"></i>
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the Users
          </CardSubtitle>
          <Pagination editHandler={editHandler}
            showModalHandler={showModalHandler}
            setShoWModal={setShoWModal}
            deleteRef={deleteRef}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default UserTables;
