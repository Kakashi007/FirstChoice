import React, { Component } from "react";
import { Dimensions, StyleSheet , Text,View , Image,FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import {Container, Header, Content, Card, CardItem, Thumbnail, Button ,Icon, Left, Body, Right ,Title,Footer, FooterTab} from 'native-base';
import Cardclass from './Cardclass'
// import HeaderClass from './HeaderClass'
import HeaderClass from '../Catalog/HeaderClass'
import FooterClass from './FooterClass'
import {getOnCategoryQuery} from '../../src/graphql/queries'



export default  class ItemOnView extends React.Component {
  constructor(props) {
    // console.log("In imageview");

    super(props);
    // console.log("my props" );
    // console.log(this.props);
    this.state = {
      queryResponse: [],
      loading: true,
      cardList: [],
      id: '',
      title: '',
      ImageUrl: '',
      rate: 0,
      category: '',
      descriptionUrl:'',
      height: 400,
      itemData : ''
    };
    this.getItems = this.getItems.bind(this);
    this.createCard = this.createCard.bind(this);
    this.setParameters = this.setParameters.bind(this);
  }

  getItems = async() =>{
    console.log("getting items");
    console.log(this.state.category);
    const categoryItemsToGet = this.state.category.split('"').join('');
    try {
      const itemList = await API.graphql(graphqlOperation(getOnCategoryQuery , {category : categoryItemsToGet}));
      this.setState({queryResponse:itemList.data.getOnCategory.items})
      console.log(this.state.queryResponse);
    } catch(err) {
      console.log(err);
    }
  }
// {'category' , this.state.category}
  async setParameters() {
    const height = 280;
    const { navigation } = this.props;

    this.setState({
      id:JSON.stringify(navigation.getParam('id', 'NO-ID')),
      title:JSON.stringify(navigation.getParam('title', 'NO-ID')),
      ImageUrl:JSON.stringify(navigation.getParam('ImageUrl', 'NO-ImageUrl')),
      category:JSON.stringify(navigation.getParam('category', 'NO-category')),
      descriptionUrl:JSON.stringify(navigation.getParam('descriptionUrl', 'NO-descriptionUrl')),
      rate:navigation.getParam('rate', 0),
      height:height
    });

  }
  async componentWillMount() {
    // console.log(this.props);

    // console.log(this.props);
    // const { navigation } = this.props;
    // this.state.descriptionUrl
    await this.setParameters();
    // console.log("descrpition url");
    // console.log(this.state.descriptionUrl);
    // console.log("hardcoded url" + "https://pastebin.com/raw/p8r9NMiM");
    const urlToGet = this.state.descriptionUrl.split('"').join('');
    fetch(urlToGet)
    .then(response =>
      this.setState({
      itemData: response._bodyText
    }));
    await this.getItems();
    // await this.getItems();
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });

  }

  createCard = ({item},height) => (
    <Cardclass
      height = {height}
      navigation= {this.props.navigation}
      id = {item.id}
      title = {item.title}
      ImageUrl = {item.ImageUrl}
      rate = {item.rate}
      category = {item.category}
      descriptionUrl = {item.descriptionUrl}
    />
  );

  render() {
    // const navigation  = this.props.navigation;
    // this.setState({navigation:this.props.navigation})
    const height = 300;

    // const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
      <Container>
      <HeaderClass navigation = {this.props.navigation}/>
      <ScrollView>
      <Text style = {styles.heading}>Item</Text>
        <Cardclass
          height = {this.state.height}
          navigation= {this.props.navigation}
          id = {this.state.id}
          title = {this.state.title.split('"').join('')}
          ImageUrl = {this.state.ImageUrl}
          rate = {this.state.rate}
          category = {this.state.category}
          descriptionUrl = {this.state.descriptionUrl}
        />
        <Text style = {styles.descrpition}> {this.state.itemData} </Text>
        <FlatList
          data = { this.state.queryResponse }
          numColumns = {2}
          renderItem = { ( item ) =>
            this.createCard(item,height)
          }
          keyExtractor={item => item.id}
          style={styles.container}
          horizontal={false}
          scrollEnabled = {false}
          contentContainerStyle={{ justifyContent: 'center',flexGrow: 1,alignItems : 'center'}}
        />
      </ScrollView>
      <FooterClass navigation = {this.props.navigation}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    marginVertical: 20,

  },

  heading: {
    fontSize: 20,
    color: 'black',
    textAlign:'center',
    marginVertical: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },

  descrpition: {
    fontSize: 15,
    color : '#05004e',
    textAlign: 'center',
    marginVertical:20
  }

  // item: {
  //   backgroundColor:'#68a0cf',
  //    borderRadius:10,
  //    borderWidth: 1,
  //    borderColor: '#fff',
  //    alignItems: 'center',
  //    justifyContent: 'center',
  //    flex: 1,
  //    margin: 5,
  //    // height: Dimensions.get('window').width / 2 + 50,
  // },
  // cardImages: {
  //   // flex: 1,
  //   width: 150,
  //   height: 100,
  //   resizeMode: 'contain'
  // },
  // text: {
  //     color: '#41cdf4',
  //     fontSize:25,
  //     textAlign:'center'
  //  },
});





// <Text>ItemOnView!</Text>
// <Text>id: {this.state.id}</Text>
// <Text>rate: {this.state.rate}</Text>
// <Text>descriptionUrl: {this.state.descriptionUrl}</Text>
// <Button vertical onPress={() => navigation.navigate('cart')}>
//   <Icon name="Cart" />
//   <Text>Cart</Text>
// </Button>
