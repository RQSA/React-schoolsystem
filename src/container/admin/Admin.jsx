import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { initAdminInfo } from '../../store/adminInfoReducer/actionCreator';
import './admin.less';

const { SubMenu } = Menu;
const {
    Header, Content, Footer, Sider,
} = Layout;

class Admin extends Component {
    static propTypes = {
        adminInfoData: PropTypes.object.isRequired,
        initAdminInfo: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            current: props.location.pathname.split('/')[2], //当前选中的菜单项
        }
    }

    componentDidMount() {
        //初始化管理员登录信息 判断登录状态
        this.props.initAdminInfo()
            .then(res => {
                if (this.props.adminInfoData.login_status === false) {
                    this.props.history.push('/app-login');
                }
            })
            .catch(err => {
                this.props.history.push('/app-login');
            })
    }

    shouldComponentUpdate(nextProps, nextState) {
        const current = nextProps.location.pathname.split('/')[2];
        if (current === 'datamanage') {
            nextState.current = nextProps.location.pathname.split('/')[3];
        } else {
            nextState.current = current;
        }
        // 使切换时tab栏显示正确
        return true;
    }

     // 菜单选中切换
    handleMenuClick = (e) => {
        this.setState({
          current: e.key,
        });
    }

    render() {
        const path = this.props.match.path;
        const { type } = this.props.adminInfoData;
        
        const AdminMenu = () => {
            return (
                <Menu mode='horizontal' selectedKeys={[this.state.current]} onClick={ this.handleMenuClick }> 
                    <Menu.Item key="person">
                        <Link to={ `${path}/person`}>
                            <Icon type="smile" />
                            <span className="nav-text">个人中心</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="notice">
                        <Link to={ `${path}/notice`}>
                            <Icon type="notification" />
                            <span className="nav-text">公告管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="instructor">
                        <Link to={ `${path}/instructor`}>
                            <Icon type="user" />
                            <span className="nav-text">辅导员管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="department">
                        <Link to={ `${path}/department`}>
                            <Icon type="align-left" />
                            <span className="nav-text">系别管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="major">
                        <Link to={ `${path}/major`}>
                            <Icon type="align-right" />
                            <span className="nav-text">专业管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="class">
                        <Link to={ `${path}/class`}>
                            <Icon type="align-center" />
                            <span className="nav-text">班级管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="grants">
                        <Link to={ `${path}/grants`}>
                            <Icon type="pay-circle" />
                            <span className="nav-text">资助金类型管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="second">
                        <Link to={ `${path}/second`}>
                            <Icon type="container" />
                            <span className="nav-text">材料复核</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="needy">
                        <Link to={ `${path}/needy`}>
                            <Icon type="team" />
                            <span className="nav-text">贫困生管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="Statis" title={<span className="nav-text"><Icon type="pie-chart" />汇总统计</span>}>
                        <Menu.Item key="Scholarship_1">
                            <Link to={ `${path}/Statis/1`}>
                                <span>国家奖学金</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="Scholarship_2">
                            <Link to={ `${path}/Statis/2`}>
                                <span>国家励志奖学金</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="Scholarship_3">
                            <Link to={ `${path}/Statis/3`}>
                                <span>精准扶贫</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            )
        }

        const InstructorMenu = () => {
            return (
                <Menu mode='horizontal' selectedKeys={[this.state.current]} onClick={ this.handleMenuClick }> 
                   <Menu.Item key="person">
                        <Link to={ `${path}/person`}>
                            <Icon type="smile" />
                            <span className="nav-text">个人中心</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="notice">
                        <Link to={ `${path}/notice`}>
                            <Icon type="notification" />
                            <span className="nav-text">浏览公告</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="grants">
                        <Link to={ `${path}/grants`}>
                            <Icon type="pay-circle" />
                            <span className="nav-text">查看资助金类型</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="first">
                        <Link to={ `${path}/first`}>
                            <Icon type="container" />
                            <span className="nav-text">材料初审</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="needy">
                        <Link to={ `${path}/needy`}>
                            <Icon type="team" />
                            <span className="nav-text">贫困生名单</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="needylist">
                        <Link to={ `${path}/needylist`}>
                            <Icon type="file-done" />
                            <span className="nav-text">获得资助名单</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="Statis" title={<span className="nav-text"><Icon type="pie-chart" />汇总统计</span>}>
                        <Menu.Item key="Scholarship_1">
                            <Link to={ `${path}/Statis/1`}>
                                <span>国家奖学金</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="Scholarship_2">
                            <Link to={ `${path}/Statis/2`}>
                                <span>国家励志奖学金</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="Scholarship_3">
                            <Link to={ `${path}/Statis/3`}>
                                <span>精准扶贫</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            )
        }

        const StudentMenu = () => {
            return (
                <Menu mode='horizontal' selectedKeys={[this.state.current]} onClick={ this.handleMenuClick }> 
                    <Menu.Item key="home">
                        <Link to={ `${path}/home`}>
                            <Icon type="home" />
                            <span className="nav-text">首页</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="person">
                        <Link to={ `${path}/person`}>
                            <Icon type="smile" />
                            <span className="nav-text">个人中心</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="notice">
                        <Link to={ `${path}/notice`}>
                            <Icon type="notification" />
                            <span className="nav-text">浏览公告</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="grants">
                        <Link to={ `${path}/grants`}>
                            <Icon type="pay-circle" />
                            <span className="nav-text">查看资助金类型</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="apply">
                        <Link to={ `${path}/apply`}>
                            <Icon type="container" />
                            <span className="nav-text">申请管理中心</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="needy">
                        <Link to={ `${path}/needy`}>
                            <Icon type="file-done" />
                            <span className="nav-text">获得资助名单</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            )
        }

        return(
            <Layout className='efafu-admin-container'>
                <Layout>
                    <Header style={{ background: 'rgba(255, 255, 255, .7)', padding: 0, height: 143 }} >
                        <div className="logo"></div>
                        <p className="header-title">电子科技大学中山学院贫困生管理系统</p>
                        { type === 'admin' ? <AdminMenu/> : null }
                        { type === 'instructor' ? <InstructorMenu/> : null }
                        { type === 'student' ? <StudentMenu/> : null }
                    </Header>
                    <Content style={{ margin: '32px' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        app ©2019 Created by 陈锐强
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    adminInfoData: state.adminInfoData,
})

const mapDispatchToProps = {
    initAdminInfo,
}

const Admin_Router = withRouter(Admin);

export default connect(mapStateToProps, mapDispatchToProps)(Admin_Router);