import React, { Component } from 'react';
import { Row, Pagination, message, Empty, Modal, List } from 'antd';
import API from '../../../api/api';
import './noticeList.less';

class NoticeList extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            noticeinfos: [],
            currentPage: 1,
            modalVisible: false, 
            currentItem: {},
        }
    }

    componentWillMount() {
        this._getNoticeList();
    }

    // 获取公告列表
    async _getNoticeList(offset = 0) {
        const params = {
            offset,
        }
        const result={
            status:200,
            msg:'',
            data:{
                total: 1
            
            }
        }
        // const result = await API.getNoticeList('student', {params});
        const { status, msg, data } = result;
        if (status === 200) {
            const { total: total_num, entitys: noticeinfos } = data;
            this.setState({
                total_num,
                noticeinfos,
            })
        } else {
            message.error(msg);
        }
    }


    // 开启模态框
    handleModalShow = (i) => {
        this.setState({
            modalVisible: true,
            currentItem: this.state.noticeinfos[i],
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
        this._getNoticeList(offset);
        // 获取新的列表数据
    }

    render() {
        const { total_num, noticeinfos, currentPage, modalVisible, currentItem } = this.state;

        return(
            <div className='notice-manage-container'>
                <div className='notice-list-container'>
                    <Row className='header'>公告</Row>
                    <Row className='notice-list'>
                    {
                        noticeinfos.length > 0 ?
                        <List
                            bordered
                            dataSource={noticeinfos}
                            renderItem={(item, index) => {
                                return (
                                    <List.Item className="item" onClick={() => this.handleModalShow(index)}>
                                        {item.title}
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
                            title={currentItem.title}
                            onCancel={this.handleModalHide}
                            footer={null}
                            destroyOnClose
                        >
                            <div className='time'>发布时间：{currentItem.publishTime}</div>
                            <p className='content'>{currentItem.content}</p>
                        </Modal>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

export default NoticeList;