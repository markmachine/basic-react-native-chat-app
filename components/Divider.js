import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
const LIGHT_GRAY = '#e5e5e5';

const Divider = props => (
  <View
    style={[
      {
        borderBottomColor: LIGHT_GRAY,
        borderBottomWidth: 1,
      },
      props.style,
    ]}
  />
);

Divider.propTypes = {
  style: PropTypes.shape({}),
};

Divider.defaultProps = {
  style: {},
};

export default Divider;
