import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardBody, CardTitle, Table, Col, Row, Button } from "reactstrap";
import styles from './categoryTable.module.css';
import { Delete } from '../../shared/deleteHandler';
import Modal from '../../shared/modal';
import { fetchDataFunction } from '../../shared/FetchData';

const CategoryTables = () => {

    const [categoriesState, setCategoriesState] = useState([]);
    const [showModal, setShoWModal] = useState(false);
    const [id, setId] = useState();
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const { deleteFunction } = Delete();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFunction('categories');
            setCategoriesState(data);
        }
        fetchData();
    }, [setCategoriesState])

    const editHandler = (id) => { navigate(`/edit-category/?categoryId=${id}`); }

    const showModalHandler = (id) => {
        setShoWModal(true);
        setId(id);
    }
    const cancelHandler = () => { setShoWModal(false); }

    const deleteHandler = async (id) => {
        setShoWModal(false);
        deleteFunction(id, 'categories', setCategoriesState);
    }

    const addNewHandler = () => { navigate('/new-category'); }

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
                            List Of Categories
                            <i onClick={addNewHandler} className={`bi bi-bookmark-plus-fill ${styles.addNew}`}></i>
                        </CardTitle>
                        <CardBody className="">
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Parent Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoriesState.map((tdata, index) => (
                                        <tr key={index} className="border-top">
                                            <td>{tdata.name}</td>
                                            {!tdata.parentId ?
                                                <td style={{ fontWeight: "bold" }}>It's a parent </td>
                                                :
                                                <td>{tdata.parentId.name}</td>}
                                            <td style={{ borderLeft: 'none', display: "flex", alignContent: "center", justifyContent: "space-around" }}>
                                                <span onClick={() => editHandler(tdata._id)}>
                                                    <i title='Edit' className="bi bi-pencil-square"></i>
                                                </span>
                                                <span style={{ zIndex: '33' }} onClick={() => showModalHandler(tdata._id)}  >
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

export default CategoryTables;
