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
    FormText,
} from "reactstrap";

const initialState = [
    {
        name: '', price: '', description: '', images: [],
        
    }]


const reducer = (state, action) => {
    // console.log(state, action)
    switch (action.type) {
        case "Change":
            return state.map((data) => {
                return { ...data, [action.name]: action.value };

            });
        case "FetchProduct":
            return state.map((data) => {
                return {
                    ...data,
                    name: action._product.name,
                    price: action._product.price,
                    description: action._product.description,
                    // images: action._product.images,
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
        const _productId = searchParams.get("productId");
        return fetch(`http://localhost:5000/products/${_productId}`)
            .then(res => {
                if (!res.ok) {
                    return new Error(res.message)
                }
                return res.json()
            })
            .then(product => {
                const _product = product.product;
                dispatch({ type:"FetchProduct", _product });
            }).catch(err => {
                console.log(err);
            })

    }, [searchParams, dispatch])


    const submitHandler = () => {
        const _productId = searchParams.get("productId");

        fetch(`http://localhost:5000/products/${_productId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: inputValue[0].name,
                price: inputValue[0].price,
                description: inputValue[0].description,
                // image: inputValue.image,
            })
        })
            .then(res => {
                if (!res.ok) {
                    return new Error(res.message)
                }
                navigate('/products');
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
                        EDIT PRODUCT
                    </CardTitle>

                    <CardBody >
                        <Form>
                            {/* {console.log(inputValue[0].getRollsState)} */}
                            {/* {console.log(inputValue)} */}
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Type Product's Name"
                                    type="text"
                                    value={inputValue[0].name}
                                    onChange={changeHandler}
                                />
                                <Label for="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    placeholder="Type Product's Price "
                                    type="text"
                                    value={inputValue[0].price}
                                    onChange={changeHandler}
                                />
                                <Label for="description">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    placeholder="Type Product's Description"
                                    type="text"
                                    value={inputValue[0].description}
                                    onChange={changeHandler}
                                />

                                <Label for="file">File</Label>
                                <Input id="images" name="images" type="file"
                                    value={inputValue[0].images}
                                    onChange={changeHandler} />
                                <FormText>
                                    ADD NEW PHOTO...
                                </FormText>
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
