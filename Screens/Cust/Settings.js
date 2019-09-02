import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {createAppContainer , createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base';

//import ChangePassword from './ChangePassword'
//import ChangeAddress from './ChangeAddress'
//import ChangePhone from './ChangePhone'

export default class Settings extends React.Component {
  render() {
    return (
      //<SettingNavigator />  
      <View style={styles.container}>
        <Text>
          Setting page
        </Text>
      </View>

    );
  }
}









const CustomDrawerContentComponent = (props) => (

  <Container>
    <Header style={styles.drawerHeader}>
      <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="chevron-left" style={{ color: 'white', marginTop:20 }} onPress={ () => { goBack() } } />
          <Text style={{ marginLeft: 5, fontSize: 18, color: 'black', fontStyle: 'italic', marginTop:20 }}>Settings</Text>
        </Left>
      </Header>

    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);


/*
const SettingNavigator = createDrawerNavigator ({
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: { 
      drawerLabel: 'Change Password'
    },
  },

  ChangeAddress: {
    screen: ChangeAddress,
    navigationOptions: { 
      drawerLabel: 'Change Address'
    },
  },

  ChangePhone: {
    screen: ChangePhone,
    navigationOptions: { 
      drawerLabel: 'Change Phone No.'
    },
  }
  }, {
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'

})

export default createAppContainer(SettingNavigator);

*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerHeader: {
  height: 100,
  backgroundColor: '#757575'
  }
});
