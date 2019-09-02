
import { withAuthenticator } from 'aws-amplify-react-native';
import { Auth, I18n, Logger } from 'aws-amplify';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import { Authenticator } from  'aws-amplify-react-native';
import React, { Component } from 'react';
import DAprofile from './DAprofile'
  import Cart from './Cart'
  import Fav from './Fav'
  import OrderList from './OrderList'

import{createBottomTabNavigator,createAppContainer,createDrawerNavigator,createStackNavigator} from 'react-navigation';
//import {Header} from "react-native-elements";
import {
  StyleSheet,
 Platform, StatusBar,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Container, Header, Title, Content,Footer,Tab, Tabs, TabHeading,List, ListItem, FooterTab,Badge, Button,Card,CardItem,Thumbnail,Drawer, Left, Right, Body, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

const GetOrder = `query listOrders($driverId:String) {
  listOrders(filter:{


      driverId:{
        eq:$driverId


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
      pickedUpStatus
      pickedUpDate
      pickedUpTime
      orderCode

      }

  }
}`


export default class UserProfileView extends Component {
constructor(props) {
    super(props);
    this.state = {
      UserId:[],
      UserName:'',
      name:'',
      pincode:'',
      email:'',
      phone:'',
      orders:[],
      loading: true
    };
    this.listOrder=this.listOrder.bind(this);
    this.createList=this.createList.bind(this);
  }

async componentDidMount () {
    //window.LOG_LEVEL = 'DEBUG'
    console.log("About to mount")

    const user=await Auth.currentAuthenticatedUser()

      this.setState({ UserName: user.username });
      this.setState({UserID:user.attributes.sub});
      this.setState({name:user.attributes.name});
      this.setState({pincode:user.attributes.address});
      this.setState({email:user.attributes.email});
      this.setState({phone:user.attributes.phone_number});


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

listOrder = async () => {
   console.log('listing orders ');
   const toGetId ={
    driverId: this.state.UserID
  };
   try{

     const order = await API.graphql(graphqlOperation(GetOrder,toGetId));
     console.log("order : " +order)
    // this.setState({queryResponse: order });
     this.setState({orders:order.data.listOrders.items})

   } catch(err) {
     console.log(err);
    }
 }

  clickEventListener(item) {
    Alert.Alert(item.title)
  }

  createList (renderNavigation) {



    return this.state.orders.map((data) => {
      return (








    <Row key ={data.id}>


           <ListItem  style={{width:350,height:120}}button onPress={() => renderNavigation.navigate('OrderReceipt',{
          orderId:data.id,
          otherParams:"hello from order list"
        })}>
           <Card style={{width:350,height:120}}>
            <CardItem header bordered>
              <Text style={{alignItems:'center'}}>{data.customerId}</Text>
            </CardItem>
            <CardItem >
             <Thumbnail square size={80} source={require('../assets/user.png')} />
                            <Text>{data.customerId}</Text>

                            <Right><Text style={ {
      fontSize: 15,
      color: 'green',
      fontWeight: "bold",
      marginRight:5
    }}>{data.modeOfPayement}</Text>

    </Right>
            </CardItem>


          </Card>
          </ListItem>
    </Row>









      )
    })


};

  render() {
     if (this.state.loading) {
      return <Expo.AppLoading />;
    }

const state = this.state;
    return (
      <Container>


      <Header style={[{  height: 90, borderBottomColor: '#757575' }, styles.androidHeader]}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Icon name="md-menu" style={{ color: 'white', marginRight: 15 }} onPress={() => this.props.navigation.openDrawer()} />
                    </Left>

                     <Title style={{marginTop:18,marginRight:20}}> DASHBOARD </Title>
                    <Right>



              <Icon style={{marginLeft: 15,marginTop:12,color:'white'}} type="FontAwesome" name="bell" />



            </Right>
                </Header>









        <Content>




 <View>
          <Text style={styles.name}>Deliveries to be done</Text>

  </View>





      <Grid>
<Col>
<List>
      {this.createList(this.props.navigation)}
      </List>
      </Col>
</Grid>











        </Content>
        <Footer >
          <FooterTab >
            <Button full>
              <Text style={{color:'white'}}>ACMS PROJECT</Text>
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
     name:{
    fontSize:25,
    color: "#696969",
    fontWeight: "600",
    marginTop:30
  },
    androidHeader: {
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight,
            }
        })
    },

});
