import React from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatMainScreen from '../screens/ChatMainScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: <View/>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type={'mat'}
      focused={focused}
      name={'video'}
    />
  ),
};

const ChatStack = createStackNavigator({
  Links: ChatScreen,
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
  Settings: SettingsScreen,
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
};

export default createBottomTabNavigator({
  HomeStack,
  ChatStack,
  ChatMainStack,
  LinksStack,
  DupeStack,
});
