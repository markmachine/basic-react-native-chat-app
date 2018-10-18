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
    flexDirection: 'column',
    padding: 5,
  },
  rowFront: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
  },
  date: {
    flex: 1,
    textAlign: 'right',
    fontSize: 18,
    alignSelf: 'center',
    color: 'gray',
    paddingTop: 2,
  },
  snippet: {
    color: 'black',
    fontSize: 18,
    flex: 1,
    justifyContent: 'flex-start',
  },
  borderBlock: {
    borderLeftWidth: 5,
    borderLeftColor: 'rgb(226, 108, 108)',
    paddingLeft: 5,
    backgroundColor: 'rgb(229, 229, 229)',
    borderRadius: 4,
    padding: 5,
  }
});

const RED = 'rgb(73, 171, 244)';
const BLUE = 'rgb(226, 108, 108)';

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
      incoming,
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

    return (
        <View style={{flex: 1, width: Dimensions.get('window').width}}>
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
                text="Save"
                backgroundColor="rgb(178, 178, 178)"
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
                <View style={{flexDirection: 'row'}}>
                  <Text
                    onLayout={this.grabClientNameWidth}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      style.name,
                      {maxWidth: widthAdjust, marginBottom: 4},
                      {color: incoming ? RED : BLUE}
                    ]}>
                    {name.toUpperCase()}
                  </Text>
                </View>
                <View style={[{flex: 1, flexDirection: 'column'}, style.borderBlock, {borderLeftColor: incoming ? RED : BLUE}]}>

                  <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text
                      style={style.snippet}
                      numberOfLines={6}
                      ellipsizeMode="tail"
                      html>
                      {text}
                    </Text>
                  </View>

                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={style.date}>{formattedDate}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </SwipeRow>
        </View>
      )

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
    incoming: PropTypes.bool,
  }).isRequired,
  onPress: PropTypes.func,
};

export default Item;