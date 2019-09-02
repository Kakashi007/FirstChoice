import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import {Container, Header, Left, Right, Icon, Button} from 'native-base';
import {createStackNavigator, createAppContainer } from 'react-navigation';
import EditProfile from './EditProfile'

class Profile extends Component {

  render() {
    return (
    	<Container>
    			<Header style={[{ backgroundColor: '#ca3b37', height: 90, borderBottomColor: '#757575' }, styles.androidHeader]}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Icon name="md-menu" style={{ color: 'white', marginRight: 15 }} onPress={() => this.props.navigation.openDrawer('DrawerOpen')} />
                    </Left>
                    <Right>
                        <Icon name="md-cart" style={{ color: 'white' }} />
                    </Right>
                </Header>
            <ScrollView>
      		<View>
      		
	          <Image style={styles.avatar} source={require('../assets/user.jpg')}/>
	          <View style={styles.body}>
	            <View style={styles.bodyContent}>
	              <Text style={styles.name}>Yashvi Verma</Text>
	              <Text style={styles.info}>UserName: yverma</Text>
	              <Text style={styles.info}>Reward Points: 100</Text>
	              <Text style={styles.info}>Prime Customer: No</Text>
	              <Text style={styles.description}>Address: B-486 Majlis Park, Adarsh Nagar, Delhi</Text>
	              	<Text style={styles.description}>Pincode: 110033</Text>
	              	<Text style={styles.description}>Email: yverma.1996@gamil.com</Text>
	              	<Text style={styles.description}>Phone: 9656430982</Text>
	              
	            	<TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('EditProfile')}>
                		<Text style={{ fontSize: 16 }}>Edit Profile</Text> 
              		</TouchableOpacity>     
	            </View>
	        </View>
	        
	    </View>
	    </ScrollView>
	    </Container>
    );
  }
}

const RootStack = createStackNavigator(
  {
  	YourProfile: Profile,
    EditProfile: EditProfile 
  },
  {
    initialRouteName: 'YourProfile',
    defaultNavigationOptions: {
    header: null
  },
  }
);

export default createAppContainer(RootStack);

const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop: 50,
    alignSelf:'center',
    position: 'absolute',
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
    marginTop: 190,
  },
  body:{
    marginTop:170,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#3a455c",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:30,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:200,
    borderRadius:30,
    backgroundColor: "#ca3b37",
  },
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