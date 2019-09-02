import React from 'react';
import { StyleSheet,  View, TextInput, Image ,SafeAreaView,ScrollView,Dimensions} from 'react-native';
import Amplify, { Auth,API } from 'aws-amplify';
import awsConfig from './aws-exports';
import{createBottomTabNavigator,createAppContainer,createDrawerNavigator,createStackNavigator,DrawerItems} from 'react-navigation'
import Home from './Screens/DA/Home'
import DAprofile from './Screens/DA/DAprofile'
import { Authenticator, SignIn } from 'aws-amplify-react-native';
import PendingOrder from './Screens/DA/PendingOrder';
import Cancelled from './Screens/DA/Cancelled';
import Feedback from './Screens/DA/Feedback'
import OrderList from './Screens/DA/OrderList'
import OrderReceipt from './Screens/DA/OrderReceipt'
import Settings from './Screens/DA/Settings'
import TrialScreen from './Screens/DA/TrialScreen'

import HomeScreen from './Screens/Cust/HomeScreen'
// import Settings from './screens/Cust/Settings'     {to be decided later}
import YourOrders from './Screens/Cust/YourOrders'
import Profile from './Screens/Cust/Profile'
import LogOut from './Screens/Cust/LogOut'

import HeaderClass from './Screens/Catalog/HeaderClass'
import FooterClass from './Screens/Catalog/FooterClass'
import CategoryScreen from './Screens/Catalog/CategoryScreen'
import Cardclass from './Screens/Catalog/Cardclass'
import ItemOnView from './Screens/Catalog/ItemOnView'
import SearchScreen from './Screens/Catalog/SearchScreen'
import SearchOnRateScreen from './Screens/Catalog/SearchOnRateScreen'

import { Container, Header, Title, Content, Footer,Tab, Tabs, TabHeading,List, ListItem, FooterTab, Button,Card,CardItem,Thumbnail,Drawer, Left, Right, Body, Icon, Text } from 'native-base';
import {  withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsConfig);
class CustomDrawerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      UserName:'',
      name:'',
      loading: true
    };
  }

  async componentDidMount () {
    console.log("In APP.js")
    Auth.currentSession().then(function(session) {
      var string_session = JSON.stringify(session)
    }, function(err) {
      console.log(err)
    })
    const user=await Auth.currentAuthenticatedUser()
    this.setState({ UserName: user.username });
    this.setState({name:user.attributes.name});
  }
  render() {
    return (
      <Container>
        <Header style={styles.drawerHeader}>
          <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="person" style={{ color: 'white', marginTop:20 }} />
            <Text style={{ marginLeft: 5, fontSize: 22, color: 'white', fontStyle: 'italic', marginTop:20 }}>Hello, {this.state.name}</Text>
          </Left>
        </Header>
        <Content>
          <DrawerItems {...this.props} />
        </Content>
      </Container>
    );
  }
}

const CustomDrawerContentComponent = (props) => (

  <Container>
    <Header style={styles.drawerHeader}>
      <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="person" style={{ color: 'white', marginTop:20 }} />
          <Text style={{ marginLeft: 5, fontSize: 22, color: 'white', fontStyle: 'italic', marginTop:20 }}>Hello, Customer</Text>
        </Left>
      </Header>

    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);

class SignOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.logout = this.logout.bind(this);
  }
   logout = async () => {
    try {
      await Auth.signOut()
     this.props.navigate('SignIn')
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }


  async componentDidMount () {
    console.log("Signing out")
    await this.logout();
  }

  render() {
    return (
      <View>
      <Text>
      Hello
      </Text>
      </View>
    );
  }

}

const MyDrawer= createDrawerNavigator({
  Home:{
    screen: Home,
    navigationOptions: {
      drawerIcon: <Icon type="FontAwesome" name="home" />
    }
  },
  OrderList:{
    screen: OrderList,
    navigationOptions: {
        drawerIcon: <Icon  name="paper" />
    }
  },
  Profile:{
    screen : DAprofile,
    navigationOptions: {
        drawerIcon: <Icon type="FontAwesome" name="user-o" />
    }
  },
  Settings:{
    screen : Settings,
    navigationOptions: {
        drawerIcon: <Icon  name="settings" />
    }
  },
  SignOut:{
    screen : SignOut,
    navigationOptions: {
        drawerIcon: <Icon type="FontAwesome"  name="sign-out" />
    }
  }

},{contentComponent: CustomDrawerComponent});

