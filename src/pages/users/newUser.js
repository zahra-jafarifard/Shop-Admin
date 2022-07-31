import React from 'react';

import { fetchDataFunction } from '../../shared/FetchData';
import { withRouter } from '../../shared/withRouter';
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
    FormText,
} from "reactstrap";


class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', family: '', mobile: '', email: '', password: '', image: '', roll: '',
            getRollsState: []
        }
    }

    componentDidMount = () => {
        const fetchData = async () => {
            const data = await fetchDataFunction('rolls')
            this.setState({ getRollsState: data })
        }
        fetchData();
    }

    submitHandler = async () => {

        const _body = new FormData();
        _body.append('name', this.state.name);
        _body.append('family', this.state.family);
        _body.append('mobile', this.state.mobile);
        _body.append('email', this.state.email);
        _body.append('password', this.state.password);
        _body.append('roll', this.state.roll);
        _body.append('image', this.state.image);

        await submitFunction('users', 'POST', _body);
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
                            ADD NEW USER
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
                                    <Label for="family">Family</Label>
                                    <Input
                                        id="family"
                                        name="family"
                                        placeholder="Type Your Family"
                                        type="text"
                                        value={this.state.family}
                                        onChange={this.changeHandler}
                                    />
                                    <Label for="mobile">Mobile</Label>
                                    <Input
                                        id="mobile"
                                        name="mobile"
                                        placeholder="Type Your Mobile"
                                        type="text"
                                        value={this.state.mobile}
                                        onChange={this.changeHandler}
                                    />
                                    <Label for="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="Type Your Email"
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.changeHandler}
                                    />
                                    <Label for="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        placeholder="Type Your Password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.changeHandler}
                                    />
                                    <Label for="roll">Roll</Label>
                                    <Input id="roll" name="roll" type="select"
                                        onChange={this.changeHandler}
                                    >
                                        <option defaultChecked>Choose Roll</option>

                                        {this.state.getRollsState?.map((roll, index) => {
                                            return <option key={index} value={roll._id.toString()}>{roll.name}</option>
                                        })}
                                    </Input>
                                    <Label for="file">File</Label>
                                    <Input id="image" name="image" type="file"
                                        // value={this.state.image}
                                        onChange={this.fileHandler} />
                                    <FormText>
                                        ADD YOUR PHOTO...
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
export default withRouter(NewUser);
