import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {createAppContainer , createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base';
import HomeScreen from './HomeScreen'
import Settings from './Settings'
import YourOrders from './YourOrders'
import Profile from './Profile'
import LogOut from './LogOut'

import Amplify,{Auth,API} from 'aws-amplify';
import awsConfig from './aws-exports';

import {withAuthenticator} from 'aws-amplify-react-native';
Amplify.configure(awsConfig);


class App extends React.Component {
  render() {
    return (
      <CustAppNavigator />  
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

const CustAppNavigator = createDrawerNavigator ({
  Home: {
    screen: HomeScreen,
    navigationOptions: { 
      drawerLabel: 'Home Page'
    },
  },

  YourOrders: {
    screen: YourOrders, 
    navigationOptions: { 
      drawerLabel: 'Your Orders'
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: { 
      drawerLabel: 'Your Profile'
    },
  }, 

  Settings: {
    screen: Settings,
    navigationOptions: { 
      drawerLabel: 'Settings'
    },
  },

  LogOut: {
    screen: LogOut,
    navigationOptions: { 
      drawerLabel: 'Log Out'
    },
  }
  }, {
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'

})

const signUpConfig = {
      header: 'CUSTOMER SIGN UP FORM',
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
          label: 'Phone number',
          key: 'phone_number',
          required: false,
          displayOrder: 6,
          type: 'string',
        }
      ]
    };

const CustAppAuth = createAppContainer(CustAppNavigator);

export default withAuthenticator(CustAppAuth,{signUpConfig});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
    drawerHeader: {
    height: 100,
    backgroundColor: '#ca3b37'
  }
});
