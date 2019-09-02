import React, { Component } from 'react';
  import { Text, View,StyleSheet } from 'react-native';

  /*
    @dev - Sheetal Kumar
    Date - 23 Jan 2019
  */

  class Saved extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Text>Fav</Text>
        </View>
      );
    }
  }

  export default Saved;

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      }
});