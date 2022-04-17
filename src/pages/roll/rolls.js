import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Table, Col, Row } from "reactstrap";
import { useNavigate } from 'react-router-dom';

import styles from './rollTable.module.css';
import { Delete } from '../../shared/deleteHandler';
import { fetchDataFunction } from '../../shared/FetchData';

const RollTables = () => {

    const [name, setName] = useState('');
    const [rollsState, setRollsState] = useState([]);
    const { deleteFunction } = Delete();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFunction('rolls')
            setRollsState(data)
        }
        fetchData();
    }, [setRollsState, fetchDataFunction])


    const editHandler = (id) => {
        navigate(`/edit-roll/?rollId=${id}`);
    }

    const deleteHandler = (id) => {
        // setShoWModal(false);
        deleteFunction(id, 'rolls', setRollsState);
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
                            <i title='Add New Roll' onClick={addNewUserHandler} className={`bi bi-bookmark-plus-fill ${styles.addNew}`}></i>
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

export default RollTables;
