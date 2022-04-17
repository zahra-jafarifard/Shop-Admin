import React, { useState, useEffect, useRef} from 'react';
import { Card, CardBody, CardTitle, Table, Col, Row , Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';

import styles from './rollTable.module.css';
import { Delete } from '../../shared/deleteHandler';
import { fetchDataFunction } from '../../shared/FetchData';
import Modal from '../../shared/modal';
const RollTables = () => {

    const [rollsState, setRollsState] = useState([]);
    const [showModal, setShoWModal] = useState(false);
    const [id, setId] = useState();
    const modalRef = useRef(null);

    const { deleteFunction } = Delete();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFunction('rolls')
            setRollsState(data)
        }
        fetchData();
    }, [setRollsState])

    const showModalHandler = (id) => {
        setShoWModal(true);
        setId(id);
    }
    const cancelHandler = () => { setShoWModal(false); }

    
    const deleteHandler = (id) => {
        setShoWModal(false);
        deleteFunction(id, 'rolls', setRollsState);
    }

    const editHandler = (id) => {
        navigate(`/edit-roll/?rollId=${id}`);
    }

    const addNewUserHandler = () => {
        navigate('/new-roll');
    }
    const footer = (
        <div>
            <Button color="primary" onClick={() => deleteHandler(id)}>Yes</Button>
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
                                            <td>{tdata.name}</td>
                                            <td style={{ borderLeft: 'none', display: "flex", alignContent: "center", justifyContent: "space-around" }}>
                                                <span onClick={() => editHandler(tdata._id.toString())}>
                                                    <i title='Edit' className="bi bi-pencil-square"></i>
                                                </span>
                                                <span onClick={() => showModalHandler(tdata._id.toString())}>
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
        </React.Fragment>
    );
};

export default RollTables;
