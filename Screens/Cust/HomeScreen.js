import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Image} from 'react-native';
import {Container, Header, Content, Left, Right, Icon, Item, Input, Card, CardItem } from 'native-base';
import Swiper from 'react-native-swiper'
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';

import RecommendedCardItem from './RecommendedCardItem'
import FooterClass from '../Catalog/FooterClass'
import HeaderClass from '../Catalog/HeaderClass'
import Cardclass from '../Catalog/Cardclass'
import {listItems} from '../../src/graphql/queries'

class HomeScreen extends React.Component {

	constructor (props) {
    super(props)
    this.state = {
      queryResponse: [],
      loading: true,
      cardList: []
    };
    this.getItems = this.getItems.bind(this);
    this.createCard = this.createCard.bind(this);
  }

  createCard = ({item},height) => (
    <Cardclass
      height = {height}
      navigation={ this.props.navigation }
      id = {item.id}
      title = {item.title}
      ImageUrl = {item.ImageUrl}
      rate = {item.rate}
      category = {item.category}
      descriptionUrl = {item.descriptionUrl}
    />
  );

	async getItems(){
	 console.log('listing iItems');
	 try{
	   const itemList = await API.graphql(graphqlOperation(listItems));
		 console.log("items fetched");
	   this.setState({queryResponse: itemList.data.listItems.items });
	 } catch(err) {
	   console.log(err);
	  }
	}

  async componentWillMount(){
    await this.getItems();
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });

  }
	render() {
		if (this.state.loading) {
			return (
				<Expo.AppLoading />
			);
		}
		console.log("render begins");
		const { navigation } = this.props.navigation;
		const height = 300;
	return(
		<Container>
			<HeaderClass navigation = {this.props.navigation}/>


      <Content style={{ backgroundColor: 'white', marginTop: 70 }}>


      	<Swiper autoplay={true} style={{ height: 100}} >
          <View style={{ flex: 1 }}>
              <Image
                  style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
                  source={require('../assets/swiper_1.jpg')} />
          </View>
          <View style={{ flex: 1 }}>
              <Image
                  style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
                  source={require('../assets/swiper_2.jpg')} />
          </View>
          <View style={{ flex: 1 }}>
              <Image
                  style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
                  source={require('../assets/swiper_3.jpg')} />
          </View>
				</Swiper>
				<ScrollView>
					<FlatList
						data = { this.state.queryResponse }
						numColumns = {2}
						renderItem = { ( item ) =>
							this.createCard(item,height)
						}
						keyExtractor={item => item.id}
						style={styles.container}
						contentContainerStyle={{ justifyContent: 'center',flexGrow: 1,alignItems : 'center'}}
						horizontal={false}
					/>
				</ScrollView>
        <Card style={{ marginLeft: 5, marginRight: 5 }}>
            <CardItem header style={{ borderBottomWidth: 1, borderBottomColor: '#dee0e2' }}>
              <Text>Your Recommendations</Text>
            </CardItem>

            <RecommendedCardItem
                itemName="LAYS"
                itemCreator="Classic Salty"
                itemPrice="Rs.50"
                imageUri={require("../assets/lays.jpg")}
                rating={5}
            />
            <RecommendedCardItem
                itemName="COLGATE"
                itemCreator="Max Fresh Toothpaste"
                itemPrice="Rs.20"
                imageUri={require("../assets/toothpaste.jpg")}
                rating={4.5}
            />
            <RecommendedCardItem
                itemName="HARPIC"
                itemCreator="Toilet Cleaner"
                itemPrice="Rs.70"
                imageUri={require("../assets/harpic.jpg")}
                rating={3}
            />
        </Card>
      </Content>
			<FooterClass navigation = {this.props.navigation}/>
		</Container>
		);
	}
}

const styles = StyleSheet.create({
    container: {
				marginVertical: 20,
    }
});

export default HomeScreen;
