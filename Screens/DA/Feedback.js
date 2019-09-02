import React, { Component } from "react";
import { Container,Header,Right,Card,Text, Content, Textarea, Form ,Left,Button,Icon,Body,Title,Item,Label,Input} from "native-base";
import {Overlay,CheckBox} from "react-native-elements";
import {
  StyleSheet,
Platform,StatusBar,
  View,
  Image,
  FlatList,
  Alert,ListView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
export default class TextArea extends Component {
  render() {
    return (
      <Container>
        <Header style={[{  height: 90, borderBottomColor: '#757575' }, styles.androidHeader]}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Icon name="arrow-back" style={{ color: 'white', marginRight: 15 }} onPress={() => this.props.navigation.goBack()} />
                    </Left>

                     <Title style={{marginTop:18,marginRight:20}}> FEEDBACK FORM </Title>
                    <Right>
                    
    </Right>
                </Header>


        <Content padder>
        <Card>
          <Form>
                  <Label><Text>Is your order delivered on time? </Text></Label>  
                     <Input />
                   <CheckBox
  center
  title='Yes'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  
/>
        <CheckBox
  center
  title='No'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  
/>              
<Label><Text>Are you satisfied with delivery service? </Text></Label>  
                     <Input />
                   <CheckBox
  center
  title='Yes'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  
/>
        <CheckBox
  center
  title='No'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  
/>              
         
            <Textarea rowSpan={5} bordered placeholder="any Other suggestions..." />
           
            <Button success><Text> Submit </Text></Button>
             <Button info><Text> Cancel </Text></Button>
          </Form>
</Card>

        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
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