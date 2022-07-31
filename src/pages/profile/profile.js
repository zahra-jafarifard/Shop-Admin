import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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


const Profile = (props) => {

    const [userState, setUserState] = useState([]);
    const userId = useSelector(state => state.shop.userId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFunction(`users/${userId}`)
            setUserState(data)
        }
        fetchData();
    }, [setUserState])

    const editHandler = (id) => {
        navigate(`/edit-user/?userId=${id}`);

    }

  
    return (

        <Card className={styles.Card}>
            {userState.image && <CardImg alt="Card image cap" name='image'
                src={`http://localhost:5000/upload/${userState.image}`}
                className={styles.Image} />}
            <CardBody className="p-3">
                <CardTitle tag="h5"><i style={{ fontSize: "24px" }} className="bi bi-file-earmark-person-fill"></i> Personal Informatin:</CardTitle>
                <div className={styles.content}>
                <CardText className="mt-3">{userState.name} {userState.family}</CardText>
                <CardText className="mt-3">+98{userState.mobile}</CardText>
                <CardText className="mt-3">{userState.email}</CardText>
                {userState.products &&
                    <CardText className="mt-3">I add {userState.products.length === 0 ? 'zero' : userState.products.length} Products</CardText>}
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button  onClick={() => editHandler(userState.id)}> Edit </Button>
                </div>
                </div>
            </CardBody>
        </Card>


    )
};

export default Profile;