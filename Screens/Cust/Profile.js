import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import {Container, Header, Left, Right, Icon, Button} from 'native-base';
import {createStackNavigator, createAppContainer } from 'react-navigation';
//import EditProfile from './EditProfile';
import {withAuthenticator} from 'aws-amplify-react-native';
Amplify.configure(awsmobile);

import Amplify, { Auth,API} from 'aws-amplify';
import awsmobile from './aws-exports';



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId:[],
      UserName:'',
      name:'',
      pincode:'',
      email:'',
      phone:'',

      loading: true
    };
  }

async componentDidMount () {
    //window.LOG_LEVEL = 'DEBUG'
    console.log("About to mount")
    Auth.currentSession().then(function(session) {
      var string_session = JSON.stringify(session)
      //console.log("session: "+string_session)
      // var sub=session.idToken.payload.sub
      // console.log("sub: "+JSON.stringify(sub))
    }, function(err) {
      console.log(err)
    })
    const user=await Auth.currentAuthenticatedUser()
      //console.log("USER: " + JSON.stringify(user))
      //console.log("username: " + user.username)
      this.setState({ UserName: user.username });
      this.setState({UserID:user.attributes.sub});
      this.setState({name:user.attributes.name});
      this.setState({pincode:user.attributes.address});
      this.setState({email:user.attributes.email});
      this.setState({phone:user.attributes.phone_number});
      
    
    

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

      render() {
       if (this.state.loading) {
      return <Expo.AppLoading />;
    }

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
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.info}>UserName: {this.state.UserName}</Text>
                <Text style={styles.info}>Reward Points: 100</Text>
                <Text style={styles.info}>Prime Customer: No</Text>
                <Text style={styles.description}>Address: B-486 Majlis Park, Adarsh Nagar, Delhi</Text>
                  <Text style={styles.description}>Pincode: {this.state.pincode}</Text>
                  <Text style={styles.description}>Email: {this.state.email}</Text>
                  <Text style={styles.description}>Phone: {this.state.phone}</Text>
                 
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