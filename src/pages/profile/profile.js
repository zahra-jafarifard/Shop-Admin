import React from 'react';
// import { useNavigate } from 'react-router-dom';

import * as styles from './profile.module.css'
import user1 from "../../assets/images/users/user1.jpg";
import { Button } from 'reactstrap';

const Profile = () => {

    // const navigate = useNavigate();

    const editHandler = (id) =>{
        // navigate(`/edit-user/?userId=${id}`);
    
    }

    return (
        <div className={styles.Card}>
            <div className={styles.Image}>
                <img
                    src={user1}
                    alt="profile"
                    className="rounded-circle"
                    width="210"
                    height="210"
                ></img>
            </div>
            <div className={styles.body}>
                <label>Zahra Jafarifar</label><br/>
                <label>09353140175</label><br/>
                <label>jafarifardz@gmail.com</label><br/>
            </div>
            <div  className={styles.submit}>

            <Button onClick={(id) => editHandler(id)} >EDIT</Button>
            </div>
        </div>
    )
};

export default Profile;