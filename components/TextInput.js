import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

const ICON_GRAY = '#cccccc';
const ICON_BLUE = '#3ea9da';
const DISABLED = '#dddddd';
const RED = '#EB776A';
const WHITE = '#ffffff';

const iconBase = {
  alignItems: 'center',
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 0,
    flex: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  submitButton: {
    backgroundColor: RED,
  },
  submitButtonDisabled: {
    backgroundColor: DISABLED,
  },
  submitButtonText: {
    color: WHITE,
    fontWeight: 'bold',
    paddingTop: 8,
    paddingRight: 15,
    paddingBottom: 8,
    paddingLeft: 15,
  },
  icon: {
    ...iconBase,
    color: ICON_GRAY,
  },
  iconEnabled: {
    ...iconBase,
    color: ICON_BLUE,
  },
});

class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.input;

    this.state = {
      inputHeight: 0,
      message: '',
    };
  }

  componentWillUnmount() {
    this.props.updateMessage('');
  }

  updateMessage = message => {
    this.setState({
      message,
    });
  };

  render() {
    const {message, inputRef} = this.props;

    return (
      <View style={style.container}>
        <TextInput
          ref={input => {
            this.input = input;
          }}
          style={[
            style.input,
            {height: Math.min(Math.max(this.state.inputHeight, 25), 80)},
          ]}
          multiline
          placeholder="Send a chat"
          underlineColorAndroid="transparent"
          onChangeText={text => this.updateMessage(text)}
          onContentSizeChange={event => {
            this.setState({
              inputHeight: event.nativeEvent.contentSize.height,
            });
          }}
          onFocus={() => {
            console.log('onFocus');
          }}
          value={this.state.message}
          testID="message-field"
        />
        <TouchableOpacity
          onPress={() => {
            this.props.updateMessage(this.state.message);
            this.setState({
              message: '',
            });
          }}>
          <View
            style={{
              margin: 5,
              padding: 10,
              backgroundColor: 'rgb(229, 229, 229)',
            }}>
            <Text>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

InputContainer.defaultProps = {
  message: '',
  inputRef: null,
  updateMessage: () => {},
};

InputContainer.propTypes = {
  message: PropTypes.string,
  inputRef: PropTypes.func,
  updateMessage: PropTypes.func,
};

export default InputContainer;
