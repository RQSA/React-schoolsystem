import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Radio, Modal, Select, Cascader, notification } from 'antd';
import API from '../../api/api';
import './adminLogin.less';

const Option = Select.Option;

class AdminLogin extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            options: [],
        }
    }
    //管理员登录方法 
    async _adminLogin(data) {
        try {
            let  result={
                status:200,
                msg:'',
                data:{
                    type:'student'
                }
            }
            // let result = await API.Login({data});
            const { status, msg } = result;
            // if (status === 200) {
            //     notification.success({
            //         message: '登录成功！',
            //         description:
            //           '欢迎使用电子科技大学中山学院贫困生管理系统',
            //       });
            //     this.props.history.push(`/app-${result.data.type}`);
            // } else {
            //     message.error(msg || '登录失败');
            // }
            this.props.history.push(`/app-${result.data.type}`);
        } catch(err) {
            message.error('登录失败', err);
        }
    }

    //表单提交方法
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this._adminLogin(values);
          }
        });
    }

     // 开启模态框
     handleModalShow = async e => {
        e.stopPropagation();
        const result = await API.getRegister();
        const { status, data } = result;
        if (status === 200) {
            this.setState({
                options: data.depatments,
                modalVisible: true,
            })
        } else {
            message.error('获取数据失败，请重试！');
        }
    }

    // 关闭模态框
    handleModalHide = () => {
        this.setState({
            modalVisible: false,
        })
    }

    handleAddNeedy = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { ids, _name, _password } = values;
                const data = {
                    ...values,
                    depatmentId: ids[0],
                    specialId: ids[1],
                    classId: ids[2],
                    name: _name,
                    password: _password,
                }
                const result = await API.Register({data});
                const { status, msg } = result;
                if(status === 200) {
                    this.handleModalHide();
                    message.success(msg);
                } else {
                    message.error(msg);
                }
            }
        })
    }

    render() {
        const { modalVisible, options } = this.state;
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="efafu-admin-login">
                <div className="efafu-admin-login-container">
                    <h4 className='efafu-admin-login-title'>
                        <p>电子科技大学中山学院贫困生管理系统</p>
                        <p>登录</p>
                    </h4>
                    {
                        modalVisible ?
                        <Modal
                            visible={modalVisible}
                            title="贫困生注册"
                            onCancel={this.handleModalHide}
                            footer={null}
                            destroyOnClose
                        >
                            <Form onSubmit={ this.handleAddNeedy}>
                                <Form.Item label='学号（作为账号登录）'>
                                    {
                                        getFieldDecorator('studentNum', {
                                            rules: [{ required: true, pattern: /^[0-9]{10}$/, message: '学号不能为空且为10位' }],
                                        })(
                                        <Input placeholder='请输入学号' />
                                    )}
                                </Form.Item>
                                <Form.Item label='密码'>
                                    {
                                        getFieldDecorator('_password', {
                                            rules: [{ required: true, pattern: /^[a-zA-Z\d!@#$%^&*.,/<>?;':"]{6,}$/, message: '密码必须大于6位，且不能包含特殊字符' }],
                                        })(
                                        <Input.Password placeholder='请输入密码' />
                                    )}
                                </Form.Item>
                                <Form.Item label='姓名'>
                                    {
                                        getFieldDecorator('_name', {
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
                                            <Option value="1">男</Option>
                                            <Option value="2">女</Option>
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
                                    <Button onClick={this.handleModalHide}>取消</Button>
                                    <Button htmlType="submit" type="primary">
                                        注册
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                        :
                        <Form onSubmit={ this.handleFormSubmit }>
                            <Form.Item>
                            {
                                getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入用户名！' }],
                                })(
                                <Input prefix={<Icon type='user' style={{ color: 'rgba(0, 0, 0, .25)'}} />} placeholder='username' />
                            )}
                            </Form.Item>
                            <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码！' }],
                                })(
                                <Input.Password prefix={<Icon type='lock' style={{ color: 'rgba(0, 0, 0, .25)'}} />} placeholder='password' />
                            )}
                            </Form.Item>
                            <Form.Item>
                            {
                                getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择身份' }],
                                })(
                                    <Radio.Group>
                                        <Radio value="student">贫困生登录</Radio>
                                        <Radio value="instructor">辅导员登录</Radio>
                                        <Radio value="admin">管理员登录</Radio>
                                    </Radio.Group>
                            )}
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType="submit">
                                    登录
                                </Button>
                                <Button onClick={this.handleModalShow}>
                                    贫困生注册
                                </Button>
                            </Form.Item>
                        </Form>
                    }
                </div>
            </div>
        )
    }
}

const AdminLogin_Form = Form.create({})(AdminLogin);

export default AdminLogin_Form;