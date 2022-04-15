import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Table, Col, Row } from "reactstrap";
import { useNavigate } from 'react-router-dom';

import styles from './rollTable.module.css';

const UserTables = (props) => {

    const [name, setName] = useState('');
    const [rollsState, setRollsState] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        return fetch('http://localhost:5000/rolls')
            .then(res => {
                return res.json()
            })
            .then(_rolls => {
                setRollsState(_rolls.rolls)
                console.log(_rolls.rolls)
            })
            .catch(err => {
                console.log(err)
            });

    }, [setRollsState])

    const editHandler = (id) => {
        navigate(`/edit-roll/?rollId=${id}`);
    }


    const deleteHandler = (id) => {

        if (window.confirm("ARE YOU SURE?") === true) {
            setRollsState(prevRoll => prevRoll.filter(roll => roll._id.toString() !== id))
            fetch(`http://localhost:5000/rolls/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => {
                    return res.json()
                })
                .then(msg => {
                    console.log(msg)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            return;
        }

    }


    const addNewUserHandler = () => {
        navigate('/new-roll');
    }


    return (
        <div>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            <i className="bi bi-card-text me-2"> </i>
                            List Of Rolls
                        </CardTitle>
                        <CardTitle title='Add New Roll'
                            className={styles.addNew}
                            onClick={addNewUserHandler} >
                            <i className="bi bi-bookmark-plus-fill"></i>
                        </CardTitle>
                        <CardBody className="">
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th >Name</th>
                                        <th style={{ borderLeft: 'none', display: "flex", alignContent: "center", justifyContent: "space-around" }} >Actions</th >
                                    </tr>
                                </thead>
                                <tbody>
                                    {rollsState.map((tdata, index) => (
                                        <tr key={index} className="border-top">
                                            {console.log(name)}
                                            <td>{tdata.name}</td>
                                            <td style={{ borderLeft: 'none', display: "flex", alignContent: "center", justifyContent: "space-around" }}>
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
                </Col>
            </Row>
        </div>
    );
};

export default UserTables;
