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
        getRollsState: []
    }]


const reducer = (state, action) => {
    console.log(state, action)
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

const Forms = (props) => {
    const [inputValue, dispatch] = useReducer(reducer, initialState);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();




    useEffect(() => {
        const _rollId = searchParams.get("rollId");
        console.log(_rollId)

        return fetch(`http://localhost:5000/rolls/${_rollId}`)
            .then(res => {
                if (!res.ok) {
                    return new Error(res.message)
                }
                return res.json()
            })
            .then(roll => {
                return dispatch({
                    type: "FetchRoll", _roll: roll.roll
                });
            })
            .catch(err => {
                console.log(err)
            })

    }, [dispatch])

    const submitHandler = (event) => {
        // event.preventDefault();
        const _rollId = searchParams.get("rollId");

        fetch(`http://localhost:5000/rolls/${_rollId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: inputValue[0].name,
            })
        })
            .then(res => {
                if (!res.ok) {
                    return new Error(res.message)
                }
                navigate('/rolls');
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
                        EDIT ROLL
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
                                    placeholder="Type Roll's Name"
                                    type="text"
                                    value={inputValue[0].name}
                                    onChange={changeHandler}
                                />
                             
                            </FormGroup>
                            <Button onClick={(e) => submitHandler(e)}>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}


export default Forms;
