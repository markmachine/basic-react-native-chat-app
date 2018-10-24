import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { WebBrowser } from 'expo';
import Divider from '../components/Divider';
import TextInput from '../components/TextInput';
import Item from '../components/Item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 5,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    paddingLeft: 17,
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
    alignItems: 'flex-start',
    backgroundColor: '#fbfbfb',
    paddingVertical: 4,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

class ChatMainScreen extends React.Component {
  state = {
    refreshing: false,
    id: 5,
    onEndReachedCalledDuringMomentum: true,
    convos: this.props.conversations,
  };

  onEndReachedHandler = async () => {
    if (this.props.isFetching || this.state.onEndReachedCalledDuringMomentum) {
      return;
    }

    // await this.getConversations({cursor: this.props.cursor});
    this.setState({ onEndReachedCalledDuringMomentum: true });
  };

  handleUpdateMessage = (message = '') => {
    console.log('message', message);
    const d = new Date();
    let { id } = this.state;
    id += 1;
    const output = {
      id: `${id}`,
      name: 'me',
      incoming: false,
      text: message,
      timestamp: d.toISOString(),
    };
    if (message.indexOf('@you') > -1) {
      output.name = 'you';
      output.incoming = true;
    }
    if (message.indexOf('@msg') > -1) {
      Alert.alert('Current message value:', message, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    }

    const { convos } = this.state;
    convos.push(output);

    this.setState({
      convos,
      id: convos.length,
    });
  };

  renderItem = ({ item }) => {
    console.log('item', item);
    return (
      <Item
        key={`${item.id}ggg`}
        conversation={item}
        onPress={() => {
          console.log('press item');
        }}
      />
    );
  };

  onRefresh = async () => {
    this.setState({
      refreshing: true,
    });

    // await this.getConversations();

    this.setState({
      refreshing: false,
    });
  };

  onMomentumScrollBegin = () => {
    this.setState({ onEndReachedCalledDuringMomentum: false });
  };

  renderFooter = () => {
    if (!this.props.isFetching) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  keyExtractor = item => item.id;

  getSwipeList = () => {
    const { refreshing } = this.state;
    const { conversations } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <SwipeListView
          useFlatList
          style={styles.container}
          data={conversations}
          keyExtractor={this.keyExtractor}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReachedHandler}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          refreshing={refreshing}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          ItemSeparatorComponent={() => <View style={{ marginLeft: 68 }} />}
        />
      </View>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={[styles.container, { alignItems: 'flex-end' }]}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {this.getSwipeList()}
          </ScrollView>

          <View style={styles.tabBarInfoContainer}>
            <TextInput updateMessage={this.handleUpdateMessage} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes',
    );
  };
}

ChatMainScreen.navigationOptions = {
  headerRight: <View />,
  headerLeft: <View />,
  headerTitle: 'User Name',
  headerTitleStyle: {
    fontSize: 25,
    fontWeight: '500',
    fontStyle: 'normal',
    color: 'white',
  },
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: '#42b3f4',
  },
};

ChatMainScreen.defaultProps = {
  conversations: [
    {
      id: '001',
      name: 'me',
      incoming: false,
      text: 'this is some chat text',
      timestamp: '2018-10-18T19:10:36.062Z',
    },
  ],
  isFetching: false,
};

ChatMainScreen.propTypes = {
  conversations: PropTypes.array,
  isFetching: PropTypes.bool,
};

export default ChatMainScreen;
