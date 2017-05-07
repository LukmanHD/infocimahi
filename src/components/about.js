import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class infocimahi extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         Info Cimahi merupakan media informasi tempat-tempat umum yang berada wilayah cimahi seperti kantor pemerintahan, tempat wisata, bank, pom bensin, mini market, dll. aplikasi ini diperuntukan bagi masyarakat cimahi yang kurang mengenal derah cimahi dan bagi masyarakat luar cimahi seperti wisatawan, perantau yang bertinggal atau berkunjung ke daerah cimahi
        </Text>
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
