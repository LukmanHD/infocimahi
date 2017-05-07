/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Navigator
} from 'react-native';
import Kategori from '../components/kategori'
import Lokasi from '../components/MyLocation';
import Bantuan from '../components/bantuan';
import About from '../components/about';
import Navbar from '../components/navtab';
import List from '../components/list';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import getTheme from '../theme/components';
import myTheme from '../theme/variables/myTheme';
import { StyleProvider } from 'native-base';

export default class infocimahi extends Component {

  render() {
    let Tabname = ["Beranda","Bantuan","About"];
   return (
     <StyleProvider style={getTheme(myTheme)}>
      <View style={styles.container}>
        <View style={styles.judul}>
          <Image source={require('../assets/logo.png')} style={{width: 134, height: 16, marginBottom: 10}} />
          
        </View>
        <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <Navbar name={Tabname} />}>
          <Kategori tabLabel="list-alt" />
          <Bantuan tabLabel="info"/>
          <About tabLabel="group"/>
        </ScrollableTabView>
      </View>
      </StyleProvider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  judul: {
    height: 50,
    backgroundColor: '#DD4B39',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs: {
    height: 50,
    backgroundColor: '#0057e7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
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
