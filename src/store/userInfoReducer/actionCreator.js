import * as user from './actionTypes';
import API from '../../api/api';

// 初始化用户信息
export const initUserInfo = () => {
    return async dispatch => {
        try {
            let result = await API.getUserInfo();
            dispatch({
                type: user.INIT_USERINFO,
                userInfoData: result,
            })
        } catch(err) {
            console.error(err);
        }
    }
}

// 修改用户信息
export const changeUserInfo = (data) => {
    return async dispatch => {
        try {
            let result = await API.changeUserInfo({data});
            dispatch({
                type: user.CHANGE_USERINFO,
                userInfo: result.userinfo,
            })
            return result;
        } catch(err) {
            console.error(err);
        }
    }
}

// 注销用户信息
export const clearUserInfo = () => {
    return async dispatch => {
        try {
            await API.userSignOut();
            dispatch({
                type: user.CLEAR_USERINFO,
            })
        } catch(err) {
            console.error(err);
        }
    }
}