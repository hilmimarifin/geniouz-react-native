import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Pressable
} from 'react-native';
import {Colors} from '../theme';
import Modal from './Modal';
import Text from './Text';


const defaultProps = {
  loading: false,
  disabled: false,
  transparent: false,
  color: Colors.green,
  tintColor: Colors.black,
};

const DeleteButton = ({
  text,
  color,
  loading,
  onPress,
  disabled,
  tintColor,
  transparent,
  ...props
}) => {
  const {container} = styles;
  const buttonContainerStyle = [container];

  if (disabled || loading) {
    buttonContainerStyle.push({backgroundColor: Colors.lightGrey});
  } else if (!transparent) {
    buttonContainerStyle.push({backgroundColor: color});
  }

  return (
    <Modal 
    onAccept={onPress}
    acceptButton
    modalComponent={<Text>Yakin akan menghapus ini?</Text>
    }
    animationType='fade'
    showComponent={
      <View
          // onPress={onPress}
          style={buttonContainerStyle}
          disabled={disabled || loading}>
          {loading ? (
            <ActivityIndicator
              color={Colors.white}
              size={Platform.OS === 'ios' ? 'large' : 24}
              style={{marginVertical: Platform.OS === 'ios' ? 10 : 0}}
            />
          ) : (
            <Text bold color={tintColor} style={{textAlign: 'center'}}>
              {text}
            </Text>
          )}
      </View>
    }
    {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 6,
  },
});

export default DeleteButton;
