import React, { Component } from 'react';
import { Collapse, Row, Col, Button, Pagination, message, Popconfirm, Empty, Modal, Form, Input } from 'antd';
import API from '../../../api/api';
import './grants.less';

const Panel = Collapse.Panel;

class Grants extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            grantsinfos: [],
            currentPage: 1,
            addModalVisible: false, 
            modifyModalVisible: false, 
            currentModify: {},
        }
    }

    componentWillMount() {
        this._getGrantsList();
    }

    async _getGrantsList(offset = 0) {
        const params = {
            offset,
        }
        const result = await API.getGrantsList('admin', {params});
        const { status, msg, data } = result;
        console.log(data);
        
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

    // 分页保持函数
    _keepPage() {
        const { grantsinfos, currentPage } = this.state;
        if (grantsinfos.length === 1 && currentPage > 1) {
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
        this._getGrantsList(offset);
        // 获取新的列表数据
    }

    // 删除确认回调
    handleDeleteClick = async (id, e) => {
        e.stopPropagation();
        const result = await API.deleteGrants(id);
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

    handleAddGrants = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { name, conditional } = values;
                const data = {
                    name,
                    conditional,
                }
                const result = await API.addGrants({data});
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

    handleModifyGrants = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { name, conditional } = values;
                const data = {
                    id: this.state.currentModify.id,
                    name,
                    conditional,
                }
                const result = await API.modifyGrants({data});
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
        const { total_num, grantsinfos, currentPage, addmodalVisible, modifymodalVisible, currentModify } = this.state;
        const { getFieldDecorator } = this.props.form;
        
        const PanelHeader = (props) => {
            const { id, name } = props.grantsinfos;
            return (
                <Row className='panel-header'>
                    <Col span={8}>{`grants2412400${id}`}</Col>
                    <Col span={8}>{name}</Col>
                    <Col span={8}>
                        <Button onClick={(e) => this.handleModifymodalShow(props.grantsinfos, e)}>修改</Button>
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
            const { conditional } = props.grantsinfos;
            
            return(
                <Row className='panel-content'>
                    <Col span={24} className='content-item'>
                        <span>条件描述</span>
                        <p>{conditional}</p>
                    </Col>
                </Row>
            )
        };
        return(
            <div className='grants-manage-container'>
                <div className='grants-list-container'>
                    <Row className='header'>
                        <Button type='primary' onClick={this.handleAddmodalShow}>增加资助类型</Button>
                    </Row>
                    <Row className='list-header'>
                        <Col span={8}>资助类型编号</Col>
                        <Col span={8}>资助类型名称</Col>
                    </Row>
                    {
                        grantsinfos.length > 0 ?
                        <Collapse>
                        {
                            grantsinfos.map((item, i) => {
                                return (
                                    <Panel header={<PanelHeader grantsinfos={item}/>} key={i} style={{backgroundColor: '#fff'}}>
                                        <PanelCentent grantsinfos={item}/>
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
                        title="新增资助类型"
                        onCancel={this.handleAddmodalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleAddGrants}>
                            <Form.Item label='资助类型名称'>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, message: '资助类型名称不能为空' }],
                                    })(
                                    <Input placeholder='请输入资助类型名称' />
                                )}
                            </Form.Item>
                            <Form.Item label='条件描述'>
                                {
                                    getFieldDecorator('conditional', {
                                        rules: [{ required: true, max: 500, message: '条件描述不能为空且小于500个字符' }],
                                    })(
                                    <Input.TextArea placeholder='请输入条件描述' autosize={{ minRows: 4, maxRows: 8 }}/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleAddmodalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    增加资助类型
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        visible={modifymodalVisible}
                        title="修改资助类型"
                        onCancel={this.handleModifymodalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleModifyGrants }>
                            <Form.Item label='资助类型名称'>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, message: '资助类型名称不能为空' }],
                                        initialValue: currentModify.name
                                    })(
                                    <Input placeholder='请输入资助类型名称' />
                                )}
                            </Form.Item>
                            <Form.Item label='条件描述'>
                                {
                                    getFieldDecorator('conditional', {
                                        rules: [{ required: true, max: 500, message: '条件描述不能为空且小于500个字符' }],
                                        initialValue: currentModify.conditional
                                    })(
                                    <Input.TextArea placeholder='请输入条件描述' autosize={{ minRows: 4, maxRows: 8 }}/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleModifymodalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    保存资助类型信息
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}

const Grants_Form = Form.create({})(Grants);

export default Grants_Form;