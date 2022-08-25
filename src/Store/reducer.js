import cookies from 'react-cookies';
import {
    SET_USERNAME_INPUT,
    SET_PASSWORD_INPUT,
    SET_REPASSWORD_INPUT,
    SET_CHECK_USER_VALID,
    SET_CHECK_PASS_VALID,
    SET_CHECK_REPASS_VALID,
    USER_LOGIN,
} from './Constants';

const initState = {
    userLogin: cookies.load('origin-movie-user'),
    userName: '',
    password: '',
    rePassword: '',
    checkUserValid: '',
    checkPassValid: '',
    checkRePassValid: '',
};

function reducer(state, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                userLogin: action.payload,
            };
        case SET_USERNAME_INPUT:
            return {
                ...state,
                userName: action.payload,
            };
        case SET_PASSWORD_INPUT:
            return {
                ...state,
                password: action.payload,
            };
        case SET_REPASSWORD_INPUT:
            return {
                ...state,
                rePassword: action.payload,
            };
        case SET_CHECK_USER_VALID:
            return {
                ...state,
                checkUserValid: action.payload,
            };
        case SET_CHECK_PASS_VALID:
            return {
                ...state,
                checkPassValid: action.payload,
            };
        case SET_CHECK_REPASS_VALID:
            return {
                ...state,
                checkRePassValid: action.payload,
            };
        default:
            throw new Error('Invalid action');
    }
}

export { initState };
export default reducer;
