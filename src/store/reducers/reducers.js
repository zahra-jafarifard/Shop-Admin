const initialState = {
    token: '',
    userId: '',
    email: '',
    error: '',
    expireTime: ''
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.token,
                email: action.email,
                userId: action.userId

            };
        case 'LOGIN_FAILED':
            return {
                ...state,
                error: action.error
            };
        case 'LOGOUT':
            return {
                userId: '',
                email: '',
                token: '',
                expireTime: '',
                error: '',
            };

        default:
            return state;
    }
};

export default AuthReducer;
