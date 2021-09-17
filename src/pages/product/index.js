/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Image, FlatList, TouchableOpacity, StyleSheet, Pressable, Alert, Modal as RNModal} from 'react-native';
import Container from '../../components/Container';
import Text from '../../components/Text';
import {Colors} from '../../theme';
import axios from 'axios';
import Loading from '../../components/Loading';
import TextInput from '../../components/TextInput';
import { StackActions, useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
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
import DeleteButton from '../../components/DeleteButton';
import { resolvePreset } from '@babel/core';
import ImageList from './imageList';
import Variants from './variants';


const Product = ({route}) => {
  const dispatchRedux = useDispatch();
  const k = useSelector(state => state.detailProductReducer);
  const [form, setForm] = useForm(route.params ? {...k, categories: k.categories.map(i => i.id), brand: k.brand.id} : {
    ...k, variants: [] , brand: '611a219a78c39b001687a9c7'});
  const {navigate, goBack, addListener, dispatch, reset} = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const categories = useSelector(state => state.categoriesReducer);
  const brands = useSelector(state => state.brandsReducer);
  const [imgBlob, setImgBlob] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openVariants, setOpenVariants] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatchRedux(editProduct(form));
    },[dispatchRedux, editProduct, form])
  )
  // useEffect(
  //   () =>
  //     addListener('beforeRemove', (e) => {
  //       if (hasUnsavedChanges) {
  //         // If we don't have unsaved changes, then we don't need to do anything
  //         return;
  //       }

  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();

  //       // Prompt the user before leaving the screen
  //       Alert.alert(
  //         'Yakin mau keluar?',
  //         'Terdapat perubahan yang belum disimpan',
  //         [
  //           { text: "Batal", style: 'cancel', onPress: () => {} },
  //           {
  //             text: 'Keluar',
  //             style: 'destructive',
  //             // If the user confirmed, then we dispatch the action we blocked earlier
  //             // This will continue the action that had triggered the removal of the screen
  //             onPress: () => dispatch(e.data.action),
  //           },
  //         ]
  //       );
  //     }),
  //   [addListener,dispatch, hasUnsavedChanges]
  // );
  const initialForm = {...k, categories: k.categories.map(i => i.id), brand: k.brand.id};
  const hasUnsavedChanges = initialForm === form;
  const {id, variantsData} = route.params || {};

   const selectCamera = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.8,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
    };
     launchCamera(options, response => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
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
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.8,
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
    setLoading(true)
    const generatecode = (brand, category) => {
     const a =  Math.floor(Math.random()*1000)
     const b = String(a)
     const addZero = () => {
       if(b.length === 1){ return `00${b}`}
       else if (b.length ===2){return `0${b}`}
       else {return b}
     }
     const c = addZero()
     const brandProduct = brand === "61188217dca90d4eed10ef40" ? 'G' : 'N'
     const cat = () => {
        //Kemeja polos
        if (category.includes("612836fd17bed300163f4464")){ return '01' }
        //Kemeja flannel
        else if(category.includes("612839e417bed300163f4465")){ return '02'}
        //kemeja motif
        else if(category.includes("612839ef17bed300163f4466")){ return '03'}
        //kemeja Batik
        else if(category.includes("612839f917bed300163f4467")){ return '04'}
        //Kemeja Denim
        else if(category.includes("61283a3217bed300163f4468")){ return '05'}
        //Kemeja Formal
        else if(category.includes("61283a7417bed300163f4469")){ return '06'}

        //kaos
        else if(category.includes("612834fe17bed300163f4461")){ return '10'}
        //baju muslim
        else if(category.includes("6128351f17bed300163f4463")){ return '20'}
        //jaket
        else if(category.includes("6128350e17bed300163f4462")){ return '30'}
        //dll
        else { return '90'}
     }
     return brandProduct + cat() + c
    }
    const code = generatecode(form.brand, form.categories)
    const data = {...k, ...form};
    const fileData = {
      name: 'files.images',
      filename: imageName,
      type: imageType,
      data: imgBlob,
    };
    const productData = {
      name: 'data',
      data: JSON.stringify({...data, code: code}),
    };
    if (id)
        {
         axios.put(`https://geniouz-strapi.herokuapp.com/products/${id}`, data,
          { 'Content-Type': 'multipart/form-data', headers: { Authorization: `Bearer ${token}` }})
          .then(response => { 
            showMessage({message: 'edit success', type: 'success'});
            dispatchRedux(reactor);
            imageSource ?
              RNFetchBlob.fetch('POST', 'https://geniouz-strapi.herokuapp.com/upload',  {
              'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`,
              }, [{name: 'files', filename: imageName, type: imageType, data: imgBlob}, {name: 'ref', data: 'products'}, {name: 'refId', data: id}, {name: 'field', data: 'images'}])
              .then(res => {showMessage({message: 'upload success', type: 'success'});
                //  navigate('home');
                //  dispatch(StackActions.replace('maintab'))
                reset({index: 1, routes: [{name: 'maintab'}]})

              })
              .catch(res => {setLoading(false);showMessage({message: 'upload failed', type: 'danger'}); console.log('upload error', res)})
             :  
                // dispatch(StackActions.replace('maintab'))
                reset({index: 1, routes: [{name: 'maintab'}]})
          })
          .catch(err => {setLoading(false); showMessage({message: 'edit failed', type: 'danger'});});
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
                            reset({index: 1, routes: [{name: 'maintab'}]})
                        }
            )
            .catch(res => {setLoading(false); showMessage({message: 'upload failed', type: 'danger'}); console.log('upload error', res)});
        };
        dispatchRedux(reactor());
  };

  const deleteData = () => {
    setLoading(true);
    axios.delete(`https://geniouz-strapi.herokuapp.com/products/${id}`,
          { 'Content-Type': 'multipart/form-data', headers: { Authorization: `Bearer ${token}` }}).then(res => {
            showMessage({message: 'produk telah dihapus', type: 'success'});
            reset({index: 1, routes: [{name: 'maintab'}]})
          })
          .catch(res => {showMessage({message: 'Gagal menghapus', type: 'danger'}); console.log('upload error', res)});

  }
  return (
    <Container>
      {/* {loading ? <Loading /> : */}
      <Header title={id? form.name : `Add Product`}/>
      <View>
        <ImageList data= {form.images} onChangeValue={(a) => setForm('images', a)}/>
        <View style={{paddingVertical: 20}}>
          {!imageSource ?
            <Modal
            cancelButton 
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
                <TouchableOpacity style={{marginBottom: 10}} onPress={selectCamera}><Text>From Camera</Text></TouchableOpacity>
                <TouchableOpacity style={{marginBottom: 10}} onPress={selectGallery}><Text>From Gallery</Text></TouchableOpacity>
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
        <TextInput  label="Bahan" onChangeText={(a)=>setForm('material', a)}>{form.material}</TextInput>
        <TextInput  label="Shopee URL" onChangeText={(a)=>setForm('shopeeUrl', a)}>{form.shopeeUrl}</TextInput>
        <TextInput label="Tokped URL" onChangeText={(a)=>setForm('tokpedUrl', a)} >{form.tokpedUrl}</TextInput>
        <NumberInput step={5000} label="Harga Modal" onChange={(a)=>setForm('purchasePrice', a)} value={form.purchasePrice}/>
        <NumberInput step={5000} label="Harga Jual" onChange={(a)=>setForm('salePrice', a)} value={form.salePrice}/>

        <Text style={{marginHorizontal: 8, marginVertical: 8}}>Varian :</Text>
        <Text style={{marginHorizontal: 8, marginVertical: 8}}>Tangan Pendek :</Text>
        { form.variants.map((items, index) =>
          { if (!items.longSleeve) {
                return <Variants key={index} items={items}/>
              } 
              
            }
          )
        }

        <Text style={{marginHorizontal: 8, marginVertical: 8}}>Tangan Panjang :</Text>
        {form.variants.map((items, index) =>
          { if (items.longSleeve) {
            return <Variants key={index} items={items} />
              } 
              
            }
          )
        }

        <Button color={Colors.lightGrey} text="Tambah Varian" onPress={()=> setOpenVariants(true)} />
        {id ? <DeleteButton loading={loading} text="Hapus" color={Colors.red} cancelButton onPress={deleteData}/> : null}
        <Button text="Simpan" onPress={saveData} loading={loading}/>
      </View>
      {/* <RNModal animationType="slide" visible={openVariants} onRequestClose={() => {
          setOpenVariants(false);
        }}>
        <Variants dataVariant={form.variants[0]} />
      </RNModal> */}
    </Container>
  );
};

const style = StyleSheet.create({
  variantsContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: `${Colors.lightGrey}`,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10
  }
})
export default Product;
