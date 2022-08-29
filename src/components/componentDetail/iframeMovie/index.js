import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';

import styles from './iframeMovie.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function IframeMovie(props) {
    const { dataName, data } = props;
    const iframeRef = useRef(null);
    const posterImageRef = useRef(null);
    let timeId;

    useEffect(() => {
        timeId = setTimeout(() => {
            posterImageRef.current.style.display = 'none';
        }, 2000);
    }, []);

    const fadeImage = () => {
        posterImageRef.current.style.display = 'none';
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap')}>
                    <div className={cx('gallery-name')}>
                        <h3>Phim tan the tai han quoc</h3>
                    </div>
                    <div className={cx('group')} id="process-video">
                        <div className={cx('poster-image')} id="poster-image" onClick={fadeImage} ref={posterImageRef}>
                            <FontAwesomeIcon icon={faPlay} className={cx('poster-image-icon')} />
                        </div>

                        <iframe
                            id="iframeMovie"
                            ref={iframeRef}
                            src="https://aa.nguonphimmoi.com/share/1f0e3dad99908345f7439f8ffabdffc4?autoplay=1"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IframeMovie;
