import React from 'react';
import { TextInput, ProgressBarAndroid, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getBookList } from './bookContainerActions';
import { connect } from 'react-redux';
import BookList from './Components/BookList';
import { Keyboard } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        paddingTop: 10,
        height: 10
    },
});

export class BookListContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            searchValue: '',
            page: 1
        }
        this._getBookList = this._getBookList.bind(this);
        this._onChangeText = this._onChangeText.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
    }

    componentDidMount() {
        const { getBookList } = this.props;
        getBookList({ q: 'adventure', page: 1 });
        this.setState({ ...this.state, searchValue: 'adventure', page: 1 })
    }

    _getBookList = () => {
        const { getBookList } = this.props;
        this.setState({ ...this.state, page: 1 }, () => {
            getBookList({ q: this.state.searchValue, page: 1 });
            Keyboard.dismiss()
        })
    }

    _onEndReached = () => {
        const { getBookList } = this.props;
        this.setState({ ...this.state, page: this.state.page + 1 }, () => {
            getBookList({ q: this.state.searchValue, isLoadingMore: true, page: this.state.page });
        })
    }

    _onChangeText = (text) => {
        this.setState({ ...this.state, searchValue: text })
    }

    render() {

        const { isLoading, bookList, navigation, totalRes, isLoadingMore } = this.props;
        const { searchValue } = this.state;

        return (
            <View style={styles.container}>
                {isLoading && <ProgressBarAndroid style={{ position: 'absolute', top: 0, width: '100%' }} styleAttr="Horizontal" />}

                <View style={{
                    flexDirection: 'row',
                    margin: 10
                }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '70%', borderRadius: 4, color: '#fff', padding: 10 }}
                        onChangeText={text => this._onChangeText(text)}
                        value={searchValue}
                        placeholder={'Enter Search Criteria'}
                        placeholderTextColor={'gray'}
                    />
                    <TouchableOpacity style={{
                        backgroundColor: 'red', marginLeft: 2, marginRight: 2, borderRadius: 4, alignItems: 'center', width: '28%', justifyContent: 'center'
                    }} onPress={this._getBookList}>
                        <Text style={{ color: '#fff', fontSize: 15 }}>Search</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'yellow', fontSize: 12, width: '100%', textAlign: 'center', opacity: isLoading ? 0 : 1 }}>Found {totalRes}</Text>
                <View style={{ height: '82%' }}>
                    <BookList onEndReached={this._onEndReached} list={bookList} navigation={navigation} />
                </View>
                {/* <Text style={{ color: 'yellow', fontSize: 12, width: '100%', textAlign: 'center', opacity: isLoading ? 0 : 1 }}>Viewed till Page {this.state.page}</Text> */}
                {isLoadingMore && <ProgressBarAndroid />}
            </View>
        )
    }
}

getBookListFromData = (data) => {
    let arrayOfBooks = [];

    if (data && Array.isArray(data.search.results.work)) {
        data.search.results.work.map(x => {

            arrayOfBooks.push({
                id: x.id._text,
                bookCount: x.books_count._text,
                totalRatings: x.ratings_count._text,
                year: x.original_publication_year._text,
                month: x.original_publication_month._text,
                day: x.original_publication_day._text,
                avgRating: x.average_rating._text,
                bookInfo: {
                    title: x.best_book.title._text,
                    author: x.best_book.author.name._text,
                    img: x.best_book.image_url._text,
                }
            })
        });
    }

    return arrayOfBooks;
}

function mapStateToProps(state) {
    return {
        bookList: state.BookList.list,
        isLoading: state.BookList.isLoading,
        totalRes: state.BookList.totalFound,
        isLoadingMore: state.BookList.isLoadingMore
    }
}

const mapDispatchToProps = dispatch => ({
    getBookList: (x) => dispatch(getBookList(x))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookListContainer);
