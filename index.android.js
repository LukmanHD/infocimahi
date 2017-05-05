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
  Navigator, 
  BackAndroid
} from 'react-native';

import home from './src/view/home'
import test from './src/test/test'
// import coba from './coba'
import App from './app/index';

export default class infocimahi extends Component {
 componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.appNav && this.appNav.getCurrentRoutes().length > 1) {
        this.appNav.pop();
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        initialRoute={{component: test}}
        ref={(nav) => { this.appNav = nav; }} />
      );
    }

    renderScene(route, navigator) {
      return <route.component navigator={navigator} {...route.passProps} />
    }
}

AppRegistry.registerComponent('infocimahi', () => home);
