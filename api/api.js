import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.4:5000/auth';

export const login = async (email, password, navigation) => {
  try {
    console.log('Attempting login with:', { email, password });
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('Login response:', response);

    // Save the token in AsyncStorage and navigate to the authenticated stack
    await AsyncStorage.setItem('userToken', response.data.token);
    
    // Set authentication state and navigate
    navigation.reset({
      index: 0,
      routes: [{ name: 'GameScreen' }],
    });

    return response.data;
  } catch (error) {
    console.log(email+" "+password);
    console.error('Error logging in:', error.message || error);
    throw error;
  }
};
