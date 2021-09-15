import React, { useEffect, useState } from 'react';
import Text from '../../components/Text';
import Container from '../../components/Container';
import { useDispatch } from 'react-redux';
import { StackActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { get_brands } from '../../redux/actions/brands-action';
import { get_products } from '../../redux/actions/products-action';
import { get_categories } from '../../redux/actions/categories-action';
import { getFromStorage } from '../../hooks/asyncStorage';
import { login_success } from '../../redux/actions/auth-actions';
import img from '../../asset/images/logo.jpg';
import { Image, StyleSheet, View } from 'react-native';



const SplashScreen = () =>{
    const dispatchRedux = useDispatch();
    const {dispatch} = useNavigation();
    useEffect(()=>{
        getFromStorage('userData')
         .then(data => { 
             setTimeout(() => {
                if(!data){
                    dispatch(StackActions.replace('loginStack'))
                } else {
                    dispatchRedux(login_success(data))
                    dispatch(StackActions.replace('homeTab'))
                }
             }, 1500);
        })

    }, [])
    return(
        <Container>
            <View style={style.container}>
                <Image source={img} style={{width: 240, height: 100}}/>
            </View>
        </Container>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '55%',
        // borderColor: 'white',
        // borderWidth: 3,
    }
})
export default SplashScreen;