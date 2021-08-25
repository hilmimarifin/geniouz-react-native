/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Alert, Modal as RNModal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';

const Modal = ({showComponent,modalComponent, onAccept, onCancel,  children, cancelButton, acceptButton, ...props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAccept = () => {
    setModalVisible(!modalVisible);
    onAccept? onAccept() : null
  }
  const handleCancel= () => {
    setModalVisible(!modalVisible);
    onCancel? onCancel() : null;
  }
  return (
    <View >
      <RNModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        {...props}
      >
         <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {modalComponent}
            <View style={{flexDirection: 'row'}}>
              {acceptButton ? 
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleAccept()}
              >
                <Text style={styles.textStyle}>Okaaay</Text>
              </TouchableOpacity> : null
              }
              {cancelButton ? 
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleCancel()}
                >
                  <Text style={styles.textStyle}>Gak jadi</Text>
                </Pressable> : null
              }
            </View>

          </View>
        </View>
      </RNModal>
      <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        {/* <Text style={styles.textStyle}>Show Modal</Text> */}
        {showComponent}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Modal;
