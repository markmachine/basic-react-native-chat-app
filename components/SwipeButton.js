import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import TabBarIcon from './TabBarIcon';

const style = StyleSheet.create({
  swipeButton: {
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
    color: 'white',
  },
  buttonLabel: {
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
});

const SwipeButton = ({text, icon, width, backgroundColor, ...rest}) => (
  <TouchableOpacity
    style={[style.swipeButton, {width, backgroundColor}]}
    {...rest}>
    <TabBarIcon size={26} style={style.icon} type={'mat'} name={'video'} />
    <Text style={style.buttonLabel}>{text}</Text>
  </TouchableOpacity>
);

SwipeButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default SwipeButton;
