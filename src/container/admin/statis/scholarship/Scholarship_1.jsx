import React, { Component } from 'react';
import { Statistic, Row, Col, Divider, message } from 'antd';
import API from '../../../../api/api';

class Scholarship_1 extends Component {
    constructor() {
        super();
        this.state = {
            statis: [{
                number: 0,
                total: 0,
            },{
                number: 0,
                total: 0,
            },{
                number: 0,
                total: 0,
            },],
        }
    }

    componentDidMount() {
        this._initStatisData();
    }

    // 初始化统计数值
    _initStatisData = async () => {
        const result = await API.getStatic();
        
        const { status, data: statis } = result;
        if (status === 200) {
            this.setState({
                statis,
            })
        } else {
            message.error('获取数据失败，请重试！');
        }
    }

    render() {
        const { statis } = this.state;
        return(
            <div className='statistics-container'>
                <div className='data-container'>
                    <Divider>A等国家助学金</Divider>
                    <Row >
                        <Col span={12}>
                            <Statistic title="人数" value={statis[0].number} />  
                        </Col>
                        <Col span={12}>
                            <Statistic title="资助总金额" value={statis[0].total*1000} />  
                        </Col>
                    </Row>
                    <Divider>B等国家助学金</Divider>
                    <Row >
                        <Col span={12}>
                            <Statistic title="人数" value={statis[1].number} />  
                        </Col>
                        <Col span={12}>
                            <Statistic title="资助总金额" value={statis[1].total*1000} />  
                        </Col>
                    </Row>
                    <Divider>C等国家助学金</Divider>
                    <Row >
                        <Col span={12}>
                            <Statistic title="人数" value={statis[2].number} />  
                        </Col>
                        <Col span={12}>
                            <Statistic title="资助总金额" value={statis[2].total*1000} />  
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Scholarship_1;