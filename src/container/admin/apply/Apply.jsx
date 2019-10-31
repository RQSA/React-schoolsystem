import React, { Component } from 'react';
import { Row, message, Descriptions, Form, Input, InputNumber, Select,  Upload, Button, Icon, Timeline } from 'antd';
import API from '../../../api/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import envconfig  from '../../../envconfig/envconfig';
import './apply.less';

const Option = Select.Option;

class Apply extends Component {
    static propTypes = {
        adminInfoData: PropTypes.object.isRequired,
    }

    constructor() {
        super();
        this.state = {
            status: -2,
            tableFileList: [],
            tableURL: '',
            formInfo: {},
        };
        this.uploadProps = {
            name: 'file',
            action: `${envconfig.baseURL}/student/upload`,
            headers: {
                authorization: 'authorization-text',
            },
            accept: '.jpg,.png,.jpeg',
            onChange: (info) => {
                let fileList = info.fileList;
                fileList = fileList.slice(-1);
                this.setState({ tableFileList: [...fileList]});
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    if (info.file.response.status === 200) {
                        const tableURL = `${envconfig.baseURL}/image/${info.file.response.data.imageAdd}`;
                        this.setState({tableURL})
                        message.success('家庭情况调查表上传成功');
                    } else {
                        message.error('家庭情况调查表上传失败！');
                    }
                } else if (info.file.status === 'error') {
                    message.error('家庭情况调查表上传失败！');
                }
            }
        }
    }

    componentWillMount() {
        this._getApplyStatus();
    }

    async _getApplyStatus () {
        const result = await API.applyStatus();

        const { status, data } = result;
        if (status === 200) {
            this.setState({
                status: data ? data.status : -1,
                formInfo: data ? data : {},
            })
        } else {
            message.error('获取数据失败，请刷新重试')
        }
    }

    handleApplySubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { 
                const { tableURL, formInfo, status: _status } = this.state;
                if (tableURL || formInfo.imageAdd) {
                    const method = _status === -1 ? 'post' : 'put';
                    const data = {
                        ...values,
                        imageAdd: tableURL ? this.state.tableURL.slice(31) : formInfo.imageAdd,
                    }
                    const result = await API.addApply(method, {data});
                    const { status } = result;
                    if (status === 200) {
                        message.success('提交成功，可以在右边查看进度状态');
                        this._getApplyStatus();
                    } else {
                        message.error('提交失败，请重试！')
                    }
                    
                } else {
                    message.error('请先上传家庭调查表哦!')
                }
            }
        })
    }

    render() {
        const { tableFileList, tableURL, status, formInfo } = this.state;
        console.log(status);
        
        const { name: _name, studentNum: _studentNum } = this.props.adminInfoData.admininfo;
        const { studentName, studentNum, income, fatherName, fatherProfe, fatherPhone, motherName, motherProfe, motherPhone, typeId, money, reason } = formInfo;
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='apply-manage-container'>
                <div className='apply-list-container'>
                    <Row className='header'>申请管理中心</Row>
                    {
                        status === -1 || status === 2 || status === 3 ?
                        <Form className='apply-form' onSubmit={ this.handleApplySubmit }>
                            <Row className='form'>
                                <Descriptions title="助学金申请表" bordered>
                                    <Descriptions.Item label="姓名">
                                        <Form.Item>
                                        {
                                            getFieldDecorator('studentName', {
                                                rules: [{ required: true, message: '姓名未输入' }],
                                                initialValue: _name
                                            })(
                                                <Input disabled/>
                                        )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="学号">
                                        <Form.Item>
                                            {
                                                getFieldDecorator('studentNum', {
                                                    rules: [{ required: true, message: '学号未输入' }],
                                                    initialValue: _studentNum
                                                })(
                                                    <Input disabled/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="家庭年收入（万元）">
                                        <Form.Item>
                                            {
                                                getFieldDecorator('income', {
                                                    rules: [{ required: true, message: '家庭年收入未输入' }],
                                                    initialValue: income || null
                                                })(
                                                    <InputNumber min={0}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="父亲姓名">
                                        <Form.Item>
                                            {
                                                getFieldDecorator('fatherName', {
                                                    rules: [{ required: true, message: '父亲姓名未输入' }],
                                                    initialValue: fatherName || null
                                                })(
                                                    <Input/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="职业">
                                        <Form.Item>
                                            {
                                                getFieldDecorator('fatherProfe', {
                                                    rules: [{ required: true, message: '职业未输入' }],
                                                    initialValue: fatherProfe || null
                                                })(
                                                    <Input/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="联系方式">
                                        <Form.Item>
                                            {
                                                getFieldDecorator('fatherPhone', {
                                                    rules: [{ required: true, message: '联系方式未输入' }],
                                                    initialValue: fatherPhone || null
                                                })(
                                                    <Input/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="母亲姓名">
                                        <Form.Item>
                                            {
                                                getFieldDecorator('motherName', {
                                                    rules: [{ required: true, message: '母亲姓名未输入' }],
                                                    initialValue: motherName || null
                                                })(
                                                    <Input/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="职业">
                                        <Form.Item>
                                            {
                                                getFieldDecorator('motherProfe', {
                                                    rules: [{ required: true, message: '联系方式未输入' }],
                                                    initialValue: motherProfe || null
                                                })(
                                                    <Input/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="联系方式">
                                        <Form.Item>
                                            {
                                                getFieldDecorator('motherPhone', {
                                                    rules: [{ required: true, message: '联系方式未输入' }],
                                                    initialValue: motherPhone || null
                                                })(
                                                    <Input/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="资助类型" span={2}>
                                        <Form.Item>
                                        {
                                            getFieldDecorator('typeId', {
                                                rules: [{ required: true, message: '必须选择一个类型' }],
                                                initialValue: typeId ? typeId.toString() : null
                                            })( 
                                                <Select >
                                                    <Option value="1">国家助学金A等</Option>
                                                    <Option value="2">国家助学金B等</Option>
                                                    <Option value="3">国家助学金C等</Option>
                                                    <Option value="4">国家励志奖学金</Option>
                                                    <Option value="5">精准扶贫</Option>
                                                </Select>
                                        )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="资助金额（千元）">
                                        <Form.Item>
                                            {
                                                getFieldDecorator('money', {
                                                    rules: [{ required: true, message: '资助金额未输入' }],
                                                    initialValue: money || null
                                                })(
                                                    <InputNumber min={0}/>
                                            )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="申请理由">
                                        <Form.Item>
                                        {
                                            getFieldDecorator('reason', {
                                                rules: [{ required: true, max: 150, message: '请填写申请理由，并控制在150字以内' }],
                                                initialValue: reason || null
                                            })(
                                                <Input.TextArea autosize={{minRows: 3, maxRows: 6 }}/>
                                        )}
                                        </Form.Item>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Row>
                            <Row className='table'>
                                <p className='title'>上传家庭情况调查表{status === -1 ? '' : '(已上传)'}</p>
                                <Form.Item labelCol={{span: 24}} wrapperCol={{span: 24}} className='userhead-uploader-item'>
                                
                                <div className='userhead-uploader-btn'>
                                    <Upload {...this.uploadProps} fileList={ tableFileList  }>
                                        <Button>
                                            <Icon type='upload' /> {status === -1 ? '上传' : '修改' }家庭情况调查表
                                        </Button>
                                    </Upload>
                                </div>
                                <div>
                                {
                                    tableURL && <img className='table-img' src={tableURL} alt='table'></img>
                                }
                                </div>
                                </Form.Item>
                            </Row>
                            <Row className='btn'>
                                <Form.Item wrapperCol={{span: 14}}>
                                    <Button type='primary' htmlType="submit">提交申请</Button>
                                </Form.Item>
                            </Row>
                        </Form>
                        :
                        null
                    }
                    {
                        status === 0 || status === 1 || status === 4 ?
                        <div className="apply-form loading">
                            <Row className='form'>
                                <Descriptions title="助学金申请表" bordered>
                                    <Descriptions.Item label="姓名">{studentName}</Descriptions.Item>
                                    <Descriptions.Item label="学号">{studentNum}</Descriptions.Item>
                                    <Descriptions.Item label="家庭年收入（万元）">{income}</Descriptions.Item>
                                    <Descriptions.Item label="父亲姓名">{fatherName}</Descriptions.Item>
                                    <Descriptions.Item label="职业">{fatherProfe}</Descriptions.Item>
                                    <Descriptions.Item label="联系方式">{fatherPhone}</Descriptions.Item>
                                    <Descriptions.Item label="母亲姓名">{motherName}</Descriptions.Item>
                                    <Descriptions.Item label="职业">{motherProfe}</Descriptions.Item>
                                    <Descriptions.Item label="联系方式">{motherPhone}</Descriptions.Item>
                                    <Descriptions.Item label="资助类型" span={2}>
                                        {{
                                            1: "国家奖学金A等",
                                            2: "国家奖学金B等",
                                            3: "国家奖学金C等",
                                            4: "国家励志奖学金",
                                            5: "精准扶贫",
                                        }[typeId]}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="资助金额（千元）">{money}</Descriptions.Item>
                                    <Descriptions.Item label="申请理由">{reason}</Descriptions.Item>
                                </Descriptions>
                            </Row>
                            <Row className='table'>
                                <p className='title'>上传家庭情况调查表（已上传）</p>
                                
                            </Row> 
                        </div>
                        :
                        null
                    }
                </div>
                <div className='time'>
                    <p>申请进度</p>
                    <Timeline>
                    { status >= -1 ? <Timeline.Item>尚未提交申请</Timeline.Item> : null }
                    { status >= 0 ? <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>正在辅导员审核</Timeline.Item> : null }
                    { status === 1 || status >= 3 ? <Timeline.Item color="green">辅导员审核通过</Timeline.Item> : null }
                    { status === 1 || status >= 3 ? <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>正在管理员审核</Timeline.Item> : null }
                    { status === 2 ? <Timeline.Item color="red">辅导员审核失败</Timeline.Item> : null }   
                    { status === 3 ? <Timeline.Item color="red">管理员审核失败</Timeline.Item> : null }  
                    { status === 4 ? <Timeline.Item color="green">审核通过，将于近日公示</Timeline.Item> : null }
                    </Timeline>
                </div>
            </div>
        )
    }
}

const Apply_Form = Form.create({})(Apply);

const mapStateToProps = state => ({
    adminInfoData: state.adminInfoData,
})

export default connect(mapStateToProps)(Apply_Form);