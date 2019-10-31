import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Calendar, Steps, Divider } from 'antd';
import Carousel from '../../../component/carousel/Carousel';
import './home.less';

const { Step } = Steps;

class Home extends Component {

    render() {
        return(
            <div className='home-container'>
                <Row>
                    <Col span={14}>
                        <Carousel />
                    </Col>
                    <Col span={10} style={{padding: '10px 20px'}}>
                        <Calendar fullscreen={false} />
                    </Col>
                </Row>
                <Divider style={{margin: '36px 0'}}>申请贫困金三步走</Divider>
                <Row>
                    <Steps current={1}>
                        <Step title="填表上传" description="填写家庭信息和上传调查表" />
                        <Step title="初审" description="通过辅导员初审" />
                        <Step title="复审" description="通过管理员复审" />
                    </Steps>
                </Row>
                <Row style={{textAlign: "center"}}>
                    <Button type="primary">
                        <Link to='/app-student/apply'>
                            点我快速进行申请！
                        </Link>
                    </Button>
                </Row>
            </div>
        )
    }
}

export default Home;