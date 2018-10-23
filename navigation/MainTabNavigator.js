import React from 'react';
import { Platform, View, Alert } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ModalScreen from '../screens/ModalScreen';
import BlankScreen from '../screens/BlankScreen';
import ChatMainScreen from '../screens/ChatMainScreen';

const HomeStack = createStackNavigator({
  Home: ChatMainScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: <View/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-chatbubbles'}
    />
  ),
};

const CardStack = createStackNavigator({
  Links: ModalScreen,
});

CardStack.navigationOptions = {
  tabBarLabel: <View/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type={'mat'}
      focused={focused}
      name={'video'}
    />
  ),
    mode: 'modal',
    headerMode: 'none',
    cardStyle:{
        backgroundColor:"transparent",
        opacity:0.02
    }
};

const ChatStack = createStackNavigator({
  Links: BlankScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: <View/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type={'mat'}
      focused={focused}
      name={'phone'}
      showLabel={false}
    />
  ),
};

const ChatMainStack = createStackNavigator({
  Settings: ChatMainScreen,
});

ChatMainStack.navigationOptions = {
  tabBarLabel: <View/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type={'typo'}
      focused={focused}
      name={'circle'}
    />
  ),
};

const DupeStack = createStackNavigator({
  Settings: BlankScreen,
});

DupeStack.navigationOptions = {
  tabBarLabel: <View/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type={'awesome'}
      focused={focused}
      name={'smile-o'}
    />
  ),
  tabBarOnPress: () => {
      Alert.alert(
          "Current message value:",
          'message',
          [
              {
                  text: 'Cancel',
                  style: 'cancel',
              },
          ],
      )
  },
};

export default createBottomTabNavigator({
  HomeStack,
  ChatStack,
  ChatMainStack,
  CardStack,
  DupeStack,
});
