/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Colors, withTheme} from '../../theme';
import Text from '../Text';
import HeaderBack from './HeaderBack';
import HeaderAdd from './HeaderAdd';

const propTypes = {
  title: PropTypes.string.isRequired,
};

const Header = ({title, theme, backButton, addButton, actionAdd}) => (
  <View style={styles.headerContainer}>
    { backButton ?
      <View style={styles.backButton}>
        <HeaderBack />
      </View> : <View/>
    }
    <Text bold color={theme.primaryColor}>
      {title}
    </Text>
    {addButton ?
      <View>
        <HeaderAdd page={addButton} action={actionAdd}/>
      </View> : <View/>
    }
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    ...Platform.select({
      android: {
        marginHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
      },
    }),
  },
  backButton: {

  }
});

Header.propTypes = propTypes;

export default withTheme(Header);
