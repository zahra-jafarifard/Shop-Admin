import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import './signIn.css';
import { login } from '../store/actions/actions';
import { submitFunction } from '../shared/submitHandler';

const SignIn = (props) => {

    const dispatch = useDispatch();

    const [signIn, setSignIn] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [family, setFamily] = useState('');
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    const userId = useSelector(state => state.shop.userId);

    useEffect(() => {
       
        if(userId){
            navigate('/users')
        } 
    }, [userId])

    const authHandler = async () => {
        if (signIn) {
            dispatch(login(email, password));
        }
        else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('family', family);
            formData.append('mobile', mobile);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image);

            const response = await submitFunction('users/signUp', 'POST', formData);
            if (response.userId) {
                navigate('/users')
            }
        }
    }

    const switchHandler = () => {
        setSignIn(prevState => !prevState)
    };
    const fileHandler = (e) => {
        let file = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
            setImage(file);
            console.log("state file front", image);
        };
        fileReader.readAsDataURL(file);
    };

    return (
        <div className="signIn">
            <h2>Sign In</h2>
            <Form className="form">
                <FormGroup>
                    <Label for="exampleEmail">E-mail</Label>
                    <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="example@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}

                    />
                </FormGroup>
                {!signIn &&
                    <div>

                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="family">Family</Label>
                            <Input
                                type="text"
                                name="family"
                                id="family"
                                placeholder="Family"
                                value={family}
                                onChange={(event) => setFamily(event.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="mobile">Mobile</Label>
                            <Input
                                type="number"
                                name="mobile"
                                id="mobile"
                                placeholder="09121234567"
                                value={mobile}
                                onChange={(event) => setMobile(event.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="file">Photo</Label>
                            <Input
                                name="image"
                                id="image"
                                type="file"
                                placeholder="Image"
                                // value={image}
                                onChange={(e) => fileHandler(e)}

                            />
                        </FormGroup>
                    </div>

                }
                <div style={{ textAlign: 'center', margin: '7px 0 ' }} >
                    <Button color='primary' onClick={authHandler}>{signIn ? 'Sign In' : 'Sign Up'}</Button><br />
                </div>

                <div style={{ textAlign: 'center', margin: '5px 0 0 0 ' }}>
                    <Button color='danger' onClick={switchHandler}>{signIn ? 'Switch To Sign up' : 'Switch To Sign In'}</Button><br />
                </div>
            </Form>
        </div>


    );

}


const Login = (props) => {
    return ReactDOM.createPortal(<SignIn>{props.children}</SignIn>, document.getElementById('authDiv') )
}

export default Login;
