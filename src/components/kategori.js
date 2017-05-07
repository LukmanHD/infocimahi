import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ListView,
  Navigator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import getTheme from '../theme/components';
import myTheme from '../theme/variables/myTheme';
import Icon from 'react-native-vector-icons/FontAwesome';
// import list from './bantuan';

// import { StackNavigator } from 'react-navigation'

import { 
 ListItem,
 List,
 Thumbnail,
 Left,
 Right,
 Body,
 Button,
 Card, 
 CardItem,
 StyleProvider,
 Header,
 Title 
  } from 'native-base';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Kategori extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        dataSource: ds,
        modalList: false,
        modalDetail: false
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

   List(visible) {
        this.setState({
            modalList: visible,
        });
    }

    Detail(visible) {
        this.setState({
            modalDetail: visible,
        });
    }
 render() {
  // const { navigate } = this.props.navigation; 
      return (
          <StyleProvider style={getTheme(myTheme)} >
      
        <View style={styles.container}>
          <Text style={styles.judul}>Kategori</Text>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(data) => <Row {...data} />}
          />

        </View>

  </StyleProvider>
      
      );
  } 
}

class Row extends Component{
  constructor(props){
    super(props);
    this.state = {
        dataSource: ds,
        modalList: false,
        modalDetail: false,
        select : ''
    }
  }
 
    componentWillMount() {
    this.ListTempat();
  }
    ListTempat(props){
      fetch('http://info-cimahi.netii.net/api/tempat/'+this.props.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: ds.cloneWithRows(responseJson) });
      })
      .catch((error) => {
        console.error(error);
      });
    }
    List(visible, x) {
        this.setState({
            modalList: visible,
            select : x
        });
    }

    Detail(visible) {
        this.setState({
            modalDetail: visible,
        });
    }
  render(){
    return(
        <StyleProvider style={getTheme(myTheme)} >
      <View>
          <TouchableOpacity onPress={()=>this.List(true, this.props.id)}>
            <Image
            style={styles.item}
            source={{uri: 'http://info-cimahi.netii.net/images/'+this.props.image}}/>
         </TouchableOpacity>

           <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalList}
              onRequestClose={() => {this.List(!this.state.modalList)}}
              >
          
          <Header><Title><Text style={styles.judul}>{this.props.nama_kategori}</Text></Title></Header>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => <Detail {...data}/>}
          />

              </Modal>

        </View>
        </StyleProvider>
    );
  }
}

class Detail extends Component{
  constructor(props){
    super(props);
    this.state = {
        modalDetail: false,
        select : '',
        latitude: null,
        longitude: null,
        lat: null,
        lng: null
    }
  }
 
    Detail(visible, x) {
        this.setState({
            modalDetail: visible,
            select : x
        });
    }
    componentDidMount(){
      this._setPosition();
     
       this.watchID = navigator.geolocation.watchPosition((position) => {
      var latitude = JSON.stringify(position.coords.latitude);
      var longitude = JSON.stringify(position.coords.longitude);
      this.setState({latitude , longitude});
       });
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }

    _setPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                position: position
            });
        }, (error) => {
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }




 test(lat, lng){
  //  console.warn(lat, lng);

    const location = this.state;
    const url = `http://maps.google.com/maps?saddr=${location.latitude},${location.longitude}&daddr=${lat},${lng}`
    
    return Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      return Promise.reject(new Error(`Could not open the url: ${url}`))
    } else {
      return Linking.openURL(url)
    }
  })
 }

  render(){
    
    return(
       <StyleProvider style={getTheme(myTheme)} >
      <View>
        <Card>
              <CardItem>
               <View style={{flexDirection: 'row'}}>
                 <View style={{justifyContent: 'center'}}>
                   <Image source={{uri:'http://info-cimahi.netii.net/images/'+ this.props.image}} style={{width: 80, height: 80,}}/>
                 </View>

                 <View style={{width: 0,flexGrow: 1, marginLeft: 3,}}>
                   <Text style={styles.listTitle}>{this.props.nama_tempat}</Text>
                  <Text style={styles.listContent}>{this.props.alamat}</Text>
                  <View style={{flexDirection:'row'}}>
                  <Button small onPress={()=> this.test(this.props.latitude, this.props.longitude)}><Icon name="map-marker"><Text>  Tunjukan </Text></Icon></Button>
                  </View>
                 </View>
                 </View>
              </CardItem>
          </Card>
           

           <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalDetail}
              onRequestClose={() => {this.Detail(!this.state.modalDetail)}}
              >
          
            <View style={styles.container}>
          <Text style={styles.judul}>Detail</Text>
         <Text style={styles.judul}>{this.props.keterangan}</Text>
         

        </View>

              </Modal>

        </View>
        </StyleProvider>
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
  listKat: {
    height: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 3,
    padding: 5,
    backgroundColor: 'red'
  },
    list: {
     
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        margin: 3,
        width: 110,
        height: 110,
    },
    judul: {
      fontFamily: 'Roboto-Medium',
      fontSize: 20,
      textAlign: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    listContent: {
      fontFamily : 'Roboto',
      fontSize: 12,
      flex: 1,
      flexWrap: 'wrap'
    },
    listTitle: {
      fontFamily : 'Roboto-Medium',
      fontSize: 14,
      flexWrap: 'wrap'
    },
     row: { 
       flexDirection: 'row', 
       justifyContent: 'center', 
       padding: 3, 
      }, 
     thumb: { 
       width: 80, 
       height: 80,
       marginRight: 5 
      }, 
     text: { 
       flex: 1, 
      },

});
