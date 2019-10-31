import React, { Component } from 'react';
import { Collapse, Row, Col, Button, Pagination, message, Popconfirm, Empty, Descriptions } from 'antd';
import envconfig  from '../../../envconfig/envconfig';
import API from '../../../api/api';
import './second.less';

const Panel = Collapse.Panel;

class Second extends Component {
    constructor() {
        super();
        this.state = {
            total_num: 0,
            secondinfos: [],
            currentPage: 1,
        }
    }

    componentWillMount() {
        this._getSecondList();
    }

    // 获取公告列表
    async _getSecondList(offset = 0) {
        const params = {
            offset,
        }
        const result = await API.getSecondList({params});
        const { status, msg, data } = result;
        if (status === 200) {
            const { total: total_num, entitys: secondinfos } = data;
            this.setState({
                total_num,
                secondinfos,
            })
        } else {
            message.error(msg);
        }
    }

    // 分页保持函数
    _keepPage() {
        const { secondinfos, currentPage } = this.state;
        if (secondinfos.length === 1 && currentPage > 1) {
            this.handlePageChange(currentPage - 1);
        } else {
            this.handlePageChange(currentPage)
        }
    }

    // 分页改变回调函数
    handlePageChange = async (page) => {
        this.setState({
            currentPage: page,
        });
        const offset = (page - 1) * 10;
        this._getSecondList(offset);
        // 获取新的列表数据
    }

    handleNoClick = async (id, e) => {
        e.stopPropagation();
        const data = {
            id,
            status: 3,
        }
        const result = await API.modifySecond({data});
        const { status, msg } = result;
        if (status === 200) {
            this._keepPage();
            message.success(msg);
        } else {
            message.error(msg);
        }
    }

    handleYesClick = async (id, e) => {
        e.stopPropagation();
        const data = {
            id,
            status: 4,
        }
        const result = await API.modifySecond({data});
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

    render() {
        const { total_num, secondinfos, currentPage } = this.state;
        const PanelHeader = (props) => {
            const { id, applyTime, typeId } = props.secondinfos;
            return (
                <Row className='panel-header'>
                    <Col span={5}>{`table8812700${id}`}</Col>
                    <Col span={5}>{applyTime.slice(0, 10)}</Col>
                    <Col span={5}>
                        {{
                            1: "国家奖学金A等",
                            2: "国家奖学金B等",
                            3: "国家奖学金C等",
                            4: "国家励志奖学金",
                            5: "精准扶贫",
                        }[typeId]}
                    </Col>
                    <Col span={8}>
                        <Button onClick={(e) => this.handleYesClick(id, e)}>审核通过</Button>
                        <Popconfirm 
                            title="请确认选择审核不通过？" 
                            onCancel={this.handelBtnClick}
                            onConfirm={(e) => this.handleNoClick(id, e)} 
                            okText="确定" 
                            cancelText="取消"
                            placement="topRight"
                        >
                            <Button type='danger' onClick={this.handelBtnClick}>审核不通过</Button>
                        </Popconfirm>
                    </Col>
                </Row>
            )
        };
        const PanelCentent = (props) => {
            const { studentName, studentNum, typeId, fatherName, fatherPhone, fatherProfe, motherName, motherPhone, motherProfe, income, money, reason, imageAdd } = props.secondinfos;
            
            return(
                <Row className='panel-content'>
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
                    <Col className='table'>
                        <div className='table-title'>家庭情况调查表</div>
                        <div><img width={600} src={`${envconfig.baseURL}/image/${imageAdd}`} alt="table"/></div>
                    </Col>
                </Row>
            )
        };
        return(
            <div className='second-manage-container'>
                <div className='second-list-container'>
                    <Row className='header'>材料复核</Row>
                    <Row className='list-header'>
                        <Col span={5}>申请表编号</Col>
                        <Col span={5}>申请时间</Col>
                        <Col span={5}>资助金类型</Col>
                    </Row>
                    {
                        secondinfos.length > 0 ?
                        <Collapse>
                        {
                            secondinfos.map((item, i) => {
                                return(
                                    <Panel header={<PanelHeader secondinfos={item}/>} key={i} style={{backgroundColor: '#fff'}}>
                                        <PanelCentent secondinfos={item}/>
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
                </div>
            </div>
        )
    }
}

export default Second;