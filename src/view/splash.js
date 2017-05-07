import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Navigator
} from 'react-native';
import Home from './home';
import getTheme from '../theme/components';
import myTheme from '../theme/variables/myTheme';
import { StyleProvider, Header } from 'native-base'
export default class Splash extends Component{
     componentWillMount () {
        setTimeout (() => {
            this.props.navigator.replace({
                component: Home,
            });
        }, 2000);
    }

    render(){
        return(
            <StyleProvider style={getTheme(myTheme)}>
            <View style={styles.container}>
         
                <View style={styles.titleWrapper}>
                <Image 
                source={require('../assets/splash.png')}
                style={{width: 200, height: 200, marginBottom: 10}} />
                    <Text style={styles.title}>INFO CIMAHI</Text>
                    </View>
                <View>
                    <Text style={styles.subtitle}>Powered by Nusateam</Text>
                    </View>
            </View>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c0392b'
    },
    titleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1 ,
        flexDirection: 'column'
    },
    title : {
        color: 'white',
        fontSize : 35,
        fontWeight: 'bold'
    },
    subtitle: {
        color: 'white',
        fontWeight: '200',
        paddingBottom: 20
    }
})