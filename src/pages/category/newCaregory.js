import React from 'react';
import { withRouter } from '../../shared/withRouter';

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
} from "reactstrap";

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            parent: '',
            getParentCategoriesState: [],

        }
    }

    componentDidMount = () => {
        const fetchData = async () => {
            const data = await fetchDataFunction('categories/parents')
            this.setState({ getParentCategoriesState: data })
        }
        fetchData();
    }

    submitHandler = () => {
        fetch('http://localhost:5000/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                parent: this.state.parent,
            })
        })
            .then(res => {
                if (!res.ok) {
                    return new Error(res.message)
                }
                return res.json();
            })
            .then(() => {
                this.props.navigate('/categories')
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
                            ADD NEW CATEGORY
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

                                    <Label for="parent">Parent Category</Label>
                                    <Input id="parent" name="parent" type="select"

                                        onChange={this.changeHandler}
                                    >
                                        <option defaultChecked>Choose Category</option>
                                        <option value=''>Parent Category</option>
                                        {this.state.getParentCategoriesState.map((parent, index) => {
                                            return <option key={index} value={parent._id.toString()}>{parent.name}</option>
                                        })}
                                    </Input>

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

