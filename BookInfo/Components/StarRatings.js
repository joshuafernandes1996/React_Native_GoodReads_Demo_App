import React, { Component } from "react";
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class StarRating extends Component {
    state = {
        totalStars: 5
    };

    firstMethod = (selectedStars) => {
        const { totalStars } = this.state;

        return [...Array(totalStars)].map((el, i) =>
            i < selectedStars ? (
                <Icon key={i} name="star" size={20} color="#fa604a" />
            ) : (
                    <Icon key={i} name="star-o" size={20} color="#fa604a" />
                )
        );
    };

    secondMethod = (selectedStars) => {
        // implement the code for full, empty and half stars here.
        const { totalStars } = this.state;
        return [...Array(totalStars)].map((el, i) =>
            // check if current star should be half
            i < selectedStars && i + 1 > selectedStars ? (
                <Icon key={i} name="star-half-o" size={20} color="#fa604a" />
            ) : // check if current star should be full
                i < selectedStars ? (
                    <Icon key={i} name="star" size={20} color="#fa604a" />

                ) : (
                        // else, current star should be empty
                        <Icon key={i} name="star-o" size={20} color="#fa604a" />

                    )
        );
    };

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                {Number.isInteger(this.props.selectedStars)
                    ? this.firstMethod(this.props.selectedStars)
                    : this.secondMethod(this.props.selectedStars)}
            </View>
        );
    }
}

export default StarRating;
