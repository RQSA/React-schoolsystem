import React, { Component } from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import './carousel.less';

import itemImg1 from '../../images/banner-img1.png';
import itemImg2 from '../../images/banner-img2.png';
import itemImg3 from '../../images/banner-img3.png';

export default class EfafuCarousel extends Component {
    render() {
        return(
            <Carousel 
                autoplay 
                autoplaySpeed={ 2000 }
                >
                <div><Link to='/app-student/person'><img src={ itemImg1 } alt='banner-img'/></Link></div>
                <div><Link to='/app-student/grants'><img src={ itemImg2 } alt='banner-img'/></Link></div>
                <div><Link to='/app-student/needy'><img src={ itemImg3 } alt='banner-img'/></Link></div>
            </Carousel>
        )
    }
}
