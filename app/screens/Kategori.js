import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  Image,
  Modal
} from 'react-native';
// import list from './bantuan';
import { StackNavigator } from 'react-navigation'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Kategori extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        dataSource: ds,
    };
  }
  componentWillMount() {
    fetch('http://info-cimahi.netii.net/api/kategori')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: ds.cloneWithRows(responseJson) });
      })
      .catch((error) => {
        console.error(error);
      });
  }
    
    onList = (rowData) => {
    this.props.navigation.navigate('List', { ...rowData });
  };
   
  render() {
      return (
        <View style={styles.container}>
          <Text style={styles.judul}>Kategori</Text>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <View style={styles.item}>
                  <Image
            title={`${rowData.nama_kategori.toUpperCase()}`}
            style={{width: 110, height: 110}}
            source={{uri: 'http://info-cimahi.netii.net/images/'+rowData.image}}
            onPress={this.onList(rowData)}
            />
         
          </View>
            }
          />
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
        width: 110,
        height: 110,
    },
    judul: {
      fontFamily: 'Roboto-Medium',
      fontSize: 20,
      textAlign: 'center'
    }
});
