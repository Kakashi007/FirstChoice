
import { withAuthenticator } from 'aws-amplify-react-native';
import { Auth, I18n, Logger } from 'aws-amplify';
import { Authenticator } from  'aws-amplify-react-native';
import React, { Component } from 'react';
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
import { Container, Header, Title, Badge,Content, Footer,Tab, Tabs, TabHeading,List, ListItem, FooterTab, Button,Card,CardItem,Thumbnail,Drawer, Left, Right, Body, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Feedback from './Feedback'
const GetOrder = `query getOrder($id:ID!) {
  getOrder(id:$id)
  {

      id
      customerId
      driverId
      itemsOrdered{
        itemId
        qty
      }
      orderStatus
      modeOfPayement
      pickedUpStatus
      pickedUpDate
      pickedUpTime
      orderCode


  }
}`
const GetItem =`query getItem($id:ID!){
  getItem(id:$id)
  {
    id
  name
  rate
  }
}`


export default class OrderReceipt extends Component {
constructor(props) {
    super(props);

   this.state = {
      id:'',
  customerId: '',
  driverId:  '',
  itemsOrdered: [],
  orderStatus: '',
  modeOfPayement: '',
  pickedUpStatus:'',
  pickedUpTime:'',
  pickedUpDate:'',
queryResponse:[],
itemName:'',
      loading: true
    };
    this.getOrder = this.getOrder.bind(this);
    this.getItem=this.getItem.bind(this);
  }

getOrder = async () => {
  const { navigation } = this.props;
    const itemId = navigation.getParam('orderId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

  console.log("item: " + itemId);
  const toGetId ={
    id: itemId
  };
  //console.log("item: " + itemId);
   console.log('listing order details');
   try{
     const order = await API.graphql(graphqlOperation(GetOrder,toGetId));

     this.setState({queryResponse: order });
     this.setState({customerId: order.data.getOrder.customerId });
     this.setState({driverId: order.data.getOrder.driverId });
     this.setState({orderStatus: order.data.getOrder.orderStatus });
     this.setState({modeOfPayement: order.data.getOrder.modeOfPayement });
     this.setState({pickedUpTime:order.data.getOrder.pickedUpTime});
     this.setState({pickedUpDate:order.data.getOrder.pickedUpDate});
     this.setState({pickedUpStatus:order.data.getOrder.pickedUpStatus});
     this.setState({id: order.data.getOrder.id });
     this.setState({itemsOrdered:order.data.getOrder.itemsOrdered});
     console.log("items ordered: " + this.state.itemsOrdered);
     //this.setstate({noOfItems:order.data.getOrder.itemsOrdered.length})
     console.log(this.state.queryResponse);
   } catch(err) {
     console.log(err);getOrder
    }
 }
getItem = async(itemid) =>{
  const itemId={
    id:itemid
  };
  try{
    console.log("entering item query");
    const item = await API.graphql(graphqlOperation(GetItem,itemId));
   this.setState({itemName: item.data.getItem.name });
    //itemname=item.data.getItem.name
  }
  catch(err){
    console.log(err);
  }
 }
  componentDidMount(){
  //console.log("entering component did mount")
    this.getOrder();

 }
  async componentWillMount() {
  // console.log("entering component will mount")
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

                     <Title style={{marginTop:18,marginRight:20}}> ORDER RECEIPT </Title>
                    <Right>







            </Right>
                </Header>


        <Content>

         <Card >
            <CardItem header >

              <Text> ORDER PICKED STATUS  </Text>

               <Right><Text style={ {
      fontSize: 15,
      color: 'green',
      fontWeight: "bold"
    }}>{this.state.pickedUpStatus} </Text>
<Text note> 3:45 PM </Text></Right>
            </CardItem>


          </Card>
          <Card >
            <CardItem header >

              <Text> ORDER DELIVERY STATUS  </Text>
               <Right><Text style={ {
      fontSize: 15,
      color: 'orange',
      fontWeight: "bold"
    }}>{this.state.orderStatus} </Text></Right>
            </CardItem>


          </Card>
           <Card >
            <CardItem header >

              <Text> ORDER NUMBER  </Text>
               <Right><Text style={ {
      fontSize: 15,
      color: 'green',
      fontWeight: "bold"
    }}>#{this.state.id} </Text>
</Right>
            </CardItem>
            <CardItem header >

              <Text> MODE OF PAYMENT  </Text>
               <Right><Text style={ {
      fontSize: 15,
      color: 'green',
      fontWeight: "bold"
    }}>{this.state.modeOfPayement}</Text>
</Right>
            </CardItem>
             <CardItem header >

              <Text> PICKUP DATE  </Text>
               <Right><Text note>{this.state.pickedUpDate} </Text>
</Right>
</CardItem>
<CardItem>
              <Text> PICKUP TIME  </Text>
               <Right><Text note>{this.state.pickedUpTime}</Text>
</Right>
            </CardItem>

          </Card>
          <Card >

            <CardItem header >

              <Text> MODE OF PAYMENT  </Text>
               <Right><Text style={ {
      fontSize: 15,
      color: 'green',
      fontWeight: "bold"
    }}>{this.state.modeOfPayement} </Text>
</Right>
            </CardItem>


          </Card>
           <Card>
            <CardItem header >

              <Text style={{alignItems:'center'}}> ORDER SUMMARY  </Text>

            </CardItem>
        
          </Card>
          <Card>
          <CardItem>

<Button   style={{alignItems:'center'}} onPress={() => this.props.navigation.navigate('Feedback')}><Text> MARK AS DELIVERED </Text></Button>
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
