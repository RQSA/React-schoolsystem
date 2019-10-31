import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';

// 按需加载
const Admin = asyncComponent(() => import('../container/admin/Admin')); //后台管理页面
const AdminLogin = asyncComponent(() => import('../container/adminLogin/AdminLogin')); //后台管理登录页面
// const Error = asyncComponent(() => import('../container/error/Error')); //404页面
const Person = asyncComponent(() => import('../container/admin/person/Person'));
// 管理员路由
const Notice = asyncComponent(() => import('../container/admin/notice/Notice'));
const Instructor = asyncComponent(() => import('../container/admin/instructor/Instructor'));
const Department = asyncComponent(() => import('../container/admin/department/Department'));
const Major = asyncComponent(() => import('../container/admin/major/Major'));
const Class = asyncComponent(() => import('../container/admin/class/Class'));
const Grants = asyncComponent(() => import('../container/admin/grants/Grants'));
const Needy = asyncComponent(() => import('../container/admin/needy/Needy'));
const Statis = asyncComponent(() => import('../container/admin/statis/Statis'));
const Second = asyncComponent(() => import('../container/admin/second/Second'));
// 贫困生路由
const Home = asyncComponent(() => import('../container/admin/home/Home'));
const NoticeList = asyncComponent(() => import('../container/admin/noticeList/NoticeList'));
const GrantsList = asyncComponent(() => import('../container/admin/grantsList/GrantsList'));
const Apply = asyncComponent(() => import('../container/admin/apply/Apply'));
const NeedyList = asyncComponent(() => import('../container/admin/needylist/Needylist'));
// 辅导员路由
const First = asyncComponent(() => import('../container/admin/first/First'));

// 管理员后台部分路由
const AdminRouter = () => {
    return(
        <Admin>
            <Switch>
                <Route path='/app-admin/person' component={ Person }/>
                <Route path='/app-admin/notice' component={ Notice }/>
                <Route path='/app-admin/instructor' component={ Instructor }/>
                <Route path='/app-admin/department' component={ Department }/>
                <Route path='/app-admin/major' component={ Major }/>
                <Route path='/app-admin/class' component={ Class }/>
                <Route path='/app-admin/grants' component={ Grants }/>
                <Route path='/app-admin/needy' component={ Needy }/>
                <Route path='/app-admin/statis' component={ Statis }/>
                <Route path='/app-admin/second' component={ Second }/>
                <Redirect to='/app-admin/notice' />
            </Switch>
        </Admin>
    )
}

// 贫困生后台部分路由
const StudentRouter = () => {
    return(
        <Admin>
            <Switch>
                <Route path='/app-student/home' component={ Home }/>
                <Route path='/app-student/person' component={ Person }/>
                <Route path='/app-student/notice' component={ NoticeList }/>
                <Route path='/app-student/grants' component={ GrantsList }/>
                <Route path='/app-student/apply' component={ Apply }/>
                <Route path='/app-student/needy' component={ NeedyList }/>
                <Redirect to='/app-student/home' />
            </Switch>
        </Admin>
    )
}

// 辅导员后台部分路由
const InstructorRouter = () => {
    return(
        <Admin>
            <Switch>
                <Route path='/app-instructor/person' component={ Person }/>
                <Route path='/app-instructor/notice' component={ NoticeList }/>
                <Route path='/app-instructor/grants' component={ GrantsList }/>
                <Route path='/app-instructor/first' component={ First }/>
                <Route path='/app-instructor/needy' component={ Needy }/>
                <Route path='/app-instructor/needylist' component={ NeedyList }/>
                <Route path='/app-instructor/statis' component={ Statis }/>
                <Redirect to='/app-instructor/notice' />
            </Switch>
        </Admin>
    )
}

const RouterBase = () => {
    return(
        <Router> 
            <Switch>
                <Route path='/app-login' component={ AdminLogin }></Route>
                <Route path='/app-admin' component={ AdminRouter }></Route>
                <Route path='/app-student' component={ StudentRouter }></Route>
                <Route path='/app-instructor' component={ InstructorRouter }></Route>
                <Redirect to='/app-login' exact strict/>
            </Switch>
        </Router>
    )
}

export default RouterBase;