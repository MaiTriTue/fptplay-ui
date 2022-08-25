import classNames from 'classnames/bind';

import styles from './WatchMovie.module.scss';
import { phimBo, phimLe } from '~/dataFilm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faFlag,
    faHeart,
    faMessage,
    faPaperPlane,
    faPlay,
    faShareNodes,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import images from '~/assets/images';
import { Comment, CommentChildren, SlidePoster, IframeMovie } from '~/components/componentDetail';

const cx = classNames.bind(styles);

function WatchMovie(props) {
    let count = 1;
    let select = 0;
    const [sumActive, setSumActive] = useState(0);
    const [followActive, setFollowActive] = useState(false);
    const [episodeActive, setEpisodeActive] = useState(0);
    const [showContent, setShowContent] = useState(false);

    const [sortComment, setSortComment] = useState(0);
    const contentRef = useRef(null);

    const selectRef = useRef(0);

    // comment cap 2
    let commentAll = [
        {
            id: 12345,
            use: 'Dương Tử',
            imgUse: images.iconDefaultUse,
            content: 'Kết đẹp zậy mà mn chê hoài zị',
            like: 2,
            report: '',
            time: 'Khoảng 9 ngày trước',
            comment: [
                {
                    id: 12345,
                    use: 'Dương Tử',
                    imgUse: images.iconDefaultUse,
                    content: 'Kết đẹp zậy mà mn chê hoài zị',
                    like: 2,
                    report: '',
                    time: 'Khoảng 9 ngày trước',

                    comment: [],
                },
            ],
        },
        {
            id: 12346,
            use: 'Long Tử',
            imgUse: images.iconDefaultUse,
            content: 'Kết đẹp zậy mà mn chê hoài zị',
            like: 5,
            report: '',
            time: 'Khoảng 3 ngày trước',
            comment: [],
        },
    ];

    let episode18 = [];
    let episode = [];
    let numberEpisode = Number(phimBo[0].movie.episode_total.split(' ')[0]);

    useEffect(() => {
        if (showContent === true) {
            contentRef.current.style.height = 'unset';
        } else if (showContent === false) {
            contentRef.current.style.height = '54.6px';
        }
    }, [showContent]);

    // comment 02

    const deleteTagHtml = (str) => {
        let newContent = '';
        str = str.split('<p>');
        str.forEach((item, index) => {
            if (item.indexOf('</p>')) {
                item = item.split('</p>');
                item.forEach((newItem) => {
                    newContent += newItem;
                });
            }
            newContent += item;
        });

        return newContent;
    };

    for (let i = 0; i < numberEpisode; i++) {
        episode.push(i + 1);
        if (i === 0 && numberEpisode <= 18) {
            episode18.push(`Tập 1 - Tập ${numberEpisode + 1}`);
        } else if (i === 0 && numberEpisode > 18) {
            episode18.push(`Tập 1 - Tập 18`);
        }
        if ((i + 1) % 18 === 0) {
            count++;

            if (numberEpisode <= count * 18) {
                episode18.push(`Tập ${i + 2} - Tập ${numberEpisode}`);
            } else if (numberEpisode > count * 18) {
                episode18.push(`Tập ${i + 2} - Tập ${count * 18}`);
            }
        }
    }

    const HandleSumepisode = (index) => {
        setSumActive(index);
    };
    const HandleEpisodeActive = (index) => {
        setEpisodeActive(index);
    };
    const HandleFollowActive = () => {
        setFollowActive(!followActive);
    };
    const HandleShowContent = () => {
        setShowContent(!showContent);
    };

    const handleChange = (e) => {
        console.log(selectRef.current);
        console.log(e.target.value);
        selectRef.current = e.target.value;
        console.log(selectRef.current);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap')}>
                    <div className={cx('gallery_wrap-video')}>
                        <IframeMovie />
                        {/* <div className={cx('group')} id="process-video">
                            <div
                                className={cx('poster-image')}
                                id="poster-image"
                                onClick={fadeImage}
                                ref={posterImageRef}
                            >
                                <FontAwesomeIcon icon={faPlay} className={cx('poster-image-icon')} />
                            </div>
                           
                            <iframe
                                id="vimeo"
                                ref={iframeRef}
                                src="https://aa.nguonphimmoi.com/share/1f0e3dad99908345f7439f8ffabdffc4?autoplay=1"
                                width="500"
                                height="281"
                                frameBorder="0"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
                            ></iframe>
                        </div> */}

                        {/* <iframe
                            style={{ border: 'none' }}
                            loading="eager"
                            className={cx('video')}
                            frameBorder="0"
                            allowtransparency="true"
                            allowFullScreen
                            src="https://aa.nguonphimmoi.com/share/1f0e3dad99908345f7439f8ffabdffc4?autoplay=1"
                        ></iframe> */}
                    </div>
                    <div className={cx('gallery_wrap-episode')}>
                        <h3 className={cx('gallery_wrap-episode-title')}>Tập phim</h3>
                        <div className={cx('gallery_wrap-episode-detail')}>
                            <div className={cx('episodes-wrap01')}>
                                <ul className={cx('episodesWrap')}>
                                    {episode18 &&
                                        episode18.map((item, index) => {
                                            if (sumActive === index) {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            sumEpisode: 'sumEpisode',
                                                            active: 'active',
                                                        })}
                                                        onClick={() => HandleSumepisode(index)}
                                                    >
                                                        {item}
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            sumEpisode: 'sumEpisode',
                                                        })}
                                                        onClick={() => HandleSumepisode(index)}
                                                    >
                                                        {item}
                                                    </li>
                                                );
                                            }
                                        })}
                                </ul>
                            </div>
                            <div className={cx('episodes-wrap02')}>
                                <ul className={cx('episodesWrap')}>
                                    {episode &&
                                        episode.map((item, index) => {
                                            if (sumActive === 0 && index + 1 <= 18) {
                                                return episodeActive === index ? (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            episode: 'episode',
                                                            active: 'active',
                                                        })}
                                                        onClick={() => HandleEpisodeActive(index)}
                                                    >
                                                        Tập {item}
                                                    </li>
                                                ) : (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            episode: 'episode',
                                                        })}
                                                        onClick={() => HandleEpisodeActive(index)}
                                                    >
                                                        Tập {item}
                                                    </li>
                                                );
                                            } else if (
                                                sumActive !== 0 &&
                                                index + 1 > 18 * sumActive &&
                                                index + 1 < 18 * (sumActive + 1)
                                            ) {
                                                return episodeActive === index ? (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            episode: 'episode',
                                                            active: 'active',
                                                        })}
                                                        onClick={() => HandleEpisodeActive(index)}
                                                    >
                                                        Tập {item}
                                                    </li>
                                                ) : (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            episode: 'episode',
                                                        })}
                                                        onClick={() => HandleEpisodeActive(index)}
                                                    >
                                                        Tập {item}
                                                    </li>
                                                );
                                            }
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className={cx('gallery_wrap-movie-info')}>
                        <div className={cx('movie_info-thumb')}>
                            <img src={phimBo[0].movie.thumb_url} alt={phimBo[0].movie.slug} />
                        </div>
                        {/*  */}
                        <div className={cx('movie_info-content')}>
                            <div className={cx('info-name')}>
                                <div className={cx('info-name-vietnames')}>{phimBo[0].movie.name}</div>
                                <div className={cx('info-name-english')}>{phimBo[0].movie.origin_name}</div>
                            </div>

                            <div className={cx('info-btn-contact')}>
                                {followActive === true ? (
                                    <button
                                        className={cx({
                                            infoBtnFollow: 'infoBtnFollow',
                                            btnFollowActive: 'btnFollowActive',
                                        })}
                                        onClick={HandleFollowActive}
                                    >
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon-follow')} />
                                        <span>Theo dõi</span>
                                    </button>
                                ) : (
                                    <button className={cx('infoBtnFollow')} onClick={HandleFollowActive}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon-follow')} />
                                        <span>Theo dõi</span>
                                    </button>
                                )}

                                <button
                                    className={cx({
                                        infoBtnShare: 'infoBtnShare',
                                        btn: 'btn',
                                    })}
                                >
                                    <FontAwesomeIcon icon={faShareNodes} className={cx('icon-follow')} />
                                    <span>Chia sẻ</span>
                                </button>
                            </div>
                            <div className={cx('info-title')}>Nội dung</div>
                            <div className={cx('info-content')}>
                                <p className={cx('content-detail')} ref={contentRef}>
                                    {deleteTagHtml(phimBo[0].movie.content)}
                                </p>
                                {showContent === false ? (
                                    <div className={cx('infoShowContent')} onClick={HandleShowContent}>
                                        <span>Xem thêm</span>
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('icon-down')} />
                                    </div>
                                ) : (
                                    <div className={cx('infoShowContent')} onClick={HandleShowContent}>
                                        <span>Thu gọn</span>
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('icon-down')} />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/*  */}
                        <div className={cx('movie_info-cast')}>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Số tập</div>
                                <div className={cx('info_cast-value')}>{phimBo[0].movie.episode_current}</div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Thời lượng</div>
                                <div className={cx('info_cast-value')}>{phimBo[0].movie.time}</div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Đạo diễn</div>
                                <div className={cx('info_cast-value')}>
                                    {phimBo[0].movie.director.map((item, index) => {
                                        return item;
                                    })}
                                </div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Diễn viên</div>
                                <div className={cx('info_cast-value')}>
                                    {phimBo[0].movie.actor[0]}, {phimBo[0].movie.actor[1]}
                                </div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Quốc gia</div>
                                <div className={cx('info_cast-value')}>{phimBo[0].movie.country[0].name}</div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Thể loại</div>
                                <div className={cx('info_cast-value')}>{phimBo[0].movie.category[0].name}</div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Phát hành</div>
                                <div className={cx('info_cast-value')}>{phimBo[0].movie.year}</div>
                            </div>
                        </div>
                    </div>

                    {/* comment */}
                    <div className={cx('gallery_wrap-comments')}>
                        <div className={cx('container_title')}>Bình luận</div>
                        <div className={cx('container_comment')}>
                            <div className={cx('container_comment-option')}>
                                <span className={cx('container_comment-amount')}>30 bình luận</span>
                                <div className={cx('container_comment-Sort')}>
                                    <span>Sắp xếp theo:</span>
                                    <select onChange={(e) => handleChange(e)}>
                                        <option value="0">Mới nhất</option>
                                        <option value="1">Nhiều like nhất</option>
                                        <option value="2">Cũ nhất</option>
                                    </select>
                                </div>
                            </div>
                            <div className={cx('container_comment-inputs')}>
                                <div className={cx('container_comment-useImg')}>
                                    <img src={images.iconDefaultUse} alt="use-icon" />
                                </div>
                                <div id="comment_input-1" className={cx('container_comment-input')}>
                                    <input
                                        id="cmt"
                                        type={'text'}
                                        className={cx('comment-input')}
                                        placeholder="Viết bình luận..."
                                    />
                                    <FontAwesomeIcon icon={faPaperPlane} className={cx('comment-input-icon')} />
                                </div>
                            </div>
                            <ul className={cx('container_comments-detail')}>
                                {/* binh luan */}
                                {commentAll &&
                                    commentAll.map((commentItem, index) => {
                                        return <Comment key={index} commentItem={commentItem} index={index} />;
                                    })}
                            </ul>
                            {/* <div className={cx('container_comments')}></div> */}
                        </div>
                    </div>

                    {/* trailer */}
                    <div className={cx('gallery_wrap-traile')}>
                        <SlidePoster dataName="Trailer - Clip hậu trường" data={phimBo} />
                    </div>

                    {/* phim lien quan */}

                    <div className={cx('gallery_wrap-relater-movies')}>
                        <SlidePoster dataName="Nội dung liên quan" data={phimBo} />
                    </div>

                    {/* dan dien vien */}
                    <div className={cx('gallery_wrap-cast')}></div>
                </div>
            </div>
        </div>
    );
}

export default WatchMovie;