const CustomerDrawer = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home Page',
      drawerIcon: <Icon type="FontAwesome" name="home" size={8} />
    },
  },

  YourOrders: {
    screen: YourOrders,
    navigationOptions: {
      drawerLabel: 'Your Orders',
      drawerIcon: <Icon type="AntDesign" name="carryout" size={8} />
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: 'Your Profile',
      drawerIcon: <Icon type="FontAwesome" name="user-circle" size={8} />
    },
  },

//===============To be decided later =========================
  // Settings: {
  //   screen: Settings,
  //   navigationOptions: {
  //     drawerLabel: 'Settings',
  //     drawerIcon: <Icon type="FontAwesome" name="cog" size={8} />
  //   },
  // },
//==================================================================

  LogOut: {
    screen: LogOut,
    navigationOptions: {
      drawerLabel: 'Log Out',
      drawerIcon: <Icon type="MaterialCommunityIcons" name="logout"  size={8}/>
    },
  }
  }, {
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'

},{contentComponent: CustomDrawerComponent});

const signUpConfig = {
      header: 'SIGNUP',
      defaultCountryCode: '91',
      hideDefaults: true,
      signUpFields: [
        {
          label: 'Username',
          key: 'username',
          required: true,
          displayOrder: 1,
          type: 'string',
          placeholder:"Enter Username"
        },

        {
          label: 'Password',
          key: 'password',
          required: true,
          displayOrder: 2,
          type: 'password',
          placeholder:"Enter Password"
        },


        {
          label: 'Email',
          key: 'email',
          required: true,
          displayOrder: 3,
          type: 'email',
          placeholder:"Enter Email"
        },
        {
          label: 'Name',
          key: 'name',
          required: true,
          displayOrder: 4,
          type: 'string',
          placeholder:"Enter Name"
        },
        {
          label: 'Pincode',
          key: 'address',
          required: true,
          displayOrder: 5,
          type: 'string',
           placeholder:"Enter Pincode"
        },
        {
          label: 'Zone Information',
          key: 'zoneinfo',
          required: true,
          displayOrder: 6,
          type: 'string',
          placeholder:"Enter Zone Information"
        },
        {
          label: 'Phone number',
          key: 'phone_number',
          required: false,
          displayOrder: 7,
          type: 'string',
        }
      ]
    };

    const RootStack = createStackNavigator({
      drawer:{
        screen: MyDrawer
      },
      Delivered:{
        screen: OrderList
      },
      Pending:{
        screen:PendingOrder
      },
      OrderReceipt:{
        screen:OrderReceipt
      },
      Feedback:{
        screen:Feedback
      },
    Home:{
      screen:Home
    },
      Cancelled:{
        screen:Cancelled
      }
    },{
      defaultNavigationOptions:{
      header:null


    }
    })

  const CustomerStack = createStackNavigator({
    drawer:{
      screen: CustomerDrawer
    },
    Home:{
      screen:Home
    },
    cards: {
      screen: Cardclass
    },
    header: {
      screen : HeaderClass
    },
    footer: {
      screen : FooterClass
    },
    categoryPage :{
      screen: CategoryScreen
    },
    itemOnView :{
      screen: ItemOnView
    },
    searchPage: {
      screen: SearchScreen
    },
    searchOnRatePage : {
      screen : SearchOnRateScreen
    }
  },{
      defaultNavigationOptions:{
      header:null
    }
  })

const AppAuth = createAppContainer(RootStack);
const AppAuth1 = createAppContainer(CustomerStack);

class App extends React.Component
{
constructor(props) {
    super(props);
    this.state = {

      UserName:'',

      loading: true
    };
  }

async componentDidMount () {
      console.log("About to mount")
    Auth.currentSession().then(function(session) {
      var string_session = JSON.stringify(session)

    }, function(err) {
      console.log(err)
    })
    const user=await Auth.currentAuthenticatedUser()
       this.setState({ UserName: user.username });
     }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

    naviagte(renderNavigation){
        if(this.state.UserName[0]=='y')
          {
          return(<AppAuth/>)
          }
          return (<AppAuth1/>)
}


  render() {
     if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
    <Container>


         {this.naviagte(this.props.navigation)}

      </Container>

    );
  }
}


 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
    drawerHeader: {
    height: 100,
    //backgroundColor: '#ca3b37'
  }
});

export default withAuthenticator(App,{signUpConfig }
            );
