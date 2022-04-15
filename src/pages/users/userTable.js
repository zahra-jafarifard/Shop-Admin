import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useNavigate } from 'react-router-dom';

import styles from './userTable.module.css';

const UserTables = (props) => {

  const [usersState, setUsersState] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    return fetch('http://localhost:5000/users')
      .then(res => {
        return res.json()
      })
      .then(_users => {
        console.log(_users.users)
        setUsersState(_users.users)
      })
      .catch(err => {
        console.log(err)
      });

  }, [setUsersState])

  const editHandler = (id) => {
    console.log(id)
    navigate(`/edit-user/?userId=${id}`);
  }


  const deleteHandler = (id) => {

    if (window.confirm("ARE YOU SURE?") === true) {

      setUsersState(prevUser => prevUser.filter(user => user._id.toString() !== id))
      fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => {
          if (!res.ok) {
            return new Error(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      return;
    }

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


          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Admins</th>
                <th>E-mail</th>
                <th>Mobile</th>
                <th>Roll</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {usersState.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.image}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.family}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.email}</td>
                  <td>{tdata.mobile}</td>
                  <td>{tdata.rollId.name}</td>
                  <td style={{ marginTop: "20%", display: "flex", alignContent: "center", justifyContent: "space-around" }}>
                    <span onClick={() => editHandler(tdata._id.toString())}>
                      <i title='Edit' className="bi bi-pencil-square"></i>
                    </span>
                    <span onClick={() => deleteHandler(tdata._id.toString())}>
                      <i title='Delete' className="bi bi-x-square" ></i>
                    </span>
                  </td>
                </tr>
              ))}


            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserTables;
