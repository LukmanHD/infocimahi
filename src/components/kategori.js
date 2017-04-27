import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import { Spinner, Content, Container, Header, List, ListItem, Card, Item, CardItem, Left, Right, Body, } from 'native-base';
export default class infocimahi extends Component {

  constructor(props){
    super();
  //  var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
  //  var data = Array.apply(null, {length: 20}).map(Number.call, Number);
    this.state = {
      // dataSource: new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2}),
      hasil: null
    }
  }
  componentDidMount(){

    this._fetch();
  }

  
  _fetch(){
    fetch('http://info-cimahi.netii.net/api/kategori')
  .then((response) => response.text())
  .then((responseText) => {
    this.setState({
      // dataSource: this.state.dataSource.cloneWithRows(responseText),
      hasil: responseText
    })
  })
  .catch((error) => {
    console.warn(error);
  });
  }
/*  render() {
    return (
    <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.item}>{rowData}</Text>}
        />

    );
  } */

  render() {
    return (
    <View><List dataArray={this.state.hasil} renderRow={(data) => this.Row} />
      </View>
    );
  } 

  Row(){
    <ListItem>
      <Text style={styles.item}>{}item.nama_kategori</Text>
      </ListItem>
  }
  /*render() {
    return (
    <View>
      <List dataArray={this.state.hasil} renderRow={(item) =>
            <ListItem>
              <Text style={styles.item}>{item.nama_kategori}</Text>
          </ListItem>
        } />
      </View>
    );
  }*/
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: 'red',
        margin: 3,
        width: 100,
        height: 100,
    }
});
