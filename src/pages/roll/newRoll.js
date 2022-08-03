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
} from "reactstrap";
import { graphqlFunction } from '../../shared/graphql';


class NewRoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            getRollsState: [],

        }
    }


    submitHandler = async () => {
        const graphqlQuery = {
            query: `
            mutation{ 
                    addRoll( name:"${this.state.name}"){
                        message
                    }
            }
            `
        };

        await graphqlFunction(graphqlQuery);
        this.props.navigate(-1)
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
                            ADD NEW ROLL
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
                                </FormGroup>
                                <Button color='primary' onClick={this.submitHandler}>Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    };
}

export default withRouter(NewRoll);

