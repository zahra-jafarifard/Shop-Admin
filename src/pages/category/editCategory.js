import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

import { fetchDataFunction } from '../../shared/FetchData';
import { submitFunction } from '../../shared/submitHandler';
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
        parent: '',
        getParentCategoriesState: [],

    }]

const reducer = (state, action) => {
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

const Forms = () => {
    const [inputValue, dispatch] = useReducer(reducer, initialState);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFunction('categories/parents')
            dispatch({ type: "FetchParents", _parents: data });
        }
        fetchData();
    }, [dispatch])

    useEffect(() => {
        const _categoryId = searchParams.get("categoryId");
        const fetchData = async () => {
            const data = await fetchDataFunction(`categories/${_categoryId}`)
            dispatch({ type: "FetchCategory", category: data });
        }
        fetchData();
    }, [dispatch, fetchDataFunction])


    const submitHandler = async () => {
        
        const _categoryId = searchParams.get("categoryId");
        const _body = JSON.stringify({
            name: inputValue[0].name,
            parentId: inputValue[0].parent,
        });
        await submitFunction(`categories/${_categoryId}`, 'PATCH', _body , true);
        navigate(-1);

     
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
                            <Button color='primary' onClick={submitHandler}>

                                Submit
                                </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}


export default Forms;
