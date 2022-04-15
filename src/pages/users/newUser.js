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
            name: '', family: '', mobile: '', email: '', password: '', image: '', roll: '',
            getRollsState: []
        }
    }

    componentDidMount = () => {
        return fetch('http://localhost:5000/rolls')
            .then(res => {
                return res.json()
            })
            .then(_rolls => {
                this.setState({ getRollsState: _rolls.rolls }, () => {
                    console.log(_rolls.rolls)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    submitHandler = () => {

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                family: this.state.family,
                mobile: this.state.mobile,
                email: this.state.email,
                password: this.state.password,
                image: this.state.image,
                roll: this.state.roll,
            })
        })
            .then(() => {
                this.props.navigate('/users')
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
                                        {this.state.getRollsState.map((roll, index) => {
                                            return <option key={index} value={roll._id.toString()}>{roll.name}</option>
                                        })}
                                    </Input>
                                    <Label for="file">File</Label>
                                    <Input id="file" name="file" type="file" value={this.state.image}
                                        onChange={this.changeHandler} />
                                    <FormText>
                                        ADD YOUR PHOTO...
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
