/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Container from '../../components/Container';
import Header from '../../components/header';
import Text from '../../components/Text';

const Category = () => {
  const categories = useSelector(state => state.categoriesReducer);
  const {navigate} = useNavigation();
  return (
    <Container>
      <Header title="Category" addButton="categoryDetail"/>
      {categories.map(item => (
        <View key={item.id}>
          <TouchableOpacity onPress={()=> navigate('categoryDetail', {id: item.id})}>
            <Text large style={{marginVertical: 20}}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </Container>
  );
};

export default Category;
