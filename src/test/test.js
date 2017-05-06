import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image
} from 'react-native';
import { Container, Header, Content, Tab, Tabs, TabHeading, StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tab1 from './tabOne'
import Tab2 from './tabTwo'
import Tab3 from './tabOne'
import getTheme from '../theme/components';
import myTheme from '../theme/variables/myTheme';

export default class infocimahi extends Component {
  render() {
     
    return (
      <StyleProvider style={getTheme(myTheme)} >
       <Container>
            <View style={styles.judul}>
          <Image source={require('../assets/logo.png')} style={{width: 100, height: 50}} onPress={this.pre}/>
          
        </View>

            <Tabs brandDanger>
                <Tab heading={ <TabHeading><View style={{ flexDirection:'column', alignItems: 'center' }} tabLabel="Kategori"><Icon name="list-alt" size={20}style={{color: '#ffffff' }} /><Text>Kategori</Text></View></TabHeading>}>
                    <Tab1 />
                </Tab>
                <Tab heading={ <TabHeading><View style={{ flexDirection:'column', alignItems: 'center' }}><Icon name="map-marker" size={20}style={{color: '#ffffff' }}/><Text>Lokasi</Text></View></TabHeading>}>
                    <Tab2 />
                </Tab>
            </Tabs>
            </Container>
            </StyleProvider>
    );
  }
  pre(){
    this.props.navigator.push({
      component: Tab2
    })
    console.warn("Bisa")
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
  tabs: {
    height: 50,
    backgroundColor: '#DD4B39',
    elevation: 5
  },
  judul: {
    height: 30,
    backgroundColor: '#DD4B39',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

