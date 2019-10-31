import * as home from './actionTypes';

let defaultState = {
     /**
   * 商品数据
   * @type {Array}
   * example: [{
   *    columnName: "", 专区名字
   *    columnItems: [{
   *        itemName: '', 专区项名字
   *        itemWord: '', 专区项单字
   *    }], 专区项列表 
   * }]
   */
   columnList: [{
        columnName: '资源专区',
        columnItems: [{
            itemName: '影视资源',
            itemWord: '影',
            type: 'movie',
        },{
            itemName: '学习资源',
            itemWord: '学',
            type: 'study',
        },{
            itemName: '教程分享',
            itemWord: '教',
            type: 'course',
        }]
   }],
}

const reducer = (state = defaultState, action = {}) => {
    return state;
}

export default reducer;