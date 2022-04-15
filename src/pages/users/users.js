import React  from 'react';
import UserTables from "./userTable";
import { Row, Col } from "reactstrap";

const Tables = () => {

    return (
        <Row>
            <Col lg="12">
                <UserTables />
            </Col>
        </Row>
    );
};

export default Tables;
