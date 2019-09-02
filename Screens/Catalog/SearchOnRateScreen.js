import React, { Component } from "react";
import { Dimensions, StyleSheet , Text,View , Image,FlatList, TouchableOpacity, ScrollView,TextInput } from 'react-native';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import {Container, Header, Content, Card, CardItem, Thumbnail, Button ,Icon, Left, Body, Right ,Title,Footer, FooterTab} from 'native-base';
import FooterClass from './FooterClass'
import Cardclass from './Cardclass'
import {filterOnRateQuery} from '../../src/graphql/queries'




export default  class SearchOnRateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResponse: []
    }
    this.createCard = this.createCard.bind(this);
    this.searchForItem = this.searchForItem.bind(this);
  }

  async searchForItem(rateFilter){
    console.log("begin search");
    // console.log(this.state.searchValue);
    // const queryParameter = {title : {contains : "ample"}};
    console.log(rateFilter)
    try {
      const item = await API.graphql(graphqlOperation(filterOnRateQuery, {toFilterOn : rateFilter}));
      this.setState({queryResponse: item.data.listItems.items})
      console.log(item);
    } catch(err) {
      console.log(err);
    }
  }

  createCard = ({item},height) => (
    <Cardclass
      height = {height}
      navigation={ this.props.navigation }
      id = {item.id}
      title = {item.title}
      ImageUrl = {item.ImageUrl}
      rate = {item.rate}
      category = {item.category}
      descriptionUrl = {item.descriptionUrl}
    />
  );

  render() {
    const height = 320;
    return (
      <Container >
        <View style ={{flex:1}}>
          <Text style = {{fontSize : 20 , textAlign: 'center' ,fontWeight: 'bold', marginBottom : 20, marginTop: 10, color: '#0c084c'  }}> Filter items by rate </Text>
          <View style ={{flexDirection : 'row' , justifyContent : 'space-around'}}>
            <Button vertical onPress={ () => this.searchForItem([20,40])}>
              <Text style={{color:'white', padding : 5}}> &#8377; 20 - &#8377; 40</Text>
            </Button>
            <Button vertical onPress={ () => this.searchForItem([40,80])}>
              <Text style={{color:'white', padding : 5}}> &#8377; 40 - &#8377; 80</Text>
            </Button>
            <Button vertical onPress={ () => this.searchForItem([80,100])}>
              <Text style={{color:'white', padding : 5}}> &#8377; 80 - &#8377; 100</Text>
            </Button>
          </View>
          <View style= {{marginVertical : 30}}>
            <FlatList
              data = {this.state.queryResponse}
              numColumns = {2}
              renderItem = { (item) =>
                this.createCard(item, height)
              }
              keyExtractor = {item => item.id}
              horizontal = {false}
            />
          </View>
        </View>
        <FooterClass navigation = {this.props.navigation}/>
      </Container>
    );
  }
}
