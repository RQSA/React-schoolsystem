import React, { Component } from 'react';
import { Collapse, Row, Col, Button, Pagination, message, Popconfirm, Empty, Modal, Form, Input, Select } from 'antd';
import API from '../../../api/api';
import './instructor.less';

const Panel = Collapse.Panel;
const Option = Select.Option;

class Instructor extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            instructorinfos: [],
            currentPage: 1,
            addModalVisible: false, 
            modifyModalVisible: false, 
            currentModify: {},
            keyword: '',
        }
    }

    componentWillMount() {
        this._getInstructorList();
    }

    // 获取辅导员列表
    async _getInstructorList(keyword, offset = 0) {
        const params = {
            number: keyword,
            offset,
        }
        const result = await API.getInstructorList({params});
        const { status, msg, data } = result;
        if (status === 200) {
            const { total: total_num, entitys: instructorinfos } = data;
            this.setState({
                total_num,
                instructorinfos,
                keyword,
            })
        } else {
            message.error(msg);
        }
    }

    // 分页保持函数
    _keepPage() {
        const { instructorinfos, currentPage } = this.state;
        if (instructorinfos.length === 1 && currentPage > 1) {
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
        const keyword = this.state.keyword || null;
        this._getInstructorList(keyword, offset);
        // 获取新的列表数据
    }

    // 删除确认回调
    handleDeleteClick = async (id, e) => {
        e.stopPropagation();
        const result = await API.deleteInstructor(id);
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

    // 增加辅导员回调
    handleAddInstructor = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { name, sex, phone, qq } = values;
                const data = {
                    name,
                    sex,
                    phone,
                    qq,
                }
                const result = await API.addInstructor({data});
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

    // 修改辅导员回调
    handleModifyInstructor = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { name, sex, phone, qq } = values;
                const data = {
                    id: this.state.currentModify.id,
                    name,
                    sex,
                    phone,
                    qq,
                }
                const result = await API.modifyInstructor({data});
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
        const { total_num, instructorinfos, currentPage, addmodalVisible, modifymodalVisible, currentModify } = this.state;
        const { getFieldDecorator } = this.props.form;
        
        const PanelHeader = (props) => {
            const { id, number, name, sex } = props.instructorinfos;
            return (
                <Row className='panel-header'>
                    <Col span={6}>{number}</Col>
                    <Col span={6}>{name}</Col>
                    <Col span={6}>{{1: '男', 2: '女'}[sex]}</Col>
                    <Col span={6}>
                        <Button onClick={(e) => this.handleModifymodalShow(props.instructorinfos, e)}>修改</Button>
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
            const { phone, qq } = props.instructorinfos;
            
            return(
                <Row className='panel-content'>
                    <Col span={12} className='content-item'>
                        <span>联系电话</span>
                        <p>{phone || '未填写'}</p>
                    </Col>
                    <Col span={12} className='content-item'>
                        <span>QQ</span>
                        <p>{qq || '未填写'}</p>
                    </Col>
                </Row>
            )
        };
        return(
            <div className='instructor-manage-container'>
                <div className='instructor-list-container'>
                    <Row className='header'>
                        <Input.Search
                            placeholder="按工号查找辅导员"
                            style={{ width: 260 }}
                            onSearch={e => this._getInstructorList(e)}
                        />
                        <Button type='primary' onClick={this.handleAddmodalShow}>增加辅导员</Button>
                    </Row>
                    <Row className='list-header'>
                        <Col span={6}>辅导员工号</Col>
                        <Col span={6}>姓名</Col>
                        <Col span={6}>性别</Col>
                    </Row>
                    {
                        instructorinfos.length > 0 ?
                        <Collapse>
                        {
                            instructorinfos.map((item, i) => {
                                return(
                                    <Panel header={<PanelHeader instructorinfos={item}/>} key={i} style={{backgroundColor: '#fff'}}>
                                        <PanelCentent instructorinfos={item}/>
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
                        title="新增辅导员"
                        onCancel={this.handleAddmodalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleAddInstructor}>
                            <Form.Item label='姓名'>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, max: 8, message: '姓名不能为空且小于8个字符' }],
                                    })(
                                    <Input placeholder='请输入姓名' />
                                )}
                            </Form.Item>
                            <Form.Item label='性别' hasFeedback>
                            {
                                getFieldDecorator('sex', {
                                    rules: [{ required: true, message: '必须选择一个性别' }],
                                })(
                                    <Select style={{ width: 200 }} >
                                        <Option value={1}>男</Option>
                                        <Option value={2}>女</Option>
                                    </Select>
                            )}
                            </Form.Item>
                            <Form.Item label='联系方式'>
                                {
                                    getFieldDecorator('phone', {
                                        rules: [{ required: true, pattern: /^[0-9]{11}$/, message: '联系电话不能为空且为11位数字' }],
                                    })(
                                    <Input placeholder='请输入联系电话' />
                                )}
                            </Form.Item>
                            <Form.Item label='QQ'>
                                {
                                    getFieldDecorator('qq', {
                                        rules: [{ required: true, message: 'QQ号不能为空' }],
                                    })(
                                    <Input placeholder='请输入QQ号' />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleAddmodalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    增加辅导员
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        visible={modifymodalVisible}
                        title="修改辅导员信息"
                        onCancel={this.handleModifymodalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleModifyInstructor }>
                        <Form.Item label='姓名'>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, max: 8, message: '姓名不能为空且小于8个字符' }],
                                        initialValue: currentModify.name
                                    })(
                                    <Input placeholder='请输入姓名' />
                                )}
                            </Form.Item>
                            <Form.Item label='性别' hasFeedback>
                            {
                                getFieldDecorator('sex', {
                                    rules: [{ required: true, message: '必须选择一个性别' }],
                                    initialValue: currentModify.sex
                                })(
                                    <Select style={{ width: 200 }} >
                                        <Option value={1}>男</Option>
                                        <Option value={2}>女</Option>
                                    </Select>
                            )}
                            </Form.Item>
                            <Form.Item label='联系方式'>
                                {
                                    getFieldDecorator('phone', {
                                        rules: [{ required: true, pattern: /^[0-9]{11}$/, message: '联系电话不能为空且为11位数字' }],
                                        initialValue: currentModify.phone
                                    })(
                                    <Input placeholder='请输入联系电话' />
                                )}
                            </Form.Item>
                            <Form.Item label='QQ'>
                                {
                                    getFieldDecorator('qq', {
                                        rules: [{ required: true, message: 'QQ号不能为空' }],
                                        initialValue: currentModify.qq
                                    })(
                                    <Input placeholder='请输入QQ号' />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleModifymodalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    保存辅导员信息
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}

const Instructor_Form = Form.create({})(Instructor);

export default Instructor_Form;