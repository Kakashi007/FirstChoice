import React, { Component } from 'react';
import Amplify, { Auth,API } from 'aws-amplify';
// import awsmobile from './aws-exports';
// Amplify.configure(awsmobile);
import { withAuthenticator } from 'aws-amplify-react-native';
import {  I18n, Logger } from 'aws-amplify';
import { Authenticator,SignIn, SignUp } from  'aws-amplify-react-native';
import { Container, Header, Title,Button,Text, Content, Footer,Tab, Tabs, TabHeading,List, ListItem, FooterTab, Card,CardItem,Thumbnail,Drawer, Left, Right, Body, Icon,  } from 'native-base';

import {
  StyleSheet,
  ScrollView ,
  View,
  Image,
  Platform,
  StatusBar,
} from 'react-native';






export default class App extends Component {

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
          <Header style={[{  height: 90, borderBottomColor: '#757575' }, styles.androidHeader]}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Icon name="arrow-back" style={{ color: 'white' }} button onPress={() => { this.props.navigation.goBack() }} />
                    </Left>
                     <Title style={{marginTop:18}}> PROFILE </Title>
                     <Right>
                     </Right>

                </Header>
            <ScrollView>
          <View>

            <Image style={styles.avatar} source={require('../assets/user.jpg')}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.info}>UserName: {this.state.UserName}</Text>




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
