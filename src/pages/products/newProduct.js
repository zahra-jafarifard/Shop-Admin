import React from 'react';
import { withRouter } from '../../shared/withRouter';
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

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', price: '', description: '', image: [],
            category: '', createdByUserId: '',
            getCategoriesState:[],

        }
    }

    componentDidMount = () => {
        return fetch('http://localhost:5000/products/categories')
            .then(res => {
                if (!res.ok) {
                    return new Error(res.message)
                }
                return res.json()
            })
            .then(_categories => {
                this.setState({ getCategoriesState: _categories.categories }, () => {
                    console.log(_categories.categories)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    submitHandler = () => {
        const creatorId ='625456a9156b5221202c6a47';
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                price: this.state.price,
                description: this.state.description,
                image: this.state.image,
                category: this.state.category,
                createdByUserId: creatorId
            })
        })
            .then(res => {
                if (!res.ok) {
                    return new Error(res.message)
                }
                this.props.navigate('/products')
            })
            .catch(err => {
                console.log(err)
            })

    }

    changeHandler = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({ [name]: value });
    };


    render() {

        return (
            <Row style={{ width: "60%", margin: "auto", }}>
                <Col>
                    <Card style={{ borderRadius: "24px" }}>
                        <CardTitle tag="h5" className="border-bottom p-3 mb-0">
                            <i style={{ fontSize: '23px' }} className="bi bi-person me-2"> </i>
                            ADD NEW PRODUCT
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
                                        value={this.state.name}
                                        onChange={this.changeHandler}
                                    />
                                    <Label for="price">Price</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        placeholder="Type Product's Price"
                                        type="text"
                                        value={this.state.price}
                                        onChange={this.changeHandler}
                                    />
                                    <Label for="description">Description</Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="Type Description Of Product"
                                        type="text"
                                        value={this.state.description}
                                        onChange={this.changeHandler}
                                    />


                                    <Label for="category">Main Category</Label>
                                    <Input id="category" name="category" type="select"

                                        onChange={this.changeHandler}
                                    >
                                        <option defaultChecked>Choose Category</option>
                                        {this.state.getCategoriesState.map((parent, index) => {
                                            console.log(parent)
                                            return <option key={index} value={parent.id.toString()}>{parent.name}</option>
                                        })}
                                    </Input>
                                    
                                    <Label for="file">File</Label>
                                    <Input id="file" name="file" type="file" value={this.state.image}
                                        onChange={this.changeHandler} />
                                    <FormText>
                                        ADD PRODUCTS' PHOTO...
                                    </FormText>
                                </FormGroup>
                                <Button onClick={this.submitHandler}>Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    };
}


export default withRouter(Forms);

