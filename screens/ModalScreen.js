import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default class BlankScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat',
  };

  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}
      >
        <View
          style={{
            height: '50%',
            width: '100%',
            backgroundColor: '#fff',
            justifyContent: 'center',
          }}
        >
          <Text>Testing a modal with transparent background</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
