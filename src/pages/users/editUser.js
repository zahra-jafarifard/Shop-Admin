import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

import { fetchDataFunction } from '../../shared/FetchData';
import { Submit } from '../../shared/submitHandler';

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
    FormText,
} from "reactstrap";

const initialState = [
    {
        name: '',
        family: '',
        mobile: '',
        email: '',
        password: '',
        image: '',
        roll: '',
        getRollsState: []
    }]


const reducer = (state, action) => {
    switch (action.type) {
        case "Change":
            return state.map((data) => {
                return { ...data, [action.name]: action.value };
            });
        case "SetRoll":
            return state.map((data) => {
                return {
                    ...data,
                    getRollsState: action._rolls
                };
            });
        case "FetchUser":
            return state.map((data) => {
                return {
                    ...data,
                    name: action.data.name,
                    family: action.data.family,
                    mobile: action.data.mobile,
                    email: action.data.email,
                    password: action.data.password,
                    image: action.data.image,
                    roll: action.data.rollId,
                };
            });
        default:
            return state;
    }
};

const EditUser = (props) => {

    const [inputValue, dispatch] = useReducer(reducer, initialState);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const { submitFunction } = Submit();

    useEffect(() => {
        const _userId = searchParams.get("userId");
        const fetchData = async () => {
            const data = await fetchDataFunction(`users/${_userId}`)
            dispatch({ type: "FetchUser", data });
        }
        fetchData();
    }, [searchParams, dispatch])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFunction('rolls')
            dispatch({ type: "SetRoll", _rolls: data });
        }
        fetchData();
    }, [dispatch])

    const submitHandler =async () => {
        const _userId = searchParams.get("userId");
        const _body = {
            name: inputValue[0].name,
            family: inputValue[0].family,
            mobile: inputValue[0].mobile,
            email: inputValue[0].email,
            password: inputValue[0].password,
            roll: inputValue[0].roll,
                // image: inputValue.image,
        };
        await submitFunction(`users/${_userId}`, 'PATCH', _body);
        navigate(-1);

        // fetch(`http://localhost:5000/users/${_userId}`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         name: inputValue[0].name,
        //         family: inputValue[0].family,
        //         mobile: inputValue[0].mobile,
        //         email: inputValue[0].email,
        //         password: inputValue[0].password,
        //         roll: inputValue[0].roll,
        //         // image: inputValue.image,
        //     })
        // })
        //     .then(res => {
        //         if (!res.ok) {
        //             return new Error(res.message)
        //         }
        //         navigate(-1); //goBack
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
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
                        EDIT USER
                    </CardTitle>
                    <CardBody >
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Type Your Name"
                                    type="text"
                                    value={inputValue[0].name}
                                    onChange={changeHandler}
                                />
                                <Label for="family">Family</Label>
                                <Input
                                    id="family"
                                    name="family"
                                    placeholder="Type Your Family"
                                    type="text"
                                    value={inputValue[0].family}
                                    onChange={changeHandler}
                                />
                                <Label for="mobile">Mobile</Label>
                                <Input
                                    id="mobile"
                                    name="mobile"
                                    placeholder="Type Your Mobile"
                                    type="text"
                                    value={inputValue[0].mobile}
                                    onChange={changeHandler}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Type Your Email"
                                    type="email"
                                    value={inputValue[0].email}
                                    onChange={changeHandler}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Type Your Password"
                                    type="password"
                                    value={inputValue[0].password}
                                    onChange={changeHandler}
                                />
                                {
                                    inputValue[0].getRollsState &&
                                    <div>
                                        <Label for="roll">Roll</Label>
                                        <Input id="roll" name="roll" type="select"
                                            onChange={changeHandler} >
                                            <option defaultChecked>Choose Roll</option>
                                            {inputValue[0].getRollsState.map((roll, index) => {
                                                return <option key={index} value={roll._id.toString()}>{roll.name}</option>
                                            })}
                                        </Input>
                                    </div>
                                }
                                <Label for="file">File</Label>
                                <Input id="image" name="image" type="file"
                                    value={inputValue.image}
                                    onChange={changeHandler} />
                                <FormText>
                                    ADD NEW PHOTO...
                                </FormText>
                            </FormGroup>
                            <Button onClick={(e) => submitHandler(e)}>EDIT</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default EditUser;
