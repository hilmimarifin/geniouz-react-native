import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, Image, FlatList, TouchableOpacity, StyleSheet, Pressable, Alert, Modal, ImageBackground, Text} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import removeIcon from '../../asset/icons/remove.png';
import ModalCustom from '../../components/Modal';

const ImageList = ({data, onChangeValue}) => {
    const {navigate} = useNavigation();
    const imagesData = data.map(item => {return {url: item.url}})
    const [show, setShow] = useState({modal: false, index: 0});
    const handleAccept = (index) => {
        data.splice(index,1)
        onChangeValue(data)
    }
    return(
        <View>
            <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => 
            <TouchableOpacity onPress={()=>setShow({modal: true, index: index})} >
              <ImageBackground source={{uri: `${item.url}`}} style={{marginTop: 20, width: 150, height: 200, borderRadius: 10}}>
                      <ModalCustom
                        showComponent= {
                         <View style={{flexDirection: 'row-reverse'}}>
                            <Image source={removeIcon} style={{width: 20, height: 20}}/>
                         </View>
                        } 
                        modalComponent= {
                            <Text>Yakin akan menghapus?</Text>
                        }
                        acceptButton
                        cancelButton
                        onAccept={()=> handleAccept(index)}
                      />
              </ImageBackground>
            </TouchableOpacity>
            }
            ItemSeparatorComponent={() => <View style={{ marginEnd: 20 }} />}
          />

            <Modal transparent={true} visible={show.modal} onRequestClose={()=>setShow({...show, modal: false})} animationType="slide">
                <ImageViewer imageUrls={imagesData} index={show.index} />
            </Modal>
        </View>    
    )
}


export default ImageList;