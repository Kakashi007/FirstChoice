import React, { Component } from "react";
import { Dimensions, StyleSheet , Text,View , Image,FlatList, TouchableOpacity, ScrollView,TextInput } from 'react-native';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import {Container, Header, Content, Card, CardItem, Thumbnail, Button ,Icon, Left, Body, Right ,Title,Footer, FooterTab} from 'native-base';
import FooterClass from './FooterClass'
import Cardclass from './Cardclass'
import {searchOnTitleQuery} from '../../src/graphql/queries'




export default  class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputBorderColor :'#294b63',
      textInputBorderWidth : 1,
      textInputBackgroundColor :'#ebecf0',
      searchValue : '',
      queryResponse: []
    };
    this.textInputOnBlur = this.textInputOnBlur.bind(this);
    this.textInputOnFocus = this.textInputOnFocus.bind(this);
    this.searchForItem = this.searchForItem.bind(this);
    this.createCard = this.createCard.bind(this);

  }

  textInputOnFocus = () => {
    this.setState({
      textInputBorderColor : '#082d43',
      textInputBorderWidth : 2,
      textInputBackgroundColor : '#a8a8a8'
    })
  }

  textInputOnBlur = () => {
    this.setState({
      textInputBorderColor: '#294b63',
      textInputBorderWidth : 1,
      textInputBackgroundColor :'#ebecf0'
    })
  }

  async searchForItem(){
    console.log("begin search");
    console.log(this.state.searchValue);
    // const queryParameter = {title : {contains : "ample"}};
    try {
      const item = await API.graphql(graphqlOperation(searchOnTitleQuery, {toSearchFor : this.state.searchValue}));
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
          <Text style = {{fontSize : 20 , textAlign: 'center' ,fontWeight: 'bold', marginTop: 10, color: '#0c084c'  }}> Search items by name </Text>
          <View style ={{flexDirection : 'row' , justifyContent : 'space-around'}}>
            <TextInput
              onFocus = { () => this.textInputOnFocus() }
              onBlur = { () => this.textInputOnBlur() }
              style = {{
                height : 40,
                borderColor : this.state.textInputBorderColor,
                borderWidth: this.state.textInputBorderWidth,
                borderRadius : 5,
                paddingLeft : 10,
                paddingRight : 10,
                marginVertical : 20,
                marginLeft : 10,
                marginRight : 3,
                backgroundColor : this.state.textInputBackgroundColor,
                width : 250
              }}
              onChangeText = { (text) => this.setState({searchValue : text.toLowerCase()}) }
            />
            <Button style = {{height: 40 , marginVertical : 20}} vertical rounded onPress={ () => this.searchForItem()}>
              <Icon name='search' />
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
