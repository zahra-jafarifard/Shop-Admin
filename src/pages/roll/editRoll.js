import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

import { fetchDataFunction } from '../../shared/FetchData';
import { graphqlFunction } from '../../shared/graphql';

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
        getRollsState: []
    }]


const reducer = (state, action) => {
    switch (action.type) {
        case "Change":
            return state.map((data) => {
                return { ...data, [action.name]: action.value };
            });
        case "FetchRoll":
            return state.map((data) => {
                return {
                    ...data,
                    name: action._roll.name,
                };
            });
        default:
            return state;
    }
};

const EditRoll = (props) => {
    const [inputValue, dispatch] = useReducer(reducer, initialState);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();


    useEffect(() => {
        const _rollId = searchParams.get("rollId");
        const fetchData = async () => {
            const graphqlQuery = {
                query: `
                        { 
                            getRollById(id:"${_rollId}" ){
                                _id
                                name
                            }
                        }
                        `
            };

            const data = await graphqlFunction(graphqlQuery);
            return dispatch({ type: "FetchRoll", _roll: data.getRollById });

        }
        fetchData();
    }, [dispatch, fetchDataFunction])


    const submitHandler = async () => {
        const _rollId = searchParams.get("rollId");
        const graphqlQuery = {
            query: `
            mutation{ 
                        updateRoll(id:"${_rollId}" , name:"${inputValue[0].name}"){
                            message
                        }
                    }
                        `
        };
        await graphqlFunction(graphqlQuery);
        navigate(-1)
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
                        EDIT ROLL
                    </CardTitle>
                    <CardBody >
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Type Roll's Name"
                                    type="text"
                                    value={inputValue[0].name}
                                    onChange={changeHandler}
                                />
                            </FormGroup>
                            <Button color='primary' onClick={(e) => submitHandler(e)}>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default EditRoll;
