import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  Image,
  Modal,
  Button,
  TouchableOpacity
} from 'react-native';
// import list from './bantuan';
import { StackNavigator } from 'react-navigation'

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
          <TouchableOpacity onPress={()=>this.Detail(true, this.props.id)}>
           <Text>{this.props.nama_tempat}</Text>
         </TouchableOpacity>

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
    }
});
