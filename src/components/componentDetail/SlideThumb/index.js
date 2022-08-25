import classNames from 'classnames/bind';

import styles from './SlideThumb.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function SlideThumb(props) {
    const { dataName, data } = props;
    const cardItemRef = useRef(null);
    const cardWrapRef = useRef(null);
    const prevRef = useRef(null);
    let changeWidth = 0;

    const changeImage = (number) => {
        cardWrapRef.current.style.marginLeft = '-' + number + 'px';
    };

    const handlePrevSlide = () => {
        if (changeWidth !== 0) {
            changeWidth -= cardItemRef.current.clientWidth * 3 - 1.5;
            changeImage(changeWidth);
        }
        if (changeWidth === 0) {
            prevRef.current.style.display = 'none';
        }
    };
    const handleNextSlide = () => {
        changeWidth += cardItemRef.current.clientWidth * 3 - 1.5;
        changeImage(changeWidth);
        if (changeWidth !== 0) {
            prevRef.current.style.display = 'flex';
        }
        console.log('next');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-name')}>
                    <h3>{dataName}</h3>
                </div>
                <div className={cx({ prev: 'prev', moveImg: 'moveImg' })} onClick={handlePrevSlide} ref={prevRef}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className={cx({ next: 'next', moveImg: 'moveImg' })} onClick={handleNextSlide}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>

                <div className={cx('gallery-wrap')} ref={cardWrapRef}>
                    {data &&
                        data.map((phimItem, index) => {
                            return (
                                <div className={cx('card_item')} key={index} ref={cardItemRef}>
                                    <img
                                        src={phimItem.movie.thumb_url}
                                        alt={phimItem.movie.origin_name}
                                        className={cx('card_item-image')}
                                    />
                                    <div className={cx('card_item-name')}>
                                        <h5>{phimItem.movie.origin_name}</h5>
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
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default SlideThumb;
