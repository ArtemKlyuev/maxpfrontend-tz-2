import React from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../shared/axiosInstance'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/news';
import NewsItem from '../../components/News/NewsItem/NewsItem';
import Preloader from '../../components/UI/Preloader/Preloader';

class News extends React.Component {
    componentDidMount() {
        const { news, onFetchNews } = this.props;
        if (!news) {
            onFetchNews();
        }

        console.log('component did mount[this.props.news]', this.props.news);
    }

    render() {
        const { news, loading, error } = this.props;
        let totalNews = <Preloader />;

        if (!loading) {
            console.log(typeof news);
            console.log('news', news);
            console.log('loading', loading);
            totalNews = news.map((item, i) => (
                <NewsItem key={item.title} {...item} />
            ));
        }

        console.log('News Props', this.props);

        return (
            <React.Fragment>
                {totalNews}
                {news && (
                    <p style={{ textAlign: 'center' }}>
                        Всего новостей: {news.length}
                    </p>
                )}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onFetchNews: () => dispatch(actions.fetchNews())
});

const mapStateToProps = (state) => ({
    news: state.news.news,
    loading: state.news.loading,
    error: state.news.error
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(News,axios));
