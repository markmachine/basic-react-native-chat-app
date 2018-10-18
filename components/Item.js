import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableHighlight, Dimensions, Text} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import moment from 'moment';
import SwipeButton from '../components/SwipeButton';

const WHITE = 'white';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  rowFront: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    minHeight: 90,
    backgroundColor: 'white',
  },
  couplePhotoWrapper: {
    marginRight: 16,
    position: 'relative',
    top: -4,
  },
  unreadWrapper: {
    position: 'absolute',
    top: 12,
    left: -14,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
  },
  nameRead: {
    fontSize: 16,
    color: 'black',
  },
  date: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    alignSelf: 'flex-end',
    color: 'gray',
    marginBottom: 7,
  },
  snippet: {
    color: 'gray',
    flex: 1,
    justifyContent: 'flex-start',
  },
});

class Item extends Component {
  constructor() {
    super();
    this.swipeRow = null;
    this.clientNameWidth = 0;
  }

  onPress = () => {
    this.props.onPress(this.props.conversation);
  };

  closeRow = () => {
    this.swipeRow.closeRow();
  };

  grabClientNameWidth(e) {
    this.clientNameWidth = e.nativeEvent.layout.width + 5;
  }

  render() {
    const {conversation} = this.props;
    const {
      id,
      name,
      text,
      timestamp,
    } = conversation;

    const formattedDate = moment(timestamp).calendar(
      null,
      {
        sameDay: 'h:mm a',
        lastDay: '[Yesterday], h:mm a',
        lastWeek: '[Last] dddd',
        sameElse(now) {
          if (this.isSame(now, 'year')) {
            return 'MMM DD';
          }
          return 'MMM DD, YYYY';
        },
      },
    );

    const widthAdjust =
      Dimensions.get('window').width - (145 + formattedDate.length * 3);

    const swipeActionWidth = 92;
    const swipeActions = [1,2,3]; //null; //getConversationActions(conversation);

    const DEBG = true;

    const returnHeighLight = () => {
      return (
        <TouchableHighlight
          style={[style.rowFront, {width: Dimensions.get('window').width}]}
          onPress={this.onPress}
          underlayColor={WHITE}
          activeOpacity={0.2}
          testID={id}>
          <View style={style.container}>

            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  onLayout={this.grabClientNameWidth}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    style.name,
                    {maxWidth: widthAdjust, marginBottom: 4},
                  ]}>
                  {name}:
                </Text>
                <Text style={style.date}>{formattedDate}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text
                  style={style.snippet}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  html>
                  {text}
                </Text>

              </View>
            </View>
          </View>
        </TouchableHighlight>
      )
    }

    if (DEBG) {
      return (
        <SwipeRow
          ref={element => {
            this.swipeRow = element;
          }}
          leftOpenValue={swipeActionWidth * 1}
          disableLeftSwipe>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
            <SwipeButton
              width={swipeActionWidth}
              onPress={() => {
                console.log('button push')
                if (this.closeRow) this.closeRow();
              }}
              text="Unbook"
              backgroundColor="rgb(96, 110, 120)"
              icon="book-filled"
              id="book-button"
            />
          </View>
          {returnHeighLight()}
        </SwipeRow>
      )
    } else {
      return (
        <SwipeRow
          ref={element => {
            this.swipeRow = element;
          }}
          rightOpenValue={swipeActions.length * swipeActionWidth * -1}
          disableRightSwipe>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <SwipeButton
              {...swipeActionWidth}
              onPress={() => {
                console.log('button push')
                if (this.closeRow) this.closeRow();
              }}
              text="Unbook"
              backgroundColor="rgb(96, 110, 120)"
              icon="book-filled"
              id="book-button"
            />
          </View>

          <TouchableHighlight
            style={style.rowFront}
            onPress={this.onPress}
            underlayColor={WHITE}
            activeOpacity={0.2}
            testID={id}>
            <View style={style.container}>

              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    onLayout={this.grabClientNameWidth}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      style.name,
                      {maxWidth: widthAdjust, marginBottom: 4},
                    ]}>
                    {name}:
                  </Text>
                  <Text style={style.date}>{formattedDate}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  <Text
                    style={style.snippet}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    html>
                    {text}
                  </Text>

                </View>
              </View>
            </View>
          </TouchableHighlight>
        </SwipeRow>
      );
    }



  }
}

Item.defaultProps = {
  onPress: () => {},
};

Item.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    timestamp: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
};

export default Item;