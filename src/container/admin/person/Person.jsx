import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, message, Row, Form, Input, Modal, Select } from 'antd';
import API from '../../../api/api';
import { initAdminInfo } from '../../../store/adminInfoReducer/actionCreator';
import './person.less';

const Option = Select.Option;

class Person extends Component {
    static propTypes = {
        adminInfoData: PropTypes.object.isRequired, 
        initAdminInfo: PropTypes.func.isRequired,
    }

    constructor() {
        super();
        this.state = {
            profileModalVisible: false,
            passwordModalVisible: false,
        }
    }

    // 登出按钮回调
    handleSignOutClick = async () => {
        const result = await API.signOut();
        message.success(result.msg);
        this.props.history.push('/app-login');
    }

    handleModifyProfileClick = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { type } = this.props.adminInfoData;
                const { id } = this.props.adminInfoData.admininfo;
                const result = await API.ModifyInfo(type, {data: {...values, id}});
                const { status, msg } = result;
                if(status === 200) {
                    this.props.initAdminInfo();
                    this.handleProfileModalHide();
                    message.success(msg);
                } else {
                    message.error(msg);
                }
            }
        })
    }

    handleModifyPasswordClick = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { type } = this.props.adminInfoData;
                const { id } = this.props.adminInfoData.admininfo;
                const result = await API.ModifyPassword(type, {data: {...values, id}});
                const { status, msg } = result;
                if(status === 200) {
                    this.handlePasswordModalHide()
                    message.success(msg);
                    this.props.history.push('/app-login');
                } else {
                    message.error(msg);
                }
            }
        })
    }

     // 开启模态框
     handleProfileModalShow = e => {
        e.stopPropagation();
        this.setState({
            profileModalVisible: true,
        })
    }

    // 关闭模态框
    handleProfileModalHide = () => {
        this.setState({
            profileModalVisible: false,
        })
    }

    // 开启模态框
    handlePasswordModalShow = e => {
        e.stopPropagation();
        this.setState({
            passwordModalVisible: true,
        })
    }

    // 关闭模态框
    handlePasswordModalHide = () => {
        this.setState({
            passwordModalVisible: false,
        })
    }

    // 确认密码一致判断
    handleConfirmPassword = (rule, value, callback) => {
        const { getFieldValue } = this.props.form
        if (value && value !== getFieldValue('password')) {
            callback('两次输入不一致！')
        }
        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback();
    }

    render() {
        const { profileModalVisible, passwordModalVisible } = this.state;
        const { admininfo : info } = this.props.adminInfoData;
        const { type } = this.props.adminInfoData;
        const typeArr = {
            admin: '管理员',
            instructor: '辅导员',
            student: '学生',
        }
        const { getFieldDecorator } = this.props.form;
        const AdminInfo = () => {
            return (
                <div className='person-info'>
                    <div><span>管理员编号：</span>{info.id}</div>
                    <div><span>用户名：</span>{info.name}</div>
                </div>
            )
        }
        const InstructorInfo = () => {
            return (
                <div className='person-info'>
                    <div><span>辅导员工号：</span>{info.number}</div>
                    <div><span>姓名：</span>{info.name}</div>
                    <div><span>性别：</span>{{1: '男', 2: '女'}[info.sex]}</div>
                    <div><span>联系电话：</span>{info.phone}</div>
                    <div><span>QQ：</span>{info.qq}</div>
                </div>
            )
        }
        const StudentInfo = () => {
            return (
                <div className='person-info'>
                    <div><span>学号：</span>{info.studentNum}</div>
                    <div><span>姓名：</span>{info.name}</div>
                    <div><span>性别：</span>{{1: '男', 2: '女'}[info.sex]}</div>
                    <div><span>系别：</span>{info.depatmentName}</div>
                    <div><span>专业：</span>{info.specialName}</div>
                    <div><span>年级：</span>{info.grade}</div>
                    <div><span>班级：</span>{info.className}</div>
                    <div><span>家庭住址：</span>{info.address}</div>
                </div>
            )
        }
        const AdminForm = () => {
            return (
                <Form onSubmit={ this.handleModifyProfileClick }>
                    <Form.Item label='用户名'>
                        {
                            getFieldDecorator('name', {
                                rules: [{ required: true, message: '用户名不能为空' }],
                                initialValue: info.name
                            })(
                            <Input placeholder='请输入用户名' />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.handleProfileModalHide}>取消</Button>
                        <Button htmlType="submit" type="primary">
                            保存个人信息
                        </Button>
                    </Form.Item>
                </Form>
            )
        }
        const InstructorForm = () => {
            return (
                <Form onSubmit={ this.handleModifyProfileClick }>
                    <Form.Item label='姓名'>
                        {
                            getFieldDecorator('name', {
                                rules: [{ required: true, message: '姓名不能为空' }],
                                initialValue: info.name
                            })(
                            <Input placeholder='请输入姓名' />
                        )}
                    </Form.Item>
                    <Form.Item label='性别'>
                        {
                            getFieldDecorator('sex', {
                                rules: [{ required: true, message: '必须选择一个性别' }],
                                initialValue: info.sex
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
                                initialValue: info.phone
                            })(
                            <Input placeholder='请输入联系方式' />
                        )}
                    </Form.Item>
                    <Form.Item label='QQ'>
                        {
                            getFieldDecorator('qq', {
                                rules: [{ required: true, message: 'QQ号不能为空' }],
                                initialValue: info.qq
                            })(
                            <Input placeholder='请输入QQ号' />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.handleProfileModalHide}>取消</Button>
                        <Button htmlType="submit" type="primary">
                            保存个人信息
                        </Button>
                    </Form.Item>
                </Form>
            )
        }
        const StudentForm  = () => {
            return (
                <Form onSubmit={ this.handleModifyProfileClick }>
                    <Form.Item label='姓名'>
                        {
                            getFieldDecorator('name', {
                                rules: [{ required: true, max: 8, message: '姓名不能为空且小于8个字符' }],
                                initialValue: info.name
                            })(
                            <Input placeholder='请输入姓名' />
                        )}
                    </Form.Item>
                    <Form.Item label='性别' hasFeedback>
                    {
                        getFieldDecorator('sex', {
                            rules: [{ required: true, message: '必须选择一个性别' }],
                            initialValue: info.sex
                        })(
                            <Select style={{ width: 200 }} >
                                <Option value={1}>男</Option>
                                <Option value={2}>女</Option>
                            </Select>
                    )}
                    </Form.Item>
                    <Form.Item label='家庭地址'>
                        {
                            getFieldDecorator('address', {
                                rules: [{ required: true, message: '地址不能为空' }],
                                initialValue: info.address
                            })(
                            <Input placeholder='请输入地址' />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.handleProfileModalHide}>取消</Button>
                        <Button htmlType="submit" type="primary">
                            保存个人信息
                        </Button>
                    </Form.Item>
                </Form>
            )
        }
        return(
            <div className='person-container'>
                <h2>{typeArr[type]}个人信息</h2>
                { type === 'admin' ? <AdminInfo/> : null }
                { type === 'instructor' ? <InstructorInfo/> : null }
                { type === 'student' ? <StudentInfo/> : null }
                <Row className='btn-group'>
                    <Button type='primary' className='btn btn-modify-profile' onClick={this.handleProfileModalShow}>修改个人信息</Button>
                    <Button type='primary' className='btn btn-modify-password' onClick={this.handlePasswordModalShow}>修改密码</Button>
                    <Button type='primary' className='btn btn-signout' onClick={this.handleSignOutClick}>登出</Button>
                </Row>
                {
                    profileModalVisible ?
                    <Modal
                        visible={profileModalVisible}
                        title="修改个人信息"
                        onCancel={this.handleProfileModalHide}
                        footer={null}
                        destroyOnClose
                    >
                        { type === 'admin' ? <AdminForm/> : null }
                        { type === 'instructor' ? <InstructorForm/> : null }
                        { type === 'student' ? <StudentForm/> : null }
                    </Modal>
                    :
                    null
                }
                { 
                    passwordModalVisible ? 
                    <Modal
                        visible={passwordModalVisible}
                        title="修改密码"
                        onCancel={this.handlePasswordModalHide}
                        footer={null}
                        destroyOnClose
                    >
                        <Form onSubmit={ this.handleModifyPasswordClick }>
                            <Form.Item>
                                {
                                    getFieldDecorator('oldpassword', {
                                        rules: [{ required: true, pattern: /^[a-zA-Z\d!@#$%^&*.,/<>?;':"]{6,}$/, message: '密码格式有误' }],
                                    })(
                                    <Input.Password placeholder='请输入旧的密码' />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('password', {
                                        rules: [{ required: true, pattern: /^[a-zA-Z\d!@#$%^&*.,/<>?;':"]{6,}$/, message: '新密码必须6位以上，且不能包含非法字符' }],
                                    })(
                                    <Input.Password placeholder='请输入新的密码' />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('confirmpassword', {
                                        rules: [{ required: true, message: '请再次输入新的密码' },{validator: this.handleConfirmPassword}],
                                    })(
                                    <Input.Password placeholder='请再次输入新的密码' />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handlePasswordModalHide}>取消</Button>
                                <Button htmlType="submit" type="primary">
                                    修改密码
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    :
                    null
                }
            </div>
        )
    }
}

const Person_Form = Form.create({})(Person);

const mapStateToProps = state => ({
    adminInfoData: state.adminInfoData,
})

const mapDispatchToProps = {
    initAdminInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Person_Form);;