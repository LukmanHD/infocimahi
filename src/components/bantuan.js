import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

export default class infocimahi extends Component {
  render() {
    return (
      <View style={{padding: 10}}>
      <ScrollView>
        <View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row'}}>
      <Image 
      source={require('../assets/kategori.png')}
      style={{width: 50, height: 75}}
       />
       <Text>Pilih Tempat Berdasarkan kategori</Text>
       </View>

          <View style={{flexDirection:'row'}}>
      <Image 
      source={require('../assets/list.png')}
      style={{width: 50, height: 75}}
       />
       <Text>Pilih list tempat yang dituju</Text>
       </View>

          <View style={{flexDirection:'row'}}>
      <Image 
      source={require('../assets/app.png')}
      style={{width: 50, height: 75}}
       />
       <Text>Pilih aplikasi maps yang akan dipake</Text>
       </View>

          <View style={{flexDirection:'row'}}>
      <Image 
      source={require('../assets/gmaps.png')}
      style={{width: 50, height: 75}}
       />
       <Text>Tampilan di google maps</Text>
       </View>

       </View>
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
