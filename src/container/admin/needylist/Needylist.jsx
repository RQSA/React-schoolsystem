import React, { Component } from 'react';
import { Row, message, Table, Empty } from 'antd';
import API from '../../../api/api';
import './needylist.less';

class NeedyList extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            needyinfos: [],
        }
    }

    componentWillMount() {
        this._getNeedyList();
    }

    async _getNeedyList(offset = 0) {
        const params = {
            offset,
        }
        const result = await API.getNeedyList({params});
        
        const { status, msg, data } = result;
        if (status === 200) {
            this.setState({
                needyinfos: data.entitys || [],
            });
        } else {
            message.error(msg);
        }
    }

    render() {
        const { needyinfos } = this.state;
        const columns = [{
            title: '姓名',
            dataIndex: 'studentName',
            key: 'studentName',
        },{
            title: '学号',
            dataIndex: 'studentNum',
            key: 'studentNum',
        },{
            title: '系别',
            dataIndex: 'depatmentName',
            key: 'depatmentName',
        },{
            title: '专业',
            dataIndex: 'specialName',
            key: 'specialName',
        },{
            title: '班级',
            dataIndex: 'className',
            key: 'className',
        },{
            title: '资助金类型',
            dataIndex: 'typeName',
            key: 'typeName',
        },{
            title: '资助金额',
            dataIndex: 'money',
            key: 'money',
            render: it => it * 1000
        },]
            
        
        return(
            <div className='needylist-manage-container'>
                <Row className='header'>资助名单公示</Row>
            {
                needyinfos.length ?
                <Table columns={columns} dataSource={needyinfos} />
                :
                <Empty description="暂无数据"/>
            }
            </div>
        )
    }
}

export default NeedyList;