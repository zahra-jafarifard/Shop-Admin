import React, { useReducer, useEffect , useState} from 'react';
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
        name: '', price: '', description: '', image: '',

    }]


const reducer = (state, action) => {
    // console.log(state, action)
    switch (action.type) {
        case "Change":
            return state.map((data) => {
                return {
                    ...data,
                    [action.name]: action.value
                };
            });
        case "FetchProduct":
            return state.map((data) => {
                return {
                    ...data,
                    name: action.data.name,
                    price: action.data.price,
                    description: action.data.description,
                    image: action.data.image,
                };
            });
        default:
            return state;
    }
};

const EditProduct = (props) => {
    const [inputValue, dispatch] = useReducer(reducer, initialState);
    const [searchParams, setSearchParams] = useSearchParams();
    const [image , setImage] = useState('')
    const navigate = useNavigate();

    const { submitFunction } = Submit()


    useEffect(() => {
        const _productId = searchParams.get("productId");
        const fetchData = async () => {
            const data = await fetchDataFunction(`products/${_productId}`)
            dispatch({ type: "FetchProduct", data });
        }
        fetchData();
    }, [searchParams, dispatch])


    const submitHandler = async () => {
        const _productId = searchParams.get("productId");
        const _body = new FormData();
        _body.append('name', inputValue[0].name);
        _body.append('price', inputValue[0].price);
        _body.append('description', inputValue[0].description);
        _body.append('image', inputValue[0].image);

        await submitFunction(`products/${_productId}`, 'PATCH', _body);
        navigate(-1);
    }
    const fileHandler = (e) => {
        let file = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
            setImage(file)
            // this.setState({ image: file }, () => {
                // this.setState({ image: file, preview: fileReader.result }, () => {
                console.log("state file front",image);
            // });
        };
        fileReader.readAsDataURL(file);
    };

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
                                <Input id="image" name="image" type="file"
                                    onChange={fileHandler} />
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

export default EditProduct;
