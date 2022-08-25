import React, { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import images from '~/assets/images';
import { phimBo, phimLe } from '~/dataFilm';
import { Slide01, API, SlidePoster, SlideThumb } from '~/components/componentDetail';

const cx = classNames.bind(styles);

function Home() {
    let data;
    useEffect(() => {
        data = API('https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=2');
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Slide01 />
            <div className={cx('home-categorys')}>
                <SlidePoster dataName={'Thể thao'} data={phimLe} />
            </div>
            <div className={cx('home-categorys')}>
                <SlideThumb dataName={'Thể thao'} data={phimLe} />
            </div>
        </div>
    );
}

export default Home;
