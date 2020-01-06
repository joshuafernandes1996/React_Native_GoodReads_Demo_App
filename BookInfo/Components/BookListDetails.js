import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import StarRatings from './StarRatings';

export default class App extends Component {

    render() {
        const { item } = this.props;

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BookInfoPage', item)}>
                <View style={styles.container}>
                    <View style={{ width: '30%' }}>
                        <Image
                            style={{ width: 70, height: 100 }}
                            source={{ uri: item.bookInfo.img }}
                            resizeMode={'cover'}
                        />
                    </View>
                    <View style={{ width: '70%' }}>
                        <Text style={{ color: '#fff' }}>{item.bookInfo.title}</Text>
                        <Text style={{ color: 'gray' }}>by {item.bookInfo.author}</Text>
                        <Text style={{ color: 'red' }}>{item.avgRating}</Text>
                        <StarRatings selectedStars={item.avgRating} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 20,
        backgroundColor: '#444',
        borderRadius: 4,
        marginBottom: 8
    },
});