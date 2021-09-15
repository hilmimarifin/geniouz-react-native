/* eslint-disable prettier/prettier */
import axios from 'axios';
import React from 'react';
import { View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Header from '../../components/header';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import { useForm } from '../../hooks';
import {showMessage} from 'react-native-flash-message';
import { reactor } from '../../redux/actions/reactor-action';
import { Colors } from '../../theme';
import DeleteButton from '../../components/DeleteButton';
import { useNavigation } from '@react-navigation/native';

const DetailCategory = ({route}) => {
  const {id} = route.params || {};
  const data = useSelector(state => state.categoriesReducer) || {};
  const detail = data.find(i => i.id === id) || {};
  const [form, setForm] = useForm({title: detail.title} || {});
  const {goBack} = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const handleSave = () => {
    id ?
    axios.put(`https://geniouz-strapi.herokuapp.com/categories/${id}`, form, { 'Content-Type': 'multipart/form-data', headers: { Authorization: `Bearer ${token}` }})
    .then(response => {
      showMessage({message: 'Berhasil Menguubah kategori', type: 'success'});
      dispatch(reactor);
      goBack();
    })
    .catch(err => {showMessage({message: 'Gagal mengubah kategori', type: 'danger'});})
    :
    axios.post('https://geniouz-strapi.herokuapp.com/categories', form, { 'Content-Type': 'multipart/form-data', headers: { Authorization: `Bearer ${token}` }})
    .then(response => {
      showMessage({message: 'Berhasil Menambah kategori', type: 'success'});
      dispatch(reactor);
      goBack();
    })
    .catch(err => {showMessage({message: 'Kategori gagal ditambahkan', type: 'danger'});});
  };

    const handleDelete = () => {
      axios.delete(`https://geniouz-strapi.herokuapp.com/categories/${id}`, { 'Content-Type': 'multipart/form-data', headers: { Authorization: `Bearer ${token}` }})
    .then(response => {
      showMessage({message: 'Berhasil Menhapus kategori', type: 'success'});
      dispatch(reactor);
      goBack();
    })
    .catch(err => {showMessage({message: 'Gagal menghapus kategori', type: 'danger'});});
    };
  return (
    <Container >
      <Header title={id ? 'Edit Category' : 'Add Category'} />
      <View >
        <TextInput label="Name" onChangeText={(x)=>setForm('title', x)}>{form.title}</TextInput>
        {/* <Button text="Save" onPress={handleSave}/>
        {id ?
          <DeleteButton text="Delete" color={Colors.red} cancelButton onPress={handleDelete}/> : null
        } */}
      </View>
     </Container>
  );
};

export default DetailCategory;
