import React, { Component } from "react";
import { Dimensions, StyleSheet , Text,View , Image,FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import {Container, Header, Content, Card, CardItem, Thumbnail, Button ,Icon, Left, Body, Right ,Title,Footer, FooterTab} from 'native-base';
import Cardclass from './Cardclass'

import FooterClass from './FooterClass'
import {getOnCategoryQuery} from '../../src/graphql/queries'

export default class CategoryScreen extends React.Component {

  constructor (props) {
    super(props)
    console.log(this.props.category);
    this.state = {
      queryResponse: [],
      loading: true,
      cardList: [],
      queryValue: ''
    };
    this.getItems = this.getItems.bind(this);
    this.createCard = this.createCard.bind(this);
    // this.setState({queryValue: this.props.category})
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


 getItems = async () => {
   console.log('listing iItems');
   const categoryType = this.props.navigation.getParam('category', 'Hygiene');
   console.log(categoryType)
   try{
     const itemList = await API.graphql(graphqlOperation(getOnCategoryQuery , {category : categoryType}));
     // console.log(JSON.stringify(itemList));
     console.log(itemList);
     this.setState({queryResponse: itemList.data.getOnCategory.items });
     // console.log(this.state.queryResponse);
   } catch(err) {
     console.log(err);
    }
 }

  async componentWillMount(){
    await this.getItems();
    // await this.getItems();
    // console.log("after call");
    // console.log(this.state.queryResponse);
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });

  }

  render() {
    const { navigation } = this.props.navigation;
    const height = 280;
  if (this.state.loading) {
    return (
      <Expo.AppLoading />
    );
  }
    return (

      <>
          <Container>
              <FlatList
                data = { this.state.queryResponse }
                numColumns = {2}
                renderItem = { ( item ) =>
                  this.createCard(item,height)
                }
                keyExtractor={item => item.id}
                style={styles.container}
                // contentContainerStyle={styles.cards}
                horizontal={false}
              />
              <FooterClass navigation = {this.props.navigation}/>
          </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },

  item: {
    backgroundColor:'#68a0cf',
     borderRadius:10,
     borderWidth: 1,
     borderColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
     flex: 1,
     margin: 5,
     height: Dimensions.get('window').width / 2 + 50,
  },
  cardImages: {
    // flex: 1,
    width: 150,
    height: 100,
    resizeMode: 'contain'
  },
  text: {
      color: '#41cdf4',
      fontSize:15,
      textAlign:'center'
   },
});
