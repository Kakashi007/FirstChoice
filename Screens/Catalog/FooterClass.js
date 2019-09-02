import React, { Component } from "react";
import { Dimensions, StyleSheet , Text,View , Image,FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import {Container, Header, Content, Card, CardItem, Thumbnail, Button ,Icon, Left, Body, Right ,Title,Footer, FooterTab} from 'native-base';
import CategoryScreen from './CategoryScreen'


export default  class FooterClass extends React.Component {
  constructor(props) {
    super(props);
    console.log("props in footer")
    console.log(this.props);
  }
  render() {
    return (
      <View >
      <Footer>
      <FooterTab>
        <Button vertical active  onPress={() => this.props.navigation.navigate('categoryPage',{
          category : "Food"
        })}>
          <Icon name="pizza" />
          <Text style={{color:'white'}}>Food</Text>
        </Button>

        <Button vertical active  onPress={() =>this.props.navigation.navigate('categoryPage',{
          category : "Hygiene"
        })}>
          <Icon name="star" />
          <Text style={{color:'white'}}>Hygiene</Text>
        </Button>

        <Button vertical active onPress={() =>this.props.navigation.navigate('categoryPage',{
          category : "Cosmetics"
        })}>
          <Icon active name="rose" />
          <Text style={{color:'white'}}>Cosmetics</Text>
        </Button>

        <Button vertical active onPress={() =>this.props.navigation.navigate('categoryPage',{
          category : "Drinks"
        })}>
          <Icon active name="wine" />
          <Text style={{color:'white'}}>Drinks</Text>
        </Button>
      </FooterTab>
    </Footer>
      </View>
    );
  }
}
