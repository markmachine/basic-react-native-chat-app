import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

const getFontType = (type, props) => {
  switch(type) {
    case 'ant':
      return (
        <Icon.Entypo
          {...props}
        />
      )
      break;
    case 'awesome':
      return (
        <Icon.FontAwesome
          {...props}
        />
      )
      break;
    case 'typo':
      return (
        <Icon.Entypo
          {...props}
        />
      )
      break;
    case 'mat':
      return (
        <Icon.MaterialCommunityIcons
          {...props}
        />
      )
      break;
    default:
      return (
        <Icon.Ionicons
          {...props}
        />
      )
  }
}

export default class TabBarIcon extends React.Component {
  render() {
    const props = {
      name: this.props.name,
      size:26,
      style:{ marginBottom: -3 },
      color:this.props.focused ? Colors.tabIconDefault : Colors.tabIconDefault,
    }
    return getFontType(this.props.type, props);
  }
}