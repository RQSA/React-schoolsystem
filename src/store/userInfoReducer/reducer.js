import * as user from './actionTypes';

let defaultState = {
    login_status: false,
    userinfo: {},
}

const reducer = (state = defaultState, action = {}) => {
    switch(action.type) {
        case user.INIT_USERINFO:
            return {
                ...state,
                ...action.userInfoData,
            };
        case user.CHANGE_USERINFO:
            return {
                ...state,
                userinfo: {
                    ...state.userinfo,
                    ...action.userInfo
                }
            };
        case user.CLEAR_USERINFO:
            return {
                ...defaultState,
            };
        default:
            return state;
    }
}

export default reducer;