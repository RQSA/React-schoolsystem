import * as admin from './actionTypes';

let defaultState = {
    login_status: true,
    admininfo: {
        studentNum:'2016010304145',
        name:'陈锐强',
        sex:1,
        depatmentName:'电子信息学院',
        specialName:'电子信息工程',
        grade:'2016级',
        className:'16电信B班',
        address:'广东饶平'
    },
    type: 'student',
}

const reducer = (state = defaultState, action = {}) => {
    switch(action.type) {
        case admin.INIT_ADMININFO:
            return {
                ...state,
                ...action.adminInfoData,
            };
        case admin.CLEAR_ADMININFO:
            return {
                ...defaultState,
            };
        default:
            return state;
    }
}

export default reducer;