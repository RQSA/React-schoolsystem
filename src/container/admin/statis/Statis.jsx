import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Scholarship_1 from './scholarship/Scholarship_1';
import Scholarship_2 from './scholarship/Scholarship_2';
import Scholarship_3 from './scholarship/Scholarship_3';
import './statis.less';

class Statis extends Component {
    render() {
        const path = this.props.match.path;
        
        return(
            <div className='statis-container'>
                <Switch>
                    <Route path={ `${path}/1`} component={ Scholarship_1 }/>
                    <Route path={ `${path}/2` } component={ Scholarship_2 } />
                    <Route path={ `${path}/3` } component={ Scholarship_3 } />
                    <Redirect to={ `${path}/1` } />
                </Switch>
            </div>
        )
    }
}

export default Statis;