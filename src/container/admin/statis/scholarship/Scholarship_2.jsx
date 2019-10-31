import React, { Component } from 'react';
import { Statistic, Row, Col, Divider, message } from 'antd';
import API from '../../../../api/api';

class Scholarship_2 extends Component {
    constructor() {
        super();
        this.state = {
            number: 0,
            total: 0,
        }
    }

    componentDidMount() {
        this._initStatisData();
    }

    // 初始化统计数值
    _initStatisData = async () => {
        const result = await API.getStatic();
        
        const { status, data } = result;
        if (status === 200) {
            this.setState({
                number: data[3].number,
                total: data[3].total,
            })
        } else {
            message.error('获取数据失败，请重试！');
        }
    }

    render() {
        const { number, total } = this.state;
        return(
            <div className='statistics-container'>
                <div className='data-container'>
                    <Divider>国家励志奖学金</Divider>
                    <Row >
                        <Col span={12}>
                            <Statistic title="人数" value={number} />  
                        </Col>
                        <Col span={12}>
                            <Statistic title="资助总金额" value={total*1000} />  
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Scholarship_2;