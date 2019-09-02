import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Card, CardItem, Right } from 'native-base'

class OrderCardItem extends Component {
    render() {
        return (
            <CardItem>

                <View>
                    <Image style={{ height: 90, width: 60 }}
                        source={this.props.imageUri} />
                </View>
                <Right style={{ flex: 1, alignItems: 'flex-start', height: 90, paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold'}}>{this.props.itemName}</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Qauntity: {this.props.itemQty}</Text>
                </Right>
            </CardItem>
        );
    }
}
export default OrderCardItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});