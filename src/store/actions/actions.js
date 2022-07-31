// import * as actionTypes from "./actionTypes";

export const loginRequest = (email, token, userId, expTime) => {
    return {
        type: 'LOGIN',
        email: email,
        token: token,
        userId: userId,
        expirationTime: expTime,
    };
};

export const loginFailed = (err) => {
    return {
        type: 'LOGIN_FAILED',
        error: err,
    };
};



export const login = (email, password) => {
    // console.log(email, password)
    return (dispatch) => {
        return fetch('http://localhost:5000/users/signIn', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                if (response.status === 422 || response.status === 403 || (!response.ok)) {
                    return response.json().then((res) => {
                        return dispatch(loginFailed(res.message));
                    });
                }
                else {
                    return response.json();
                }
            })
            .then((res) => {


                const expirationTime = new Date(new Date().getTime() + 3600000);
                // console.log(res)
                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        userId: res.userId,
                        token: res.token,
                    })
                );
                localStorage.setItem(
                    'expiresIn',
                    JSON.stringify({
                        expiresIn: expirationTime,
                    })
                );

                dispatch(loginRequest(res.email, res.token, res.userId, expirationTime));
                dispatch(checkAuthTimeout(expirationTime));
            })
            .catch((e) => {
                console.log(e);
            });
    };
};

export const Logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("expiresIn");
    return {
        type: 'LOGOUT',
    };
};




export const authCheckState = () => {
    return (dispatch) => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            const token = userData.token;
            if (!token) {
                console.log("userDataLOcal toooooken redux", token);
                dispatch(Logout());
            } else {
                const expirationTime = JSON.parse(localStorage.getItem("expiresIn"));
                if (new Date(expirationTime.expiresIn) <= new Date()) {
                    dispatch(Logout());
                } else {
                    const remainingTime = parseInt(
                        (new Date(expirationTime.expiresIn).getTime() -
                            new Date().getTime()) /
                        1000
                    );
                    // console.log("remainingTime", remainingTime);
                    dispatch(loginRequest(userData.email, userData.token, userData.userId, remainingTime));
                    dispatch(checkAuthTimeout(remainingTime));
                }
            }
        }
    };
};

export const checkAuthTimeout = (expTime) => {
    return (dispatch) => {
        // console.log('checkAuthTimeout', expTime)
        setTimeout(() => {
            // dispatch(Logout());
        }, expTime * 1000);
    };
};