import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, AuthContext } from './context/AuthContext';
import GameScreen from './screens/GameScreen';
import ProfilePage from './screens/ProfilePage';
import EditProfilePage from './screens/EditProfilePage';
import RewardScreen from './screens/RewardScreen';
import ChangePassword from './screens/ChangePassword';
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignupPage';

// Define Stack and Tab Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Profile Screens
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfilePage} />
    <Stack.Screen name="EditProfile" component={EditProfilePage} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
  </Stack.Navigator>
);

// Bottom Tab Navigator for Authenticated Users
const AppStack = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="GameScreen" component={GameScreen} />
    <Tab.Screen name="ProfileStack" component={ProfileStack} />
    <Tab.Screen name="Reward" component={RewardScreen} />
  </Tab.Navigator>
);

// Stack Navigator for Auth Screens
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="SignupPage" component={SignupPage} />
  </Stack.Navigator>
);

const App: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, [setIsAuthenticated]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const WrappedApp: React.FC = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
