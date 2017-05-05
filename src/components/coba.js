import React, { Component } from 'react'
import {
    Modal, 
    Text,
    TouchableHighlight,
    View
} from 'react-native'

export default class Coba extends Component{
    constructor(props) {
    super(props);
    this.state = { 
        modalVisible: false,
        modalBuka: false
    };
  }

  setModalVisible(visible) {
        this.setState({
            modalVisible: visible,
        });
    }
    bukamodal(visible){
        this.setState({
            modalBuka: visible
        })
    }

    render(){
        return(
            <View style={{marginTop: 22}}>
                 <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
              >

              <View style={{marginTop: 22}}> 
                  <View> 
                      <Text>Hello World!</Text> 
              <TouchableHighlight onPress={() => { this.bukamodal(true) }}> 
                  <Text>Hide Modal</Text> 
              </TouchableHighlight> 

              <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {this.bukamodal(!this.state.modalBuka)}}
              >
               <View style={{marginTop: 22}}> 
                  <View> 
                      <Text>Hello World!</Text> 
              <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible) }}> 
                  <Text>Hide Modal</Text> 
              </TouchableHighlight> 
              </View>
              </View>
              </Modal>
              </View> 
              </View> 
              </Modal>
              <TouchableHighlight onPress={() => { this.setModalVisible(true) }}> 
                  <Text>Show Modal</Text> 
              </TouchableHighlight>
                </View>
        )
    }
}