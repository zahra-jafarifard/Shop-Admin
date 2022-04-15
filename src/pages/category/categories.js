import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Table, Col, Row } from "reactstrap";
import { useNavigate } from 'react-router-dom';

import styles from './categoryTable.module.css';

const UserTables = (props) => {

    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');
    const [categoriesState, setCategoriesState] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        return fetch('http://localhost:5000/categories')
            .then(res => {
                return res.json()
            })
            .then(_categories => {
                setCategoriesState(_categories.categories)
                console.log(_categories.categories)
            })
            .catch(err => {
                console.log(err)
            });

    }, [setCategoriesState])

    const editHandler = (id) => {
        navigate(`/edit-category/?categoryId=${id}`);
    }


    const deleteHandler = (id) => {

        if (window.confirm("ARE YOU SURE?") === true) {

            setCategoriesState(prevCategory => prevCategory.filter(category => category._id.toString() !== id))
            fetch(`http://localhost:5000/categories/${id}`, {
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
        navigate('/new-category');
    }


    return (
        <div>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            <i className="bi bi-card-text me-2"> </i>
                            List Of Categories
                        </CardTitle>
                        <CardTitle title='Add New Category'
                            className={styles.addNew}
                            onClick={addNewUserHandler} >
                            <i className="bi bi-bookmark-plus-fill"></i>
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
                                                {console.log(name)}
                                                <td>{tdata.name}</td>
                                                {!tdata.parentId.name ? 'no'}
                                                <td>{tdata.parentId.name}</td>

                                                <td style={{  borderLeft:'none' ,display: "flex", alignContent: "center", justifyContent: "space-around" }}>
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
