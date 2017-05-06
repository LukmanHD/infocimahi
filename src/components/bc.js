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
// import list from './bantuan';

// import { StackNavigator } from 'react-navigation'

import { 
 ListItem,
 List,
 Thumbnail,
 Left,
 Right,
 Body,
 Button 
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
        <View style={styles.container}>
          <Text style={styles.judul}>Kategori</Text>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(data) => <Row {...data} />}
          />

        </View>


      );
  } 
}
/*
const Row = (props) => (
  <View style={styles.item} onPress={()=>this.setModalVisible(true)}>
                  <Image
            style={{width: 110, height: 110}}
            source={{uri: 'http://info-cimahi.netii.net/images/'+props.image}}
            
          />
         
          </View>
);
*/
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
          
            <View style={styles.container}>
          <Text style={styles.judul}>List</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => <Detail {...data}/>}
          />

        </View>

              </Modal>

        </View>
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


 direction(latitude, longitude, lat, lng){

    const location = this.state;
    const url = `http://maps.google.com/maps?saddr=${location.latitude},${location.longitude}&daddr=${location.lat},${location.lng}`
    
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
      <View>
            <ListItem thumbnail >
              <Left>
                  <Thumbnail square source={{uri:'http://info-cimahi.netii.net/images/'+ this.props.image}} style={{width: 80, height: 80, marginRight: 5}}/>
              </Left>
              <Body>
                  <Text>{this.props.nama_tempat}</Text>
                  <Text note>{this.props.alamat}</Text>
                  <View style={{flexDirection:'row'}}>
                  <Button small success style={{marginRight: 10}}><Text>  Posisi </Text></Button>
                  <Button small onPress={()=> this.direction(this.state.latitude, this.state.longitude, this.props.latitude, this.props.longitude)}><Text>  Tunjukan </Text></Button>
                  </View>
              </Body>
          </ListItem>

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
    );
  }
}

/* Bisa */
/*
class Detail extends Component{
  constructor(props){
    super(props);
    this.state = {
        modalDetail: false,
        select : ''
    }
  }
 
    Detail(visible, x) {
        this.setState({
            modalDetail: visible,
            select : x
        });
    }
  render(){
    return(
      <View>
        <View style={styles.listKat}>
          <TouchableOpacity onPress={()=>this.Detail(true, this.props.id)}>
            <View style={styles.row}> 
            <Image 
            style={styles.thumb}
            source={{uri: 'http://info-cimahi.netii.net/images/'+ this.props.image}} />
           <View>
           <Text style={styles.listTitle}>{this.props.nama_tempat}</Text>
            <Text style={styles.text}>{this.props.alamat}</Text>
            </View>
           </View>
         </TouchableOpacity>
         </View>


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
    );
  }
}
*/
/*
render() {
  // const { navigate } = this.props.navigation; 
      return (
        <View style={styles.container}>
      <Button onPress={()=>this.List(true)} title="Test" />
       

         <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalList}
              onRequestClose={() => {this.List(!this.state.modalList)}}
              >
              <View style={{alignItems:'center'}}>
        <Button onPress={() => {this.List(!this.state.modalList)}} title="Close" />
        <Button onPress={()=>this.Detail(true)} title="Detail" />
        
         <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalDetail}
              onRequestClose={() => {this.Detail(!this.state.modalDetail)}}
              >
              <View style={{alignItems:'center'}}>
        <Button onPress={() => {this.Detail(!this.state.modalDetail)}} title="Close" />
        
                </View>
              </Modal>


                </View>
                
              </Modal>

               </View>
      );
  } 
}*/



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
      textAlign: 'center'
    },
    listContent: {
      fontFamily : 'Roboto-Medium',
      fontSize: 14
    },
    listTitle: {
      fontFamily : 'Roboto-Medium',
      fontSize: 16
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
