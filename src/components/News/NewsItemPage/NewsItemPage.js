import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NewsItem from '../NewsItem/NewsItem';

const newsItemPage = (props) => {
    if (!props.fullNewsItemToLoad) {
        return <Redirect to="/news" />;
    }

    const {
        description,
        publishedAt,
        title,
        url,
        urlToImage
    } = props.fullNewsItemToLoad;

    return (
        <NewsItem {...{ publishedAt, title }}>
            <img src={urlToImage} style={{ width: '100%' }} alt="News image" />
            <p>{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
                Читать в источнике
            </a>
        </NewsItem>
    );
};

const mapStateToProps = (state) => ({
    fullNewsItemToLoad: state.news.fullNewsItemToLoad
});

export default connect(mapStateToProps)(newsItemPage);
