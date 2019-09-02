import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Icon, Button, Container, Header, Content, Left } from 'native-base'


export default class TrialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      text: 'Useless Placeholder',
      status : false,
      textBorderColor :'red'
    };
    this.toggleSearchBar = this.toggleSearchBar.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  componentWillMount() {
    fetch('https://pastebin.com/raw/p8r9NMiM')
    .then(response => this.setState({
      data: response._bodyText
    }));
  }

  toggleSearchBar = () => {
    console.log("in search")
    if(this.state.status == true) {
      this.setState({status: false})
    }
    else {
      this.setState({status: true})
    }
  }

  _onFocus = () => {
    this.setState({
      textBorderColor : 'green'
    })
  }

  _onBlur = ()=> {
    this.setState({
      backgroundColor: 'red'
    })
  }
  render() {
    return(
      <Container>
        <Content>
          <Text> This is the homeScreen </Text>
          <Text> {this.state.data} </Text>
        </Content>
        <Button vertical active onPress={() => this.toggleSearchBar()} >
          <Icon active name="gift" />
          <Text>Search</Text>
        </Button>

        { this.state.status ? (
          <View>
            <TextInput
              onFocus = {() => this._onFocus()}
              onBlur = {() => this._onBlur()}
              style={{height: 40, borderColor: this.state.textBorderColor, borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <Button vertical onPress={() => this.props.navigation.navigate('cart', {
              val: this.state.text
              })
            }>
            <Icon name="Cart" />
            <Text>Cart</Text>
            </Button>
          </View>
        ):null}
      </Container>
    );
  }
}



// response.json())
//   .then(data => this.setState({ data })

// https://pastebin.com/raw/M6fUB1iW