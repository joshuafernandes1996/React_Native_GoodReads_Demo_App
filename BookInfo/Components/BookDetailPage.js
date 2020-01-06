import React, { Component } from 'react';
import { ScrollView, Dimensions, StyleSheet, FlatList, View, Text, SafeAreaView, Image, ProgressBarAndroid, ListView } from 'react-native';
import StarRatings from './StarRatings';
import { getBookInfo } from '../bookContainerActions';
import { connect } from 'react-redux';

export class App extends Component {

    componentDidMount() {
        const { navigation, getBookInfo } = this.props;
        let bookId = navigation.state.params.bookInfo.bookId;
        getBookInfo({ bookId: bookId })
    }

    render() {
        const { navigation, isLoadingInfo, bookInfo } = this.props;

        console.log('----------------------------', bookInfo)

        const numColumns = 3;
        const size = Dimensions.get('window').width / numColumns;

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#000',
                width: '100%',
                paddingTop: 10,
            },
            textStyle: {
                padding: 0,
                color: '#fff',
                fontSize: 11
            },
            itemContainer: {
                width: size,
                height: size + 50,
                margin: 3
            },
            item: {
                flex: 1,
                margin: 5,
                width: '100%',
                height: '100%',
            }
        });

        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    {isLoadingInfo && <ProgressBarAndroid />}
                    {!isLoadingInfo && <SafeAreaView >

                        <View>
                            <FlatList
                                numColumns={3}
                                data={bookInfo.similarBooks}
                                renderItem={({ item }) =>
                                    <View style={styles.itemContainer}>
                                        <Image
                                            style={styles.item}
                                            source={{ uri: item.img }}
                                            resizeMode={'cover'}
                                        />
                                    </View>
                                }
                                keyExtractor={(item, i) => i.toString()}
                                ListHeaderComponent={
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '30%', height: 200, padding: 10 }}>
                                                <Image
                                                    style={{ width: '100%', height: '100%' }}
                                                    source={{ uri: bookInfo.image }}
                                                    resizeMode={'contain'}
                                                />
                                            </View>
                                            <View style={{ padding: 10, width: '70%' }}>
                                                <Text style={styles.textStyle, { fontSize: 18, color: '#fff', fontWeight: 'bold' }}>{bookInfo.title}</Text>
                                                <StarRatings selectedStars={bookInfo.avgRating} /><Text style={styles.textStyle, { color: 'gray' }}>by {bookInfo.author}</Text>
                                                <Text style={styles.textStyle, { color: 'red' }}>{bookInfo.avgRating}</Text>

                                                <View style={{ padding: 0 }}>
                                                    <Text style={styles.textStyle}>{bookInfo.ratings_count} ratings</Text>
                                                    <Text style={styles.textStyle}>Published {bookInfo.pub_year} - Publisher {bookInfo.publisher}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ color: '#fff', padding: 10, fontSize: 18 }}>{bookInfo.description}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: '#fa604a', padding: 10 }}>Book Type: {bookInfo.format} - Pages: {bookInfo.numberOfPages}</Text>
                                        </View>
                                        <Text style={{ color: '#fff', padding: 10, fontSize: 18 }}>Similar Books...</Text>

                                    </View>
                                }
                            />
                        </View>
                    </SafeAreaView>}
                </SafeAreaView>
            </View>
        );
    }
}



function mapStateToProps(state) {
    return {
        bookInfo: state.BookList.bookInfo,
        isLoadingInfo: state.BookList.isLoadingInfo
    }
}

const mapDispatchToProps = dispatch => ({
    getBookInfo: (x) => dispatch(getBookInfo(x))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);