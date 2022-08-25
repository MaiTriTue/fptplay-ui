import {
    USER_LOGIN,
    SET_USERNAME_INPUT,
    SET_PASSWORD_INPUT,
    SET_REPASSWORD_INPUT,
    SET_CHECK_USER_VALID,
    SET_CHECK_PASS_VALID,
    SET_CHECK_REPASS_VALID,
} from './Constants';

export const setUserNameInput = (payload) => ({
    type: SET_USERNAME_INPUT,
    payload,
});
export const setPasswordInput = (payload) => ({
    type: SET_PASSWORD_INPUT,
    payload,
});
export const setRePasswordInput = (payload) => ({
    type: SET_REPASSWORD_INPUT,
    payload,
});
export const setCheckUserValid = (payload) => ({
    type: SET_CHECK_USER_VALID,
    payload,
});
export const setCheckPassValid = (payload) => ({
    type: SET_CHECK_PASS_VALID,
    payload,
});
export const setCheckRePassvalid = (payload) => ({
    type: SET_CHECK_REPASS_VALID,
    payload,
});
export const setUserLogin = (payload) => ({
    type: USER_LOGIN,
    payload,
});
