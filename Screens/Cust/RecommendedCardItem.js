import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Card, CardItem, Right } from 'native-base'
import StarRating from 'react-native-star-rating'
class RecommendedCardItem extends Component {
    render() {
        return (
            <CardItem>

                <View>
                    <Image style={{ height: 90, width: 60 }}
                        source={this.props.imageUri} />
                </View>
                <Right style={{ flex: 1, alignItems: 'flex-start', height: 90, paddingHorizontal: 20 }}>
                    <Text style={{ fontWeight: 'bold'}}>{this.props.itemName}</Text>
                    <Text style={{ color: 'grey', fontSize: 15 }}>{this.props.itemCreator}</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>{this.props.itemPrice}</Text>

                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.props.rating}
                        starSize={12}
                        fullStarColor='blue'
                        emptyStarColor='blue' />
                </Right>
            </CardItem>
        );
    }
}
export default RecommendedCardItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});