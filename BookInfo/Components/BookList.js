import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import BookListDetails from './BookListDetails';

export default class App extends Component {

    render() {
        const { list, navigation, onEndReached } = this.props;

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={list}
                        renderItem={({ item }) =>
                            <BookListDetails item={item} navigation={navigation} />
                        }
                        keyExtractor={(item,i) => i.toString()}
                        onEndReached={({ distanceFromEnd }) => {
                            onEndReached();
                         }}
                        onEndReachedThreshold={0.5}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 10,
    },
});