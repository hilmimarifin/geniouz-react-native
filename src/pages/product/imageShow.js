import React, { useEffect, useState } from 'react';
import {View, Image, FlatList, TouchableOpacity, StyleSheet, Pressable, Alert, Modal, Text} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


const ImageShow = ({route}) => {
    console.log('nilai params',route.params)
    return(
        <View>
            <Modal>
                <ImageViewer imageUrls={route.params.data} index= {route.params.index}/>
            </Modal>
        </View>
    )
}

export default ImageShow