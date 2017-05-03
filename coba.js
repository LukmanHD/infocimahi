import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator, 
  BackAndroid,
  TouchableHighlight
} from 'react-native';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class AwesomeProject extends Component {
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

  render() {
      return (
        <View>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => 
            <TouchableHighlight onPress={this.onSelect.bind(this)}>
            <Text style={styles.item}>{rowData.nama_kategori}</Text>
            </TouchableHighlight>
            }
          />
        </View>
      );
  }

  onSelect(rowData){
    this.props.navigator.push({
        component: list,
        passProps:{
            id: rowData
        }
    })
    }
}

class list extends Component{
     constructor(props) {
    super(props);
    this.state = { 
        dataSource: ds,
    };
  }

  componentWillMount() {
    fetch('http://info-cimahi.netii.net/api/tempat')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: ds.cloneWithRows(responseJson) });
      })
      .catch((error) => {
        console.error(error);
      });
      
  }
    render(){
        return(
            <View>
            </View>
        )
    }
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
