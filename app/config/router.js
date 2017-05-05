import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Kategori from '../screens/Kategori';
import Detail from '../screens/Detail';
import List from '../screens/List';
import Lokasi from '../screens/Lokasi';

export const KategoriStack = StackNavigator({
  Kategori: {
    screen: Kategori,
    navigationOptions: {
      title: 'Kategori',
    },
  },
  List: {
    screen: List,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.nama_kategori.toUpperCase()}`,
    }),
  },
});

export const Tabs = TabNavigator({
  Kategori: {
    screen: KategoriStack,
    navigationOptions: {
      tabBarIcon: <Icon name="list" size={35} />,
    },
  },
  Lokasi: {
    screen: Lokasi,
    navigationOptions: {
      tabBarIcon:<Icon name="map-marker" size={35} />
    },
  },
});

export const DetailStack = StackNavigator({
  Detail: {
    screen: Detail,
    navigationOptions: {
      title: 'Detail',
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Detail: {
    screen: DetailStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
