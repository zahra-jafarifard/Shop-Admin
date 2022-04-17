import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchDataFunction } from '../../shared/FetchData';
import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
} from "reactstrap";
import * as styles from './profile.module.css'
import user1 from "../../assets/images/users/user1.jpg";


const Profile = (props) => {

    const [userState, setUserState] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFunction('users/6254477242a4797d06e7b652')
            setUserState(data)
        }
        fetchData();
    }, [setUserState])

    const editHandler = (id) => {
        console.log(id)
        navigate(`/edit-user/?userId=${id}`);

    }

    return (

        <Card>
            <CardImg alt="Card image cap" src={user1} className={styles.Image} />
            <CardBody className="p-4">
                <CardTitle tag="h5"><i style={{ fontSize: "24px" }} className="bi bi-file-earmark-person-fill"></i> Personal Informatin:</CardTitle>
                <CardSubtitle></CardSubtitle>
                <CardText className="mt-3">{userState.name}{userState.family}</CardText>
                <CardText className="mt-3">{userState.mobile}</CardText>
                <CardText className="mt-3">{userState.email}</CardText>
                {userState.products &&
                    <CardText className="mt-3">I add {userState.products.length == 0 ? 'zero' : userState.products.length} Products</CardText>}
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button color={props.color} onClick={() => editHandler(userState.id)}> Edit </Button>
                </div>

            </CardBody>
        </Card>


    )
};

export default Profile;