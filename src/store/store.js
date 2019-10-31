import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userInfoData from './userInfoReducer/reducer';
import adminInfoData from './adminInfoReducer/reducer';
import homeItemData from './homeItemReducer/reducer';

let store = createStore(
    combineReducers({userInfoData, adminInfoData, homeItemData}),
    applyMiddleware(thunk),
);

export default store;