import AsyncStorage from "@react-native-async-storage/async-storage";


export const getFromStorage = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
      console.log('error get data from storage', e)
    }
}

export const setToStorage = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch(e) {
      console.log('error, gagal save ke storage', e)
    }
}

export const removeFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
    console.log('gagal menghapus data dari storage', e)
  }
}