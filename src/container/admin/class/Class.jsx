import React, { Component } from 'react';
import { Collapse, Row, Col, Button, Pagination, message, Popconfirm, Empty, Modal, Form, Input, Select, Cascader } from 'antd';
import API from '../../../api/api';
import './class.less';

const Panel = Collapse.Panel;
const Option = Select.Option;

class Class extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            classinfos: [],
            currentPage: 1,
            addModalVisible: false, 
            modifyModalVisible: false, 
            currentModify: {},
            options: {},
            instructors: [],
        }
    }

    componentWillMount() {
        this._getClassList();
    }

    async _getClassList(offset = 0) {
        const params = {
            offset,
        }
        const result = await API.getClassList({params});
        const { status, msg, data } = result;
        if (status === 200) {
            const { total: total_num, entitys: classinfos, depatments: options, instructors } = data;
            this.setState({
                total_num,
                classinfos,
                options,
                instructors,
            })
        } else {
            message.error(msg);
        }
    }

    _keepPage() {
        const { classinfos, currentPage } = this.state;
        if (classinfos.length === 1 && currentPage > 1) {
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
        this._getClassList(offset);
        // 获取新的列表数据
    }

    // 删除确认回调
    handleDeleteClick = async (id, e) => {
        e.stopPropagation();
        const result = await API.deleteClass(id);
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

    handleAddClass = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { ids, name, grade, instructorId } = values;
                const data = {
                    name: `20${grade}${name}`,
                    grade,
                    instructorId,
                    depatmentId: ids[0],
                    specialId: ids[1],
                }
                const result = await API.addClass({data});
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

    handleModifyClass = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { ids, name, grade, instructorId } = values;
                const data = {
                    name: `20${grade}${name}`,
                    grade,
                    instructorId,
                    depatmentId: ids[0],
                    specialId: ids[1],
                    id: this.state.currentModify.id
                }
                const result = await API.modifyClass({data});
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
        const { total_num, classinfos, currentPage, addmodalVisible, modifymodalVisible, currentModify, options, instructors } = this.state;
        const { getFieldDecorator } = this.props.form;
        
        const PanelHeader = (props) => {
            const { id, grade, name } = props.classinfos;
            return (
                <Row className='panel-header'>
                    <Col span={6}>{`class3891200${id}`}</Col>
                    <Col span={6}>{grade}</Col>
                    <Col span={6}>{name}</Col>
                    <Col span={6}>
                        <Button onClick={(e) => this.handleModifymodalShow(props.classinfos, e)}>修改</Button>
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
            const { depatmentName, specialName, instructorNum } = props.classinfos;
            
            return(
                <Row className='panel-content'>
                    <Col span={8} className='content-item'>
                        <span>系别</span>
                        <p>{depatmentName}</p>
                    </Col>
                    <Col span={8} className='content-item'>
                        <span>专业</span>
                        <p>{specialName}</p>
                    </Col>
                    <Col span={8} className='content-item'>
                        <span>辅导员工号</span>
                        <p>{instructorNum}</p>
                    </Col>
                </Row>
            )
        };
        return(
            <div className='class-manage-container'>
                <div className='class-list-container'>
                    <Row className='header'>
                        <Button type='primary' onClick={this.handleAddmodalShow}>增加班级</Button>
                    </Row>
                    <Row className='list-header'>
                        <Col span={6}>班级编号</Col>
                        <Col span={6}>年级名称</Col>
                        <Col span={6}>班级名称</Col>
                    </Row>
                    {
                        classinfos.length > 0 ?
                        <Collapse>
                        {
                            classinfos.map((item, i) => {
                                return (
                                    <Panel header={<PanelHeader classinfos={item}/>} key={i} style={{backgroundColor: '#fff'}}>
                                        <PanelCentent classinfos={item}/>
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
                            title="新增班级"
                            onCancel={this.handleAddmodalHide}
                            footer={null}
                            destroyOnClose
                        >
                            <Form onSubmit={ this.handleAddClass}>
                                <Form.Item label='系别和专业' hasFeedback>
                                {
                                    getFieldDecorator('ids', {
                                        rules: [{ required: true, message: '必须选择一个系别和专业' }],
                                    })(
                                        <Cascader options={options} placeholder="请选择系别和专业"></Cascader>
                                )}
                                </Form.Item>
                                <Form.Item label='班级名称' hasFeedback>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, message: '必须输入一个班级名称' }],
                                    })(
                                        <Input placeholder='请输入班级名称' />
                                )}
                                </Form.Item>
                                <Form.Item label='年级名称' hasFeedback>
                                {
                                    getFieldDecorator('grade', {
                                        rules: [{ required: true, message: '必须选择一个年级名称' }],
                                    })(
                                        <Select style={{ width: 200 }} >
                                            <Option value="15级">15级</Option>
                                            <Option value="16级">16级</Option>
                                            <Option value="17级">17级</Option>
                                            <Option value="18级">18级</Option>
                                        </Select>
                                )}
                                </Form.Item>
                                <Form.Item label='辅导员工号' hasFeedback>
                                {
                                    getFieldDecorator('instructorId', {
                                        rules: [{ required: true, message: '必须选择一个辅导员工号' }],
                                    })(
                                        <Select style={{ width: 200 }} >
                                            { instructors.map((item, i) => <Option key={i} value={item.id}>{item.number}</Option>) }
                                        </Select>
                                )}
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={this.handleAddmodalHide}>取消</Button>
                                    <Button htmlType="submit" type="primary">
                                        增加班级
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
                            title="修改班级信息"
                            onCancel={this.handleModifymodalHide}
                            footer={null}
                            destroyOnClose
                        >
                            <Form onSubmit={ this.handleModifyClass }>
                                <Form.Item label='系别和专业' hasFeedback>
                                {
                                    getFieldDecorator('ids', {
                                        rules: [{ required: true, message: '必须选择一个系别和专业' }],
                                        initialValue: [currentModify.depatmentId, currentModify.specialId]
                                    })(
                                        <Cascader options={options} placeholder="请选择系别和专业"></Cascader>
                                )}
                                </Form.Item>
                                <Form.Item label='班级名称' hasFeedback>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, message: '必须选择一个班级名称' }],
                                        initialValue: currentModify.name && currentModify.name.slice(5)
                                    })(
                                        <Input placeholder='请输入班级名称' />
                                )}
                                </Form.Item>
                                <Form.Item label='年级名称' hasFeedback>
                                {
                                    getFieldDecorator('grade', {
                                        rules: [{ required: true, message: '必须选择一个年级名称' }],
                                        initialValue: currentModify.grade
                                    })(
                                        <Select style={{ width: 200 }} >
                                            <Option value="15级">15级</Option>
                                            <Option value="16级">16级</Option>
                                            <Option value="17级">17级</Option>
                                            <Option value="18级">18级</Option>
                                        </Select>
                                )}
                                </Form.Item>
                                <Form.Item label='辅导员工号' hasFeedback>
                                {
                                    getFieldDecorator('instructorId', {
                                        rules: [{ required: true, message: '必须选择一个辅导员工号' }],
                                        initialValue: currentModify.instructorId
                                    })(
                                        <Select style={{ width: 200 }} >
                                            { instructors.map((item, i) => <Option key={i} value={item.id}>{item.number}</Option>) }
                                        </Select>
                                )}
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={this.handleModifymodalHide}>取消</Button>
                                    <Button htmlType="submit" type="primary">
                                        保存班级信息
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

const Class_Form = Form.create({})(Class);

export default Class_Form;