import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class NavigationTab extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <View style={styles.tabs}>

        {this.props.tabs.map(( tab, i) => {
          return (
            <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              <Icon
                name={tab}
                size={30}
                color={this.props.activeTab === i ? 'rgb(0,0,0)' : 'rgb(255, 255, 255)'}
              />
            <Text style={{fontWeight:'bold', fontSize:10, color:this.props.activeTab === i ? 'rgb(0,0,0)' : 'rgb(255, 255, 255)'}}>{`${this.props.name[i]}`}</Text>
          </TouchableOpacity>
          )
        })}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  tabs: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#DD4B39',
    elevation: 5
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20
  },
  title: {
    fontSize: 30,
    color: '#ffffff'
  },
  tab: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
