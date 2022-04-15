import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSearchParams } from "react-router-dom";
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

const initialState = [
    {
        name: '',
        parent:'',
        getParentCategoriesState: []

    }]


const reducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case "Change":
            return state.map((data) => {
                return { ...data, [action.name]: action.value };

            });
        case "FetchParents":
            return state.map((data) => {
                return {
                    ...data,
                    getParentCategoriesState: action._parents
                };
            });
        case "FetchCategory":
            return state.map((data) => {
                return {
                    ...data,
                    name: action.category.name,
                    parent: action.category.parentId,
                };
            });
        default:
            return state;
    }
};

const Forms = (props) => {
    const [inputValue, dispatch] = useReducer(reducer, initialState);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();


    useEffect(() => {
        return fetch('http://localhost:5000/categories/parents')
            .then(res => {
                return res.json()
            })
            .then(_parents => {
                // console.log(_parents.parents)
                dispatch({ type: "FetchParents", _parents: _parents.parents });

            })
            .catch(err => {
                console.log(err)
            })

    }, [dispatch])

    useEffect(() => {
        const _categoryId = searchParams.get("categoryId");

        return fetch(`http://localhost:5000/categories/${_categoryId}`)
            .then(res => {
                return res.json()
            })
            .then(_category => {
                console.log(_category.category)
                dispatch({ type: "FetchCategory", category: _category.category });

            })
            .catch(err => {
                console.log(err)
            })

    }, [dispatch])


    const submitHandler = () => {
        const _categoryId = searchParams.get("categoryId");
        fetch(`http://localhost:5000/categories/${_categoryId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: inputValue[0].name,
                parentId: inputValue[0].parent,
            })
        })
            .then(() => {
                console.log('category edited.....', inputValue[0])
                navigate('/categories');

            })
            .catch(err => {
                console.log(err)
            })

    }

    const changeHandler = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        dispatch({ type: "Change", name, value });

    };



    return (
        <Row style={{ width: "60%", margin: "auto", }}>
            <Col>
                <Card style={{ borderRadius: "24px" }}>
                    <CardTitle tag="h5" className="border-bottom p-3 mb-0">
                        <i style={{ fontSize: '23px' }} className="bi bi-person me-2"> </i>
                        EDIT CATEGORY
                    </CardTitle>

                    <CardBody >
                        <Form>
                            {/* {console.log(inputValue[0].getRollsState)} */}
                            {console.log(inputValue)}
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Type Category's Name"
                                    type="text"
                                    value={inputValue[0].name}
                                    onChange={changeHandler}
                                />

                                <Label for="parent">Parent Category</Label>
                                <Input id="parent" name="parent" type="select"

                                    onChange={changeHandler}
                                >
                                    <option defaultChecked>Choose Category</option>
                                    {inputValue[0].getParentCategoriesState.map((parent, index) => {
                                        return <option key={index} value={parent._id.toString()}>{parent.name}</option>
                                    })}
                                </Input>

                            </FormGroup>
                            <Button onClick={submitHandler}>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}


export default Forms;
