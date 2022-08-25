import classNames from 'classnames/bind';

import styles from './Slide01.module.scss';
import { phimBo, phimLe } from '~/dataFilm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function Slide01({ children }) {
    const Slide01GalleryRef = useRef(null);
    const SlideImageRef = useRef(null);
    let changeWidth = 0;

    useEffect(() => {
        const timeInter = setInterval(() => {
            if (changeWidth === 10350) {
                changeWidth = 0;
                changeImage(changeWidth);
            } else {
                changeWidth += SlideImageRef.current.clientWidth;
                changeImage(changeWidth);
            }
        }, 6000);
        return () => {
            clearInterval(timeInter);
        };
    }, []);

    const changeImage = (number) => {
        Slide01GalleryRef.current.style.marginLeft = '-' + number + 'px';
    };

    const handleNextSlide = () => {
        if (changeWidth === 10350) {
            changeWidth = 0;
            changeImage(changeWidth);
        } else {
            changeWidth += SlideImageRef.current.clientWidth;
            changeImage(changeWidth);
        }
    };
    const handlePrevSlide = () => {
        if (changeWidth === 0) {
            changeWidth = 10350;
            changeImage(changeWidth);
        } else {
            changeWidth -= SlideImageRef.current.clientWidth;
            changeImage(changeWidth);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx({ prev: 'prev', moveImg: 'moveImg' })} onClick={handlePrevSlide}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className={cx({ next: 'next', moveImg: 'moveImg' })} onClick={handleNextSlide}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>

                <div className={cx('gallery-wrap')} ref={Slide01GalleryRef}>
                    {phimLe.map((phimItem, index) => {
                        if (index <= 9) {
                            let episode_total;
                            if (phimItem.movie.episode_total.indexOf('Tập') != -1) {
                                episode_total = 'Trọn bộ ' + phimItem.movie.episode_total;
                            } else {
                                episode_total = phimItem.movie.origin_name + ' ' + phimItem.movie.year;
                            }
                            return (
                                <div className={cx('image')} key={index} ref={SlideImageRef}>
                                    <div className={cx('name-episode')}>
                                        <h3>{phimItem.movie.name}</h3>
                                        <h5>{episode_total}</h5>
                                        <Link
                                            to={'/xem-video'}
                                            className={cx({
                                                btnMovieView: 'btnMovieView',
                                                btn: 'btn',
                                            })}
                                        >
                                            Xem ngay
                                            <FontAwesomeIcon icon={faAngleRight} className={cx('icon-right')} />
                                        </Link>
                                    </div>

                                    <div className={cx('chieurap-quality-lang')}>
                                        {phimItem.movie.chieurap === true ? (
                                            <h5
                                                className={cx({
                                                    chieuRap: 'chieuRap',
                                                    labelInfo: 'labelInfo',
                                                })}
                                            >
                                                Chiếu rạp
                                            </h5>
                                        ) : (
                                            ''
                                        )}

                                        <h5
                                            className={cx({
                                                qualityLang: 'quality-lang',
                                                labelInfo: 'labelInfo',
                                            })}
                                        >
                                            {phimItem.movie.quality} -{phimItem.movie.lang}
                                        </h5>
                                    </div>

                                    <img src={phimItem.movie.poster_url} alt={phimItem.movie.name} />
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default Slide01;
