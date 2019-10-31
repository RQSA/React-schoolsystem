import * as admin from './actionTypes';
import API from '../../api/api';

// 初始化管理员信息
export const initAdminInfo = () => {
    return async dispatch => {
        try {
            let result = await API.getLoginInfo();
            dispatch({
                type: admin.INIT_ADMININFO,
                adminInfoData: {
                    login_status: result.status === 200 ? true : false,
                    admininfo: result.data.info || {},
                    type: result.data.type || '',
                }
            })
        } catch(err) {
            console.error(err);
        }
    }
}

// 注销管理员信息
export const clearAdminInfo = () => {
    return async dispatch => {
        try {
            await API.adminSignOut();
            dispatch({
                type: admin.CLEAR_ADMININFO,
            })
        } catch(err) {
            console.error(err);
        }
    }
}