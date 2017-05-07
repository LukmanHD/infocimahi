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
import splash from './src/view/splash'
// import test from './src/test/test'
// import coba from './coba'

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
        initialRoute={{component: splash}}
        ref={(nav) => { this.appNav = nav; }}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.HorizontalSwipeJump;
        }} />
      );
    }

    renderScene(route, navigator) {
      return <route.component navigator={navigator} {...route.passProps} />
    }
}

AppRegistry.registerComponent('infocimahi', () => infocimahi);
