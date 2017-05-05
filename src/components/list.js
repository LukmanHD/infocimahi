import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Tempat extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        dataSource: ds,
        id: null
    };
  }
  componentWillMount() {
   
  }
  render() {
      return (
        <View style={styles.container}>
          <Text style={styles.judul}>Daftar Tempat</Text>
         
        </View>
      );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingLeft: 8
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
    list: {
     
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: 'red',
        margin: 3,
        width: 80,
        height: 80,
    },
    judul: {
      fontFamily: 'Roboto-Medium',
      fontSize: 20,
      textAlign: 'center'
    }
});
