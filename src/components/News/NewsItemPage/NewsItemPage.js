import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NewsItem from '../NewsItem/NewsItem';
import GoBack from '../../UI/GoBack/GoBack';

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
            <GoBack history={props.history} />
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
