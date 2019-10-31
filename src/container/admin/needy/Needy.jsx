import React, { Component } from 'react';
import { Collapse, Row, Col, Button, Pagination, message, Popconfirm, Empty, Modal, Form, Input, Select, Cascader } from 'antd';
import API from '../../../api/api';
import './needy.less';

const Panel = Collapse.Panel;
const Option = Select.Option;

class Needy extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            needyinfos: [],
            currentPage: 1,
            addModalVisible: false, 
            modifyModalVisible: false, 
            currentModify: {},
            options: {},
            power: true,
        }
    }

    componentWillMount() {
        console.log(this.props);
        
        if (this.props.location.pathname === '/app-instructor/needy') {
            this.setState({
                power: false
            })
        }
        this._getNeedyList();
    }

    async _getNeedyList(offset = 0) {
        const params = {
            offset,
        }
        const result = await API.getStudentList({params});
        const { status, msg, data } = result;
        if (status === 200) {
            const { total: total_num, entitys: needyinfos, depatments: options } = data;
            this.setState({
                total_num,
                needyinfos,
                options,
            })
        } else {
            message.error(msg);
        }
    }

    // 分页保持函数
    _keepPage() {
        const { needyinfos, currentPage } = this.state;
        if (needyinfos.length === 1 && currentPage > 1) {
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
        this._getNeedyList(offset);
        // 获取新的列表数据
    }

    // 删除确认回调
    handleDeleteClick = async (id, e) => {
        e.stopPropagation();
        const result = await API.deleteStudent(id);
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

    handleAddNeedy = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { ids } = values;
                const data = {
                    ...values,
                    depatmentId: ids[0],
                    specialId: ids[1],
                    classId: ids[2],
                }
                const result = await API.addStudent({data});
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

    handleModifyNeedy = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { ids } = values;
                const data = {
                    id: this.state.currentModify.id,
                    ...values,
                    depatmentId: ids[0],
                    specialId: ids[1],
                    classId: ids[2],
                }
                const result = await API.modifyStudent({data});
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
        const { total_num, needyinfos, currentPage, addmodalVisible, modifymodalVisible, currentModify, options, power } = this.state;
        const { getFieldDecorator } = this.props.form;
        
        const PanelHeader = (props) => {
            const { id, studentNum, name, sex } = props.needyinfos;
            return (
                <Row className='panel-header'>
                    <Col span={6}>{studentNum}</Col>
                    <Col span={6}>{name}</Col>
                    <Col span={6}>{{1: '男', 2: '女'}[sex]}</Col>
                    {
                        power ?
                        <Col span={6}>
                            <Button onClick={(e) => this.handleModifymodalShow(props.needyinfos, e)}>修改</Button>
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
                        :
                        null
                    }
                </Row>
            )
        };
        const PanelCentent = (props) => {
            const { depatmentName, specialName, className, grade, address  } = props.needyinfos;
            
            return(
                <Row className='panel-content'>
                    <Col span={12} className='content-item'>
                        <span>系别</span>
                        <p>{depatmentName}</p>
                    </Col>
                    <Col span={12} className='content-item'>
                        <span>专业</span>
                        <p>{specialName}</p>
                    </Col>
                    <Col span={12} className='content-item'>
                        <span>班级</span>
                        <p>{className}</p>
                    </Col>
                    <Col span={12} className='content-item'>
                        <span>年级名称</span>
                        <p>{grade}</p>
                    </Col>
                    <Col span={24} className='content-item'>
                        <span>家庭地址</span>
                        <p>{address || '未填写'}</p>
                    </Col>
                </Row>
            )
        };
        return(
            <div className='needy-manage-container'>
                <div className='needy-list-container'>
                    <Row className='header'>
                    {
                        power ?
                        <Button type='primary' onClick={this.handleAddmodalShow}>增加贫困生</Button>
                        :
                        null
                    }
                    </Row>
                    <Row className='list-header'>
                        <Col span={6}>学号</Col>
                        <Col span={6}>姓名</Col>
                        <Col span={6}>性别</Col>
                    </Row>
                    {
                        needyinfos.length > 0 ?
                        <Collapse>
                        {
                            needyinfos.map((item, i) => {
                                return(
                                    <Panel header={<PanelHeader needyinfos={item}/>} key={i} style={{backgroundColor: '#fff'}}>
                                        <PanelCentent needyinfos={item}/>
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
                    {
                        addmodalVisible ?
                        <Modal
                            visible={addmodalVisible}
                            title="新增贫困生"
                            onCancel={this.handleAddmodalHide}
                            footer={null}
                            destroyOnClose
                        >
                            <Form onSubmit={ this.handleAddNeedy}>
                                <Form.Item label='学号'>
                                        {
                                            getFieldDecorator('studentNum', {
                                                rules: [{ required: true, pattern: /^[0-9]{10}$/, message: '学号不能为空且为10个字符' }],
                                            })(
                                            <Input placeholder='请输入学号' />
                                        )}
                                </Form.Item>
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
                                <Form.Item label='系别、专业和班级' hasFeedback>
                                {
                                    getFieldDecorator('ids', {
                                        rules: [{ required: true, message: '必须选择一个系别、专业和班级' }],
                                    })(
                                        <Cascader options={options} placeholder="请选择系别、专业和班级"></Cascader>
                                )}
                                </Form.Item>
                                <Form.Item label='家庭地址'>
                                    {
                                        getFieldDecorator('address', {
                                            rules: [{ required: true, message: '地址不能为空' }],
                                        })(
                                        <Input placeholder='请输入地址' />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={this.handleAddmodalHide}>取消</Button>
                                    <Button htmlType="submit" type="primary">
                                        增加贫困生
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                        :
                        null
                    }
                    {
                        modifymodalVisible ?
                        <Modal
                            visible={modifymodalVisible}
                            title="修改贫困生信息"
                            onCancel={this.handleModifymodalHide}
                            footer={null}
                            destroyOnClose
                        >
                            <Form onSubmit={ this.handleModifyNeedy }>
                                <Form.Item label='学号'>
                                            {
                                                getFieldDecorator('studentNum', {
                                                    rules: [{ required: true, pattern: /^[0-9]{10}$/, message: '学号不能为空且为10个字符' }],
                                                    initialValue: currentModify.studentNum
                                                })(
                                                <Input placeholder='请输入学号' />
                                            )}
                                </Form.Item>
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
                                <Form.Item label='系别、专业和班级' hasFeedback>
                                {
                                    getFieldDecorator('ids', {
                                        rules: [{ required: true, message: '必须选择一个系别、专业和班级' }],
                                        initialValue: [currentModify.depatmentId, currentModify.specialId, currentModify.classId]
                                    })(
                                        <Cascader options={options} placeholder="请选择系别、专业和班级"></Cascader>
                                )}
                                </Form.Item>
                                <Form.Item label='家庭地址'>
                                    {
                                        getFieldDecorator('address', {
                                            rules: [{ required: true, message: '地址不能为空' }],
                                            initialValue: currentModify.address
                                        })(
                                        <Input placeholder='请输入地址' />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={this.handleModifymodalHide}>取消</Button>
                                    <Button htmlType="submit" type="primary">
                                        保存贫困生信息
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

const Needy_Form = Form.create({})(Needy);

export default Needy_Form;