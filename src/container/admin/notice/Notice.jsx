import React, { Component } from 'react';
import { Collapse, Row, Col, Button, Pagination, message, Popconfirm, Empty, Modal, Form, Input } from 'antd';
import API from '../../../api/api';
import './notice.less';

const Panel = Collapse.Panel;

class Notice extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            noticeinfos: [],
            currentPage: 1,
            addModalVisible: false, 
            modifyModalVisible: false, 
            currentModify: {},
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
        const result = await API.getNoticeList('admin', {params});
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

    // 分页保持函数
    _keepPage() {
        const { noticeinfos, currentPage } = this.state;
        if (noticeinfos.length === 1 && currentPage > 1) {
            this.handlePageChange(currentPage - 1);
        } else {
            this.handlePageChange(currentPage)
        }
    }

    // 开启模态框
    handleAddmodalShow = () => {
        this.setState({
            addmodalVisible: true,
        })
    }
    
    // 开启模态框
    handleModifymodalShow = (info, e) => {
        e.stopPropagation();
        this.setState({
            modifymodalVisible: true,
            currentModify: info,
        })
    }

    // 关闭模态框
    handleAddmodalHide = () => {
        this.setState({
            addmodalVisible: false,
        })
    }

    // 关闭模态框
    handleModifymodalHide = () => {
        this.setState({
            modifymodalVisible: false,
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

    // 删除确认回调
    handleDeleteClick = async (id, e) => {
        e.stopPropagation();
        const result = await API.deleteNotice(id);
        const { status, msg } = result;
        if (status === 200) {
            this._keepPage();
            message.success(msg);
        } else {
            message.error(msg);
        }
    }

    // 按钮冒泡去除
    handelBtnClick = e => {
        e.stopPropagation();
    }

    // 增加公告回调
    handleAddNotice = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { title, content } = values;
                const data = {
                    title,
                    content,
                }
                const result = await API.addNotice({data});
                const { status, msg } = result;
                if(status === 200) {
                    this._keepPage();
                    this.handleAddmodalHide();
                    message.success(msg);
                } else {
                    message.error(msg);
                }
            }
        })
    }

    // 修改公告回调
    handleModifyNotice = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { title, content } = values;
                const data = {
                    id: this.state.currentModify.id,
                    title,
                    content,
                }
                const result = await API.modifyNotice({data});
                const { status, msg } = result;
                if(status === 200) {
                    this._keepPage();
                    this.handleModifymodalHide();
                    message.success(msg);
                } else {
                    message.error(msg);
                }
            }
        })
    }

    render() {
        const { total_num, noticeinfos, currentPage, addmodalVisible, modifymodalVisible, currentModify } = this.state;
        const { getFieldDecorator } = this.props.form;
        const PanelHeader = (props) => {
            const { id, publishTime } = props.noticeinfos;
            return (
                <Row className='panel-header'>
                    <Col span={8}>{`5328001201200${id}`}</Col>
                    <Col span={8}>{publishTime}</Col>
                    <Col span={8}>
                        <Button onClick={(e) => this.handleModifymodalShow(props.noticeinfos, e)}>修改</Button>
                        <Popconfirm 
                            title="一旦删除不可恢复，确定删除嘛？" 
                            onCancel={this.handelBtnClick}
                            onConfirm={(e) => this.handleDeleteClick(id, e)} 
                            okText="确定" 
                            cancelText="取消"
                            placement="topRight"
                        >
                            <Button type='danger' onClick={this.handelBtnClick}>删除</Button>
                        </Popconfirm>
                    </Col>
                </Row>
            )
        };
        const PanelCentent = (props) => {
            const { title, content } = props.noticeinfos;
            
            return(
                <Row className='panel-content'>
                    <Col span={24} className='content-item'>
                        <span>公告标题</span>
                        <p>{title}</p>
                    </Col>
                    <Col span={24} className='content-item'>
                        <span>公告内容</span>
                        <p>{content}</p>
                    </Col>
                </Row>
            )
        };
        return(
            <div className='notice-manage-container'>
                <div className='notice-list-container'>
                    <Row className='header'><Button type='primary' onClick={this.handleAddmodalShow}>增加公告</Button></Row>
                    <Row className='list-header'>
                        <Col span={8}>公告编号</Col>
                        <Col span={8}>发布时间</Col>
                    </Row>
                    {
                        noticeinfos.length > 0 ?
                        <Collapse>
                        {
                            noticeinfos.map((item, i) => {
                                return(
                                    <Panel header={<PanelHeader noticeinfos={item}/>} key={i} style={{backgroundColor: '#fff'}}>
                                        <PanelCentent noticeinfos={item}/>
                                    </Panel>
                                )
                            })
                        }
                        </Collapse>
                        :
                        <Empty description='暂无数据'/>
                    }
                    <Row className='list-pagination'>
                        <Pagination 
                            current={currentPage} 
                            onChange={this.handlePageChange}
                            total={total_num} 
                            showTotal={total => `共计 ${total} 条记录`}
                        />
                    </Row>
                    <Modal
                        visible={addmodalVisible}
                        title="新增公告"
                        onCancel={this.handleAddmodalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleAddNotice }>
                            <Form.Item label='标题'>
                                {
                                    getFieldDecorator('title', {
                                        rules: [{ required: true, max: 20, message: '标题不能为空且小于20个字符' }],
                                    })(
                                    <Input placeholder='请输入标题' />
                                )}
                            </Form.Item>
                            <Form.Item label='内容'>
                                {
                                    getFieldDecorator('content', {
                                        rules: [{ required: true, max: 500, message: '内容不能为空且小于500个字符' }],
                                    })(
                                    <Input.TextArea placeholder='请输入内容' autosize={{ minRows: 4, maxRows: 8 }}/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleAddmodalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    发布公告
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        visible={modifymodalVisible}
                        title="修改公告"
                        onCancel={this.handleModifymodalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleModifyNotice }>
                            <Form.Item label='标题'>
                                {
                                    getFieldDecorator('title', {
                                        rules: [{ required: true, max: 20, message: '标题不能为空且小于20个字符' }],
                                        initialValue: currentModify.title
                                    })(
                                    <Input placeholder='请输入标题' />
                                )}
                            </Form.Item>
                            <Form.Item label='内容'>
                                {
                                    getFieldDecorator('content', {
                                        rules: [{ required: true, max: 500, message: '内容不能为空且小于500个字符' }],
                                        initialValue: currentModify.content
                                    })(
                                    <Input.TextArea placeholder='请输入内容' autosize={{ minRows: 4, maxRows: 8 }}/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleModifymodalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    修改公告
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}

const Notice_Form = Form.create({})(Notice);

export default Notice_Form;