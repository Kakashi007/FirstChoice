import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Icon, Button, Container, Header, Content, Left} from 'native-base';
//import App from '../App';

class LogOut extends React.Component
{
	 constructor(props) {
        super(props);
     }

     componentWillMount() {
        Asyncstorage.clear();
        this.props.navigation.navigate('App')
    }

	render() {
	return(
		<Container>
			<Header>
				<Left>
					<Icon name="ios-menu"style={{textAlign: 'left'}} onPress={() => this.props.navigation.openDrawer('DrawerOpen')} />
				</Left>
			</Header>
			<Content contentContainerStyle={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center'
			}}>
				<Text>Log Out Screen</Text>
			</Content>
		</Container>	
		);
	}
} 

export default LogOut;