import React from 'react';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const menu = [
    { url: '', content: 'Trang chủ' },
    { url: 'channel', content: 'Truyền hình' },
    { url: 'hbo-go', content: 'HBO GO', menuLogo: images.logoMenuHbo },
    { url: 'category', content: 'Phim bộ' },
    { url: 'category', content: 'TV show' },
    { url: 'category', content: 'Anime' },
    { url: 'category', content: 'Phim lẻ' },
    { url: 'category', content: 'Phim chiếu rạp' },
    { url: 'category', content: 'Thể thao' },
    { url: 'category', content: 'Âm nhạc' },
    { url: 'category', content: 'Gói đặc sắc' },
    { url: 'category', content: 'Thiếu nhi' },
    { url: 'category', content: 'Hài' },
    { url: 'category', content: 'Học online' },
];

function Header() {
    const [active, setActive] = useState(0);
    let activeMenu;

    const HandleActive = (index) => {
        setActive(index);
    };
    const HandleChangeIndex = (index) => {
        let value;
        for (let i = 0; i < menu.length; i++) {
            for (let j = 0; j < menu.length; j++) {
                if (i === 9 && j === index) {
                    value = menu[i];
                    menu[i] = menu[j];
                    menu[j] = value;
                }
            }
        }
        setActive(9);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <a href="/" className={cx('logo')}>
                    <img src={images.logoFpt} alt="Fpt-Play" />
                </a>
                <div className={cx('header-inner')}>
                    <div className={cx('header-logo')}>
                        <div className={cx('header-logo-dowload')}>
                            <img className={cx('logo-dowload')} src={images.logoDowload} alt="Fpt-Play" />
                            <div className={cx('qr-codes')}>
                                <div className={cx('qr-code')}>
                                    <img className={cx('qr-android')} src={images.qrAndroid} />
                                    <img className={cx('icon-google-play')} src={images.iconGooglePlay} />
                                </div>
                                <div className={cx('qr-code')}>
                                    <img className={cx('qr-appstore')} src={images.qrAppStore} />
                                    <img className={cx('icon-appstore')} src={images.iconAppStore} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('header-logo-register')}>
                            <Link to="/dang-ky-dich-vu">
                                <img className={cx('logo-register')} src={images.logoRegister} alt="Fpt-Play" />
                                <img
                                    className={cx('logo-register-hover')}
                                    src={images.logoRegisterHover}
                                    alt="Fpt-Play"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={cx('header-function')}>
                        <ul className={cx('header-function-list')}>
                            <li className={cx('search')} onClick={() => HandleActive(-1)}>
                                <Link to={'/tim-kiem'}>
                                    <FontAwesomeIcon className={cx('search-item')} icon={faMagnifyingGlass} />
                                </Link>
                            </li>
                            <li>
                                <button className={cx({ btnPackage: 'btn-package', btn: 'btn' })}>MUA GÓI</button>
                            </li>
                            <li>
                                <Link to="/login" className={cx('login')}>
                                    Đăng nhập
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={cx('navbar')}>
                <div className={cx('navbar-inner')}>
                    <ul className={cx('navbar-inner-list')}>
                        {menu.map((item, index) => {
                            if (index <= 9) {
                                activeMenu = index === active ? 'active' : '';
                                return (
                                    <li key={index} className={cx(activeMenu)} onClick={() => HandleActive(index)}>
                                        <Link to={'/' + item.url} className={cx('navbar-item')}>
                                            {item.menuLogo ? (
                                                <img className={cx('navbar-item-img')} src={item.menuLogo} alt="" />
                                            ) : (
                                                ''
                                            )}
                                            {item.content}
                                        </Link>
                                    </li>
                                );
                            } else if (index === menu.length - 1) {
                                return (
                                    <li key={index} className={cx('navbar-item-them')}>
                                        <a className={cx('navbar-item')}>
                                            Xem thêm
                                            <FontAwesomeIcon className={cx('navbar-item-icon')} icon={faAngleDown} />
                                        </a>
                                        <ul className={cx('subnavbar-inner-list')}>
                                            {menu.map((item, index) => {
                                                if (index > 9) {
                                                    return (
                                                        <li key={index} onClick={() => HandleChangeIndex(index)}>
                                                            <Link to={'/' + item.url} className={cx('subnavbar-item')}>
                                                                <img src={item.menuLogo} alt="" />
                                                                {item.content}
                                                            </Link>
                                                        </li>
                                                    );
                                                }
                                            })}
                                        </ul>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
