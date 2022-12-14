import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import cookies from 'react-cookies';

import images from '~/assets/images';
import styles from './Login.module.scss';
import { useStore, actions } from '~/Store';
import { InputUserName, InputPassword, Validator, WarningUserLogin } from '~/components/componentDetail';
import Apis, { endpoints } from '~/Apis/Apis';

const cx = classNames.bind(styles);

function Login() {
    let oauth2Info;
    const wrapperRef = useRef(null);
    const warningLoginRef = useRef(null);
    const navigate = useNavigate();
    const [state, dispatch] = useStore();
    const { userName, password, checkUserValid, checkPassValid, userLogin, warningLogin } = state;

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (warningLogin === true) {
            warningLoginRef.current.style.display = 'block';
        } else if (warningLogin === false) {
            warningLoginRef.current.style.display = 'none';
        }
    }, [warningLogin]);

    console.log(offset);

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (checkUserValid && checkPassValid) {
            console.log(userName);
            console.log(password);

            await Apis.get(endpoints['oauth2_info'])
                .then((res) => {
                    oauth2Info = res.data[0];
                })
                .catch(function (error) {
                    dispatch(actions.setWarningLogin(true));
                    console.log(error);
                });

            await Apis.post(endpoints['get_token'], {
                client_id: oauth2Info.client_id,
                client_secret: oauth2Info.client_secret,
                username: userName,
                password: password,
                grant_type: 'password',
            })
                .then((res) => {
                    cookies.save('origin-movie-access_token', res.data.access_token);
                })
                .catch(function (error) {
                    dispatch(actions.setWarningLogin(true));
                    console.log(error);
                });

            await Apis.get(endpoints['current_user'], {
                headers: {
                    Authorization: `Bearer ${cookies.load('origin-movie-access_token')}`,
                },
            })
                .then((res) => {
                    console.log(res.data);
                    cookies.save('origin-movie-user', res.data);
                    dispatch(actions.setUserLogin(res.data));
                    navigate('/');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <div className={cx('wrapper-warning')} ref={warningLoginRef}>
                <WarningUserLogin />
            </div>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap-title')}>
                    <h2>????ng nh???p</h2>
                </div>

                <div className={cx('gallery-wrap')}>
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <InputUserName />
                        <InputPassword />
                        <div className={cx('gallery-wrap-input')}>
                            <div className={cx('wrap-input')}>
                                <input type={'submit'} className={cx('submit')} id={'submit'} value={'????ng nh????p'} />
                            </div>
                        </div>
                    </form>

                    <div className={cx('forgot-password')}>
                        <span>
                            <Link to={'/'}>Qu??n m???t kh???u</Link>
                        </span>
                    </div>
                    <div className={cx('wrap-or')}>
                        <div className={cx('cross')}></div>
                        <span>ho???c</span>
                    </div>

                    <div className={cx('gallery-wrap-facebook')}>
                        <div className={cx('wrap-input')}>
                            <input
                                type={'button'}
                                className={cx('login-facebook')}
                                id={'login-facebook'}
                                value={'Facebook'}
                            />
                        </div>
                    </div>
                    <div className={cx('gallery-wrap-input')}>
                        <div className={cx('wrap-input')}>
                            <input
                                type={'button'}
                                className={cx('login-google')}
                                id={'login-google'}
                                value={'Google'}
                            />
                        </div>
                    </div>

                    <div className={cx('forgot-password')}>
                        <span className={cx('quest')}>Ch??a c?? t??i kho???n?</span>
                        <span>
                            <Link to={'/dang-ky'}>????ng k?? ngay</Link>
                        </span>
                    </div>

                    <div className={cx('forgot-password')}>
                        <span>
                            <Link to={'/'}>Ch??nh s??ch v?? quy ?????nh</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
