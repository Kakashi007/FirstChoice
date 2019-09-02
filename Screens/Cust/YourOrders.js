import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, Image} from 'react-native';
import {Container, Header, Content, Left, Right, Icon, Item, Input, Card, CardItem } from 'native-base';
import Swiper from 'react-native-swiper'

import OrderCardItem from './OrderCardItem'

class YourOrders extends React.Component
{
	render() {
	return(
		<Container>
			<Header style={[{ backgroundColor: '#ca3b37', height: 90, borderBottomColor: '#757575' }, styles.androidHeader]}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Icon name="md-menu" style={{ color: 'white', marginRight: 15 }} onPress={() => this.props.navigation.openDrawer('DrawerOpen')} />
                    </Left>
                    <Right>
                        <Icon name="md-cart" style={{ color: 'white' }} />
                    </Right>
                </Header>

            <Content style={{ backgroundColor: 'white', marginTop: 10 }}>

                    <Card style={{ marginLeft: 5, marginRight: 5 }}>
                        <CardItem header style={{ borderBottomWidth: 2, borderBottomColor: '#dee0e2', alignItems:'center', justifyContent:'center' }}>
                            <Text style={{alignItems:'center', justifyContent:'center', fontWeight:'bold', fontSize: 20}}>Your Previous Orders</Text>
                        </CardItem>

                        <CardItem style={{ marginTop: 2, borderBottomWidth: 1, borderBottomColor: '#dee0e2'}} >
                        <OrderCardItem
                            itemName="LAYS"
                            itemQty="2"
                            imageUri={require("../assets/lays.jpg")}
                            

                        />
                        </CardItem>
                        <CardItem style={{ marginTop: 2, borderBottomWidth: 1, borderBottomColor: '#dee0e2'}}>
                        <OrderCardItem
                            itemName="HIDE AND SEEK"
                            itemQty="5"
                            imageUri={require("../assets/biscuit.jpg")}

                        />
                        </CardItem>
                    </Card>
			</Content>
		</Container>	
		);
	}
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    androidHeader: {
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight,
            }
        })
    }
});


export default YourOrders;







/*

import { withAuthenticator } from 'aws-amplify-react-native';
import { Auth, I18n, Logger } from 'aws-amplify';
import { Authenticator } from  'aws-amplify-react-native';
import React, { Component } from 'react';
//import OrderReceipt from './OrderReceipt'
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import{createBottomTabNavigator,createAppContainer,createDrawerNavigator,createStackNavigator} from 'react-navigation';
import {
  StyleSheet,
Platform,StatusBar,
  View,
  Image,
  FlatList,
  Alert,ListView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Container, Header, Title, Button,Badge,Content, Footer,Tab, Tabs, TabHeading,List, ListItem, FooterTab, Card,CardItem,Thumbnail,Drawer, Left, Right, Body, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

const GetOrder = `query listOrders {
  listOrders(filter:{
    orderStatus:{
      eq:"Picked"
    }
    and:{
      driverId:{
        eq:"12"

      }
    }
  })
  {
    items{
      id
      customerId
      driverId
      itemsOrdered{
        itemId
        qty
      }
      orderStatus
      modeOfPayement
      }
    
  }
}`


export default class YourOrders extends Component {
constructor(props) {
    super(props);
   
    this.state = {
      number:0,
      orders:[],
      queryResponse:[],
      loading: true,
      driverId:''
       
    };
    this.listOrder = this.listOrder.bind(this);
  }
listOrder = async () => {
   console.log('listing orders ');
   //console.log("item: " + itemId);
  const toGetId ={
    driverId: "2df52d9e-7193-432b-a826-de9692bb63ff"
  };
   try{
     const order = await API.graphql(graphqlOperation(GetOrder));
     
     this.setState({queryResponse: order });
     this.setState({orders:order.data.listOrders.items})
     console.log("No of order: " + order)
     console.log(this.state.queryResponse);
   } catch(err) {
     console.log(err);
    }
 }
 async componentDidMount(){
  const user=await Auth.currentAuthenticatedUser()
      //console.log("USER: " + JSON.stringify(user))
      //console.log("username: " + user.username)
      this.setState({ driverId: user.attributes.sub });
  console.log("entering component did mount")
   await this.listOrder();
 }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }



  clickEventListener(item) {
    Alert.Alert(item.title)
  }
createList (renderNavigation) {

  

    return this.state.orders.map((data) => {
      return (
        
        <ListItem  key={data.id} button onPress={() => renderNavigation.navigate('OrderReceipt',{
          orderId:data.id,
          otherParams:"hello from order list"
        })} >
              <Left>
               <Icon name="person"  />
              </Left>
              <Body>
                <Text>{data.customerId}</Text>
                <Text note>Driver id: {data.driverId}</Text>
                 
              </Body>
              <Right>
                <Text note>{data.modeOfPayement}</Text>
                 
          <Text>
          {data.orderStatus}
          </Text>
          
              </Right>
            </ListItem>
          
            
            
      )
    })


};
  render() {
    
     if (this.state.loading) {
      return <Expo.AppLoading />;
    }


  
    return (
      <Container>
       <Header style={[{  height: 90, borderBottomColor: '#757575' }, styles.androidHeader]}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Icon name="arrow-back" style={{ color: 'white', marginRight: 15 }} onPress={() => this.props.navigation.goBack()} />
                    </Left>

                     <Title style={{marginTop:18,marginRight:20}}> DELIVERED ORDERS </Title>
                    <Right>
                    
              
              
             
              
           
            
            </Right>
                </Header>


       
        <Content>
        
         {this.createList(this.props.navigation)}
         

        </Content>

        <Footer>
          <FooterTab>
            <Button active badge vertical onPress={() => { this.props.navigation.navigate('Delivered') }} >
              <Badge><Text>2</Text></Badge>
              <Icon type="FontAwesome" name="check" />
              <Text>Delivered</Text>
            </Button>
            <Button vertical onPress={() => { this.props.navigation.navigate('Pending') }}>
              <Icon name="navigate" />
              <Text>Picked up</Text>
            </Button>
            <Button  badge vertical onPress={() => { this.props.navigation.navigate('Cancelled') }}>
              <Badge ><Text>51</Text></Badge>
              <Icon type="FontAwesome" name="close" />
              <Text>Cancelled</Text>
            </Button>
            
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    androidHeader: {
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight,
            }
        })
    }
});
*/