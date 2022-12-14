import React from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Category.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Category() {
    return <div className={cx('wrapper')}></div>;
}

export default Category;
