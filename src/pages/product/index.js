/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Image, FlatList, TouchableOpacity} from 'react-native';
import Container from '../../components/Container';
import Text from '../../components/Text';
import {Colors} from '../../theme';
import axios from 'axios';
import Loading from '../../components/Loading';
import TextInput from '../../components/TextInput';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import { reactor } from '../../redux/actions/reactor-action';
import Icon from '../../components/Icon';
import {launchCamera, launchImageLibrary}  from 'react-native-image-picker';
import FormData from 'form-data';
import RNFetchBlob from 'rn-fetch-blob';
import NumberInput from '../../components/NumberInput';
import productsReducer from '../../redux/reducers/products-reducer';
import { getDetailProduct, editProduct } from '../../redux/actions/products-action';
import Modal from '../../components/Modal';
import CheckBox1 from '../../components/CheckBox';
import CheckBox from '@react-native-community/checkbox';
import CategoriesField from './categories';
import Header from '../../components/header';
import BrandsField from './brand';

const Product = ({route}) => {
  const dispatch = useDispatch();
  const k = useSelector(state => state.detailProductReducer);
  const [form, setForm] = useForm(route.params ? {...k, categories: k.categories.map(i => i.id), brand: k.brand.id} : {categories: [], brand: '611a219a78c39b001687a9c7'});
  const {navigate, goBack} = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const categories = useSelector(state => state.categoriesReducer);
  const brands = useSelector(state => state.brandsReducer);
  const [imgBlob, setImgBlob] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [imageType, setImageType] = useState(null);
  console.log('form', form.brand)
  const {id} = route.params || {};

   const selectCamera = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 500,
      maxHeight: 500,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
    };
     launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let source = { uri: response.assets[0].uri, type: response.assets[0].type, name: response.assets[0].fileName, base64: response.assets[0].base64 };
          // ADD THIS
          setImageSource(source.uri);
          setImageName(source.name);
          setImageType(source.type);
          setImgBlob(RNFetchBlob.wrap(source.uri));
        }
      });
   };
   const selectGallery = () => {
        let options = {
          title: 'You can choose one image',
          maxWidth: 256,
          maxHeight: 256,
          noData: true,
          mediaType: 'photo',
          storageOptions: {
            skipBackup: true,
          },
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
              console.log('User cancelled photo picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              let source = { uri: response.assets[0].uri, type: response.assets[0].type, name: response.assets[0].fileName, base64: response.assets[0].base64 };
              // ADD THIS
              setImageSource(source.uri);
              setImageName(source.name);
              setImageType(source.type);
              setImgBlob(RNFetchBlob.wrap(source.uri));
            }
          });
   };


  const saveData = () =>{
    dispatch(editProduct(form));
    const data = {...k, ...form};
    const fileData = {
      name: 'files.images',
      filename: imageName,
      type: imageType,
      data: imgBlob,
    };
    const productData = {
      name: 'data',
      data: JSON.stringify(data),
    };
    console.log('data', data)
    if (id)
        {
         axios.put(`https://geniouz-strapi.herokuapp.com/products/${id}`, data,
          { 'Content-Type': 'multipart/form-data', headers: { Authorization: `Bearer ${token}` }})
          .then(response => { 
            showMessage({message: 'edit success', type: 'success'});
            dispatch(reactor);})
          .catch(err => {showMessage({message: 'edit failed', type: 'danger'});});
          imageSource ? RNFetchBlob.fetch('POST', 'https://geniouz-strapi.herokuapp.com/upload',  {
            'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`,
          }, [{name: 'files', filename: imageName, type: imageType, data: imgBlob}, {name: 'ref', data: 'products'}, {name: 'refId', data: id}, {name: 'field', data: 'images'}]).then(res => {showMessage({message: 'upload success', type: 'success'});
          goBack();
        })
        .catch(res => {showMessage({message: 'upload failed', type: 'danger'}); console.log('upload error', res)})
         : null;
        } else {
          RNFetchBlob.fetch('POST', 'https://geniouz-strapi.herokuapp.com/products', {
            'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`,
          }, [productData, fileData])
          .uploadProgress((written, total) => {
            console.log('uploaded', written / total)
        })
          .then(res =>
                        {
                            showMessage({message: 'success add data', type: 'success'});
                        }
            )
            .catch(res => {showMessage({message: 'upload failed', type: 'danger'}); console.log('upload error', res)});

        };
        dispatch(reactor());
  };

  const deleteData = () => {
    axios.delete(`https://geniouz-strapi.herokuapp.com/products/${id}`,
          { 'Content-Type': 'multipart/form-data', headers: { Authorization: `Bearer ${token}` }}).then(res => {
            showMessage({message: 'produk telah dihapus', type: 'success'});
            goBack();
          })
          .catch(res => {showMessage({message: 'Gagal menghapus', type: 'danger'}); console.log('upload error', res)});

  }
  return (
    <Container>
      {/* {loading ? <Loading /> : */}
      <Header title="Product"/>
      <View>
          <FlatList
            data={form.images}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>
            <TouchableOpacity onPress={()=>navigate('photo', {url: item.url})}>
              <Image source={{uri: `${item.url}`}} style={{width: 150, height: 200, borderRadius: 10}}/>
            </TouchableOpacity>
            }
            ItemSeparatorComponent={() => <View style={{ marginEnd: 20 }} />}
          />
        <View style={{paddingVertical: 20}}>
          {!imageSource ?
            <Modal 
            showComponent={
              <View
              style={
                      {
                      height: 40,
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderRadius: 1,
                      borderColor: Colors.white,
                      marginHorizontal: 8,
                      justifyContent:'center',
                      alignItems: 'center'}
                    }
              
              >
                <Icon name="plus"/>
              </View>

            }
            modalComponent={
              <View>
                <TouchableOpacity onPress={selectCamera}><Text>From Camera</Text></TouchableOpacity>
                <TouchableOpacity onPress={selectGallery}><Text>From Gallery</Text></TouchableOpacity>
              </View>
            }
            />
            :
            <Image source={{uri: `${imageSource}`}} style={{width: 150, height: 200, marginEnd: 20, borderRadius: 10}}/>
          }
        </View>
        <TextInput label="Nama" onChangeText={(a)=>setForm('name', a)} >{form.name}</TextInput>
        <BrandsField brandsData={brands} formBrands={form.brand} onChangeValue={a => setForm('brand', a)}/>
        <CategoriesField onChangeValue={()=>{setForm()}} categories={categories} formCategories={form.categories} id={id}/>
        <TextInput  label="Shopee URL" onChangeText={(a)=>setForm('shopeeUrl', a)}>{form.shopeeUrl}</TextInput>
        <TextInput label="Tokped URL" onChangeText={(a)=>setForm('tokpedUrl', a)} >{form.tokpedUrl}</TextInput>
        <NumberInput step={5000} label="Harga Beli" onChange={(a)=>setForm('purchasePrice', a)} value={form.purchasePrice}/>
        <NumberInput step={5000} label="Harga Jual" onChange={(a)=>setForm('salePrice', a)} value={form.salePrice}/>

        <Text>Varian :</Text>
        { id ? form.variants.map((items, index) =>
          <TouchableOpacity
            key={index}
            onPress={()=>navigate('variantStack', {screen: 'variants', params: {index: index, id: items.id, sleeve: items.sleeve, color: items.color, size: items.size}}
               )}
            style={{
              marginHorizontal: 8,
              marginVertical: 8,
              borderWidth: 1,
              borderColor: `${Colors.lightGrey}`,
              paddingHorizontal: 8,
              paddingVertical: 8,
              borderRadius: 10}}
          >
              <Text >
                {items.color}
              </Text>
          </TouchableOpacity>) : null}
        <Button color={Colors.lightGrey} text="Tambah Varian" onPress={()=> navigate('variantStack', {screen: 'variants'})}/>
        {id ? <Button text="Hapus" color={Colors.red} onPress={deleteData}/> : null}
        <Button text="Simpan" onPress={saveData}/>
      </View>
      {/* } */}
    </Container>
  );
};

export default Product;
