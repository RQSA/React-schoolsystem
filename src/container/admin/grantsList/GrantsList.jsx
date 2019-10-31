import React, { Component } from 'react';
import { Row, Pagination, message, Empty, Modal, List } from 'antd';
import API from '../../../api/api';
import './grantsList.less';

class GranteList extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            grantsinfos: [],
            currentPage: 1,
            modalVisible: false, 
            currentItem: {},
        }
    }

    componentWillMount() {
        this._getGrantsList();
    }

    async _getGrantsList(offset = 0) {
        const params = {
            offset,
        }
        const result = await API.getGrantsList('student', {params});
        const { status, msg, data } = result;
        if (status === 200) {
            const { total: total_num, entitys: grantsinfos } = data;
            this.setState({
                total_num,
                grantsinfos,
            })
        } else {
            message.error(msg);
        }
    }

    // 开启模态框
    handleModalShow = (i) => {
        this.setState({
            modalVisible: true,
            currentItem: this.state.grantsinfos[i],
        })
    }

    // 关闭模态框
    handleModalHide = () => {
        this.setState({
            modalVisible: false,
        })
    }

    // 分页改变回调函数
    handlePageChange = async (page) => {
        this.setState({
            currentPage: page,
        });
        const offset = (page - 1) * 10;
        this._getGrantsList(offset);
        // 获取新的列表数据
    }

    render() {
        const { total_num, grantsinfos, currentPage, modalVisible, currentItem } = this.state;

        return(
            <div className='grants-manage-container'>
                <div className='grants-list-container'>
                    <Row className='header'>资助金类型</Row>
                    <Row className='grants-list'>
                    {
                        grantsinfos.length > 0 ?
                        <List
                            bordered
                            dataSource={grantsinfos}
                            renderItem={(item, index) => {
                                return (
                                    <List.Item className="item" onClick={() => this.handleModalShow(index)}>
                                        {item.name}
                                    </List.Item>
                                )}
                            }
                        />
                        :
                        <Empty description='暂无数据'/>
                    }
                    </Row>
                    <Row className='list-pagination'>
                        <Pagination 
                            current={currentPage} 
                            onChange={this.handlePageChange}
                            total={total_num} 
                            showTotal={total => `共计 ${total} 条记录`}
                        />
                    </Row>
                    {
                        modalVisible ? 
                        <Modal
                            visible={modalVisible}
                            title={currentItem.name}
                            onCancel={this.handleModalHide}
                            footer={null}
                            destroyOnClose
                        >
                            <p className='conditional'>{currentItem.conditional}</p>
                        </Modal>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

export default GranteList;