import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { logout } from '../api/api'; // Adjust path if needed
import AsyncStorage from '@react-native-async-storage/async-storage';
interface ProfilePageProps {
  navigation: StackNavigationProp<any, any>; // Adjust type as needed
}

const ProfilePage: React.FC<ProfilePageProps> = ({ navigation }) => {
  // Sample user data (this would typically come from state or props)
  const user = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    contactNumber: '+1234567890',
    upiId: 'john.doe@upi',
    country: 'Country Name',
    state: 'State Name',
    city: 'City Name',
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout API method
      navigation.navigate('Profile'); // Navigate to the login page
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred during logout.');
    }
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.label}>Full Name:</Text>
      <Text style={styles.text}>{user.fullName}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Text style={styles.label}>Contact Number:</Text>
      <Text style={styles.text}>{user.contactNumber}</Text>
      <Text style={styles.label}>UPI ID:</Text>
      <Text style={styles.text}>{user.upiId}</Text>
      <Text style={styles.label}>Country:</Text>
      <Text style={styles.text}>{user.country}</Text>
      <Text style={styles.label}>State:</Text>
      <Text style={styles.text}>{user.state}</Text>
      <Text style={styles.label}>City:</Text>
      <Text style={styles.text}>{user.city}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Change Password"
          onPress={() => navigation.navigate('ChangePassword')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default ProfilePage;
