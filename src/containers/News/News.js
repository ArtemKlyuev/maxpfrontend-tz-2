import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/news';
import NewsItem from '../../components/News/NewsItem/NewsItem';

class News extends React.Component {
    componentDidMount() {
        this.props.onFetchNews();
        console.log('component did mount[this.props.news]', this.props.news);
    }

    render() {
        const { news, loading, error } = this.props;
        const isNewsPreview = this.props.match.url === '/news';
        let totalNews = (
            <p style={{ textAlign: 'center' }}>
                Идёт загрузка данных, пожалуйста, подождите
            </p>
        );

        if (!loading) {
            console.log(typeof news);
            console.log('news', news);
            console.log('loading', loading);
            totalNews = news.map((item, i) => (
                <NewsItem
                    key={item.title}
                    isPreview={isNewsPreview}
                    index={i + 1}
                    {...item}
                />
            ));
        }

        console.log('News Props', this.props);

        return (
            <React.Fragment>
                {error ? (
                    <p style={{ textAlign: 'center' }}>
                        Произошла ошибка при загрузке данных
                    </p>
                ) : (
                    totalNews
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
    error: state.news.error,
    isMoreInfoClicked: state.news.isMoreInfoClicked,
    fullNewsItemToLoad: state.news.fullNewsItemToLoad
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(News);
