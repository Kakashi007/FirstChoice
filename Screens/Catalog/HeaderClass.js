import React, { Component } from "react";
import { Dimensions, StyleSheet , Text,View , Image,FlatList, Platform,StatusBar,TouchableOpacity, ScrollView } from 'react-native';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import {Container, Header, Content, Card, Input,CardItem,Item, Thumbnail, Button ,Icon, Left, Body, Right ,Title,Footer, FooterTab} from 'native-base';
// import Cart from './headerScreens/Cart'

export default  class HeaderClass extends React.Component {
  render() {
    return (
      <View >
        <Header style={{ height: 190, borderBottomColor: '#757575' }}>
          <Left style={{ flexDirection: 'row' }}>
              <Icon name="md-menu" style={{ color: 'white', marginRight: 15 }} onPress={() => this.props.navigation.openDrawer('DrawerOpen')} />
          </Left>
          <Right>
              <Icon name="md-cart" style={{ color: 'white' }} />
          </Right>
          <View style={{ marginTop : 20,position: 'absolute', left: 0, right: 0, top: 90, height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
            <TouchableOpacity>
              <View style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>Hello, Customer</Text>
              </View>
            </TouchableOpacity>
              <View style={{ flexDirection: 'row',flex: 1, height: "100%", marginLeft: 5, justifyContent: 'center' }}>
                <Button style={{color:'white', marginRight:20, marginLeft: 20}} vertical active onPress={() =>this.props.navigation.navigate('searchPage')}>
                  <Icon active name="search" />
                  <Text style={{color:'white'}}>Search</Text>
                </Button>
                <Button style={{color:'white', marginRight:20}} vertical active onPress={() =>this.props.navigation.navigate('searchOnRatePage')}>
                  <Icon active name="ios-color-filter" />
                  <Text style={{color:'white'}}>Search on rate</Text>
                </Button>
              </View>
          </View>
        </Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  androidHeader: {
      ...Platform.select({
          android: {
              paddingTop: StatusBar.currentHeight,
          }
      })
  }
});
// this.props.navigation.navigate('cart')
