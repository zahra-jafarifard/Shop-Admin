import React from 'react';
import { withRouter } from '../../shared/withRouter';
import { connect } from 'react-redux';
import { fetchDataFunction } from '../../shared/FetchData';
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
import { submitFunction } from '../../shared/submitHandler';

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', price: '', description: '', image:'',
            category: '', createdByUserId: '',
            getCategoriesState: [],

        }
    }

    componentDidMount = () => {
        const fetchData = async () => {
            const data = await fetchDataFunction('products/categories')
            this.setState({ getCategoriesState: data })
        }
        fetchData();
    }

    submitHandler = async () => {
        const creatorId = this.props.userId;
        const _body = new FormData();
        _body.append('name', this.state.name);
        _body.append('price', this.state.price);
        _body.append('description', this.state.description);
        _body.append('image', this.state.image);
        _body.append('category', this.state.category);
        _body.append('createdByUserId', creatorId);

        await submitFunction('products', 'POST', _body);
        this.props.navigate(-1)
      
    }

    changeHandler = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({ [name]: value });
    };
    fileHandler = (e) => {
        let file = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
            this.setState({ image: file }, () => {
                // this.setState({ image: file, preview: fileReader.result }, () => {
                console.log("state file front", this.state.image);
            });
        };
        fileReader.readAsDataURL(file);
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
                                        {this.state.getCategoriesState?.map((parent, index) => {
                                            return <option key={index} value={parent.id.toString()}>{parent.name}</option>
                                        })}
                                    </Input>
                                    <Label for="file">File</Label>
                                    <Input id="image" name="image" type="file" 
                                        onChange={this.fileHandler} />
                                    <FormText>
                                        ADD PRODUCTS' PHOTO...
                                    </FormText>
                                </FormGroup>
                                <Button color='primary' onClick={this.submitHandler}>ADD</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    };
}

const mapStateToProps = (state) => {
    console.log('states' , state)
    return {
        userId: state.shop.userId
    }
}
export default connect(mapStateToProps, null)(withRouter(Forms));

