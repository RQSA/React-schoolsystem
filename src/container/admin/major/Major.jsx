import React, { Component } from 'react';
import { Collapse, Row, Col, Button, Pagination, message, Popconfirm, Empty, Modal, Form, Input, Select } from 'antd';
import API from '../../../api/api';
import './major.less';

const Panel = Collapse.Panel;
const Option = Select.Option;

class Major extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            majorinfos: [],
            currentPage: 1,
            addModalVisible: false, 
            modifyModalVisible: false, 
            currentModify: {},
            depatments: [],
        }
    }

    componentWillMount() {
        this._getMajorList();
    }

    async _getMajorList(offset = 0) {
        const params = {
            offset,
        }
        const result = await API.getMajorList({params});
        const { status, msg, data } = result;
        console.log(data);
        
        if (status === 200) {
            const { total: total_num, entitys: majorinfos, depatments } = data;
            this.setState({
                total_num,
                majorinfos,
                depatments,
            })
        } else {
            message.error(msg);
        }
    }

    // 分页保持函数
    _keepPage() {
        const { majorinfos, currentPage } = this.state;
        if (majorinfos.length === 1 && currentPage > 1) {
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
        this._getMajorList(offset);
        // 获取新的列表数据
    }

    // 删除确认回调
    handleDeleteClick = async (id, e) => {
        e.stopPropagation();
        const result = await API.deleteMajor(id);
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

    handleAddMajor = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            console.log(values);
            
            if (!err) { 
                const { depatmentId, name } = values;
                const data = {
                    depatmentId,
                    name,
                }
                const result = await API.addMajor({data});
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

    handleModifyMajor = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { depatmentId, name } = values;
                const data = {
                    id: this.state.currentModify.id,
                    depatmentId,
                    name,
                }
                const result = await API.modifyMajor({data});
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
        const { total_num, majorinfos, currentPage, addmodalVisible, modifymodalVisible, currentModify, depatments } = this.state;
        const { getFieldDecorator } = this.props.form;
        
        const PanelHeader = (props) => {
            const { id, depatmentName, name } = props.majorinfos;
            return (
                <Row className='panel-header'>
                    <Col span={6}>{`special31300${id}`}</Col>
                    <Col span={6}>{depatmentName}</Col>
                    <Col span={6}>{name}</Col>
                    <Col span={6}>
                        <Button onClick={(e) => this.handleModifymodalShow(props.majorinfos, e)}>修改</Button>
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
        return(
            <div className='major-manage-container'>
                <div className='major-list-container'>
                    <Row className='header'>
                        <Button type='primary' onClick={this.handleAddmodalShow}>增加专业</Button>
                    </Row>
                    <Row className='list-header'>
                        <Col span={6}>专业编号</Col>
                        <Col span={6}>系别</Col>
                        <Col span={6}>专业名称</Col>
                    </Row>
                    {
                        majorinfos.length > 0 ?
                        <Collapse>
                        {
                            majorinfos.map((item, i) => <Panel header={<PanelHeader majorinfos={item}/>} key={i} style={{backgroundColor: '#fff'}}></Panel>)
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
                        title="新增专业"
                        onCancel={this.handleAddmodalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleAddMajor}>
                            <Form.Item label='系别' hasFeedback>
                            {
                                getFieldDecorator('depatmentId', {
                                    rules: [{ required: true, message: '必须选择一个系别' }],
                                })(
                                    <Select style={{ width: 200 }} >
                                    {
                                        depatments.map((item, i) => <Option key={i} value={item.id}>{item.name}</Option>)
                                    }
                                    </Select>
                            )}
                            </Form.Item>
                            <Form.Item label='专业名称'>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, message: '专业名称不能为空' }],
                                    })(
                                    <Input placeholder='请输入专业名称' />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleAddmodalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    增加专业
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        visible={modifymodalVisible}
                        title="修改专业信息"
                        onCancel={this.handleModifymodalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleModifyMajor }>
                            <Form.Item label='系别' hasFeedback>
                            {
                                getFieldDecorator('depatmentId', {
                                    rules: [{ required: true, message: '必须选择一个系别' }],
                                    initialValue: currentModify.depatmentName
                                })(
                                    <Select style={{ width: 200 }} disabled>
                                    { depatments.map((item, i) => <Option key={i} value={item.id}>{item.name}</Option>) }
                                    </Select>
                            )}
                            </Form.Item>
                            <Form.Item label='专业名称'>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, message: '专业名称不能为空' }],
                                        initialValue: currentModify.name
                                    })(
                                    <Input placeholder='请输入专业名称' />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleModifymodalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    保存专业信息
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}

const Major_Form = Form.create({})(Major);

export default Major_Form;