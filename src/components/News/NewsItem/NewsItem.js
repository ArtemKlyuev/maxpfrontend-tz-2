import React from 'react';
import classes from './NewsItem.module.css';

const newsItem = (props) => {
    const { title, text } = props;

    let activeClass = classes.NewsItem_preview;

    return (
        <div className={activeClass}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
};

export default newsItem;
