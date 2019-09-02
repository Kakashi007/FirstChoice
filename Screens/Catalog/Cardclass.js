import React, { Component } from "react";
import { Dimensions, StyleSheet , Text,View , Image,FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import {Container, Header, Content, Card, CardItem, Thumbnail, Button ,Icon, Left, Body, Right ,Title,Footer, FooterTab} from 'native-base';

export default class Cardclass extends  React.Component {
  constructor(props) {

    super(props)
    this.state = ({
      ImageUrl : '',
      descriptionUrl: '',

    })
    this.showItem = this.showItem.bind(this);
    // console.log("This was called");
    // // console.log(this.props);
    //
    // if(this.props.ImageUrl) {
    //   console.log("present");
    // }
    // else {
    //   console.log("abesnt");
    // }
  }

  async componentWillMount(){
    // console.log(this.props);
    if(this.props.ImageUrl.includes('\"')) {
      this.setState({
        ImageUrl:this.props.ImageUrl.split('\"').join(''),
        descriptionUrl: this.props.descriptionUrl.split('\"').join('')
      });
    }
    else {
      this.setState({
        ImageUrl:this.props.ImageUrl,
        descriptionUrl: this.props.descriptionUrl
      });
    }


  }

  showItem = () => {
    this.props.navigation.navigate('itemOnView', {
      navigation: this.props.navigation,
      id: this.props.id,
      title: this.props.title,
      category: this.props.category,
      rate: this.props.rate,
      descriptionUrl: this.state.descriptionUrl,
      ImageUrl: this.state.ImageUrl
    })
    console.log(this.props.id)
  }

 render() {
   // const {navigation} = this.props.navigation
   var capitalisedTitle = this.props.title.split(' ').map(
     word => word.charAt(0).toUpperCase() + word.substring(1)
   ).join(' ');
   console.log("changedTitle" + capitalisedTitle);
   return(
     <View style={{height:this.props.height}}>
       <View style = {[styles.item,{height:this.props.height}]}>
         <TouchableOpacity onPress={() => this.showItem()} key = {this.props.id} >
           <Content>
             <Card style ={{height: 300 }} >
             <CardItem header>
               <Text style={styles.text}>{capitalisedTitle}</Text>
             </CardItem>
               <CardItem cardBody>
                 <Image source={{uri: this.state.ImageUrl}} style={styles.cardImages}/>
               </CardItem>
               <CardItem>
                <Left>
                  <Text>&#8377; {this.props.rate}</Text>
                </Left>
               </CardItem>
               <CardItem footer>
                <Button light iconLeft onPress = {() => alert("pressed")} >
                 <Icon name='cart' />
                 <Text style={styles.text}>Add To cart</Text>
                </Button>
              </CardItem>
             </Card>
           </Content>
         </TouchableOpacity>
       </View>
     </View>
   );
 }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
     backgroundColor:'#01519b',
     borderRadius:10,
     borderWidth: 5,
     borderColor: '#376fdf',
     alignItems: 'center',
     justifyContent: 'center',
     // flex: 1,
     margin: 5,
     height: 300,
  },
  cardImages: {
    // flex: 1,
    width: 150,
    height: 100,
    resizeMode: 'contain'
  },
  text: {
      color: '#096386',
      fontSize:15,
      textAlign:'left',
      paddingRight:8
   },
});

// // console.log(this.props);
// console.log(this.props);
// if(this.props.ImageUrl) {
//   console.log("undefined");
//   // console.log(this.props.height);
//   if(this.props.ImageUrl.includes('\"')) {
//     console.log("includes")
//   }
//   this.setState({
//     ImageUrl:this.props.ImageUrl,
//     descriptionUrl: this.props.descriptionUrl
//   });
//   // console.log("undefined");
// }
// else {
//   console.log("in here");
//   console.log(this.props.navigation.state.params.ImageUrl);
//   // console.log("defined");
//   // console.log(this.props);
//   // console.log(this.props.height);
//   // console.log(this.props.navigation.state.params.height);
//   this.setState({
//     ImageUrl:this.props.navigation.state.params.ImageUrl,
//     descriptionUrl: this.props.navigation.state.params.descriptionUrl
//   });
//   // console.log(this.state.ImageUrl)
