import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { initUserInfo } from '../store/userInfoReducer/actionCreator';
import PublicHeader from '../component/publicHeader/Header';
import PublicFooter from '../component/puclicFooter/Footer';
import BackTop from '../component/backTop/BackTop';

class Efafu extends Component {
    static propTypes = {
        userInfoData: PropTypes.object.isRequired,
        initUserInfo: PropTypes.func.isRequired,
    }

    componentWillMount() {
        this.props.initUserInfo(); //初始化用户信息，判断登录状态
    }

    render() {
        const { userInfoData } = this.props;
        return(
            <div className='efafu-container'>
                <PublicHeader userInfoData={userInfoData}/>
                    {this.props.children}
                <PublicFooter />
                <BackTop />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userInfoData: state.userInfoData,
})

const mapDispatchToProps = {
    initUserInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Efafu);