import React, { Component } from 'react';
import { Collapse, Row, Col, Button, Pagination, message, Popconfirm, Empty, Modal, Form, Input } from 'antd';
import API from '../../../api/api';
import './department.less';

const Panel = Collapse.Panel;

class Department extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            departmentinfos: [],
            currentPage: 1,
            addModalVisible: false, 
            modifyModalVisible: false, 
            currentModify: {},
        }
    }

    componentWillMount() {
        this._getDepartmentList();
    }

    // 获取系别列表
    async _getDepartmentList(offset = 0) {
        const params = {
            offset,
        }
        const result = await API.getDepartmentList({params});
        const { status, msg, data } = result;
        console.log(data);
        
        if (status === 200) {
            const { total: total_num, entitys: departmentinfos } = data;
            this.setState({
                total_num,
                departmentinfos,
            })
        } else {
            message.error(msg);
        }
    }

    // 分页保持函数
    _keepPage() {
        const { departmentinfos, currentPage } = this.state;
        if (departmentinfos.length === 1 && currentPage > 1) {
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
        this._getDepartmentList(offset);
        // 获取新的列表数据
    }

    // 删除确认回调
    handleDeleteClick = async (id, e) => {
        e.stopPropagation();
        const result = await API.deleteDepartment(id);
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

    handleAddDepartment = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { name } = values;
                const data = {
                    name,
                }
                const result = await API.addDepartment({data});
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

    handleModifyDepartment = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { name } = values;
                const data = {
                    id: this.state.currentModify.id,
                    name,
                }
                const result = await API.modifyDepartment({data});
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
        const { total_num, departmentinfos, currentPage, addmodalVisible, modifymodalVisible, currentModify } = this.state;
        const { getFieldDecorator } = this.props.form;
        
        const PanelHeader = (props) => {
            const { id, name } = props.departmentinfos;
            return (
                <Row className='panel-header'>
                    <Col span={8}>{`depart22100${id}`}</Col>
                    <Col span={8}>{name}</Col>
                    <Col span={8}>
                        <Button onClick={(e) => this.handleModifymodalShow(props.departmentinfos, e)}>修改</Button>
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
            <div className='department-manage-container'>
                <div className='department-list-container'>
                    <Row className='header'>
                        <Button type='primary' onClick={this.handleAddmodalShow}>增加系别</Button>
                    </Row>
                    <Row className='list-header'>
                        <Col span={8}>系别编号</Col>
                        <Col span={8}>系别名称</Col>
                    </Row>
                    {
                        departmentinfos.length > 0 ?
                        <Collapse>
                        {
                            departmentinfos.map((item, i) => <Panel header={<PanelHeader departmentinfos={item}/>} key={i} style={{backgroundColor: '#fff'}}></Panel>)
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
                        title="新增系别"
                        onCancel={this.handleAddmodalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleAddDepartment}>
                            <Form.Item label='系别名称'>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, message: '系别名称不能为空' }],
                                    })(
                                    <Input placeholder='请输入系别名称' />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleAddmodalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    增加系别
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        visible={modifymodalVisible}
                        title="修改系别信息"
                        onCancel={this.handleModifymodalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleModifyDepartment }>
                            <Form.Item label='系别名称'>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, message: '系别名称不能为空' }],
                                        initialValue: currentModify.name
                                    })(
                                    <Input placeholder='请输入系别名称' />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleModifymodalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    保存系别信息
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}

const Departmentr_Form = Form.create({})(Department);

export default Departmentr_Form;