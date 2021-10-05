import React from 'react';
import {ScrollView, SafeAreaView, FlatList, View} from 'react-native';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onScroll: PropTypes.func,
  transparency: PropTypes.bool,
};

const defaultProps = {
  transparency: false,
  onScroll: () => {},
};

const Container = ({
  theme,
  onScroll,
  children,
  transparency,
  refreshControl,
  flatlist
}) => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: !transparency ? theme.background : 'rgba(0, 0, 0, 0.7)',
    }}>
    {flatlist?
    <View style={{flex: 1}}>
      {children}
    </View>
    :
    <ScrollView
      scrollEventThrottle={1}
      onScroll={({nativeEvent}) => onScroll(nativeEvent.contentOffset.y)}
      style={{flex: 1}}
      refreshControl={refreshControl}>
      {children}
    </ScrollView>
    }
  </SafeAreaView>
);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default withTheme(Container);
