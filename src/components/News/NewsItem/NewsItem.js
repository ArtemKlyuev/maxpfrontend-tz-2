import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/news';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import classes from './NewsItem.module.css';

const newsItem = (props) => {
    const {
        description,
        publishedAt,
        title,
        url,
        urlToImage,
        isPreview,
        index
    } = props;

    const date = new Date(publishedAt);
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (String(minutes).length === 1) {
        minutes = '0' + minutes;
    }

    const time = `${hours}:${minutes}`;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dateStr = `${day}/${month}/${year} ${time}`;

    let activeClass = classes.NewsItem_preview;

    if (!isPreview) {
        activeClass = classes.NewsItem_full;
    }

    const moreInfoHandler = (e) => {
        console.log(e.currentTarget);
        props.onMoreInfoClicked({
            description,
            publishedAt,
            title,
            url,
            urlToImage
        });
    };

    const moreInfoBtn = (
        <Link to={(location) => `${location.pathname}/${index}`}>
            <Button clicked={moreInfoHandler}>Читать далее</Button>
        </Link>
    );

    return (
        <div className={activeClass}>
            <span>{dateStr} </span>
            <h3>{title}</h3>
            {isPreview && moreInfoBtn}
            {props.children}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    onMoreInfoClicked: (newsItem) => dispatch(actions.moreInfoClicked(newsItem))
});

export default connect(
    null,
    mapDispatchToProps
)(newsItem);
