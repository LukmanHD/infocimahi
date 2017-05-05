import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import MapView from 'react-native-maps';

export default class MyLocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -6.914744,
        longitude: 107.609810,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      markers:[],
      selectedItem: undefined,
      latitude: null,
      longitude: null,
      lat: null,
      lng: null
    }
    this.onRegionChange = this.onRegionChange.bind(this);
  }
  

  componentDidMount() {
    this.mapMarkers();
    navigator.geolocation.getCurrentPosition (
      (position) => {
        this.setState({
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        });
        console.log("getCurrentPosition Succes");
        var latitude = JSON.stringify(position.coords.latitude);
        var longitude = JSON.stringify(position.coords.longitude);
        this.setState({latitude , longitude});
        this.watchPosition();
      },
      (error) => {
        alert(error.message)
      },
      {enableHightAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  watchPosition() {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        console.log("Watch Position Succes");
        if(this.props.followUser) {
          this.map.animateToRegion(this.newRegion(position.coords.latitude, position.coords.longitude));
        }
      },
      (error) => {
        alert(error.message)
      },
      {enableHightAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  mapMarkers() {
    return fetch('http://info-cimahi.netii.net/api/tempat')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          markers: responseJson
        });
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getDirection(latitude, longitude, lat, lng) {

    const location= this.state;
    const marker = this.state.markers;
    const url = `http://maps.google.com/maps?saddr=${location.latitude},${location.longitude}&daddr=${lat},${lng}`
    
    return Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      return Promise.reject(new Error(`Could not open the url: ${url}`))
    } else {
      return Linking.openURL(url)
    }
  })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsMyLocationButton={true}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange} >
            {this.state.markers.map((marker,i) => (
            <MapView.Marker
              key={i}
              coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
              title={marker.nama_tempat}
              description={marker.alamat}
              onPress={() => this.getDirection(this.state.latitude, this.state.longitude, parseFloat(marker.latitude), parseFloat(marker.longitude))}
            />
          ))}
        </MapView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
      ...StyleSheet.absoluteFillObject,
    },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
})
