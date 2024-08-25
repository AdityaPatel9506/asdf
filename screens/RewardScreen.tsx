import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

const RewardScreen: React.FC = () => {
  const handleCardPress = (rewardType: string) => {
    // Handle card press (navigate or show details)
    // alert(`Selected: ${rewardType}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Rewards</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Cash')}>
          <Text style={styles.cardTitle}>Cash</Text>
          <Text style={styles.cardDetails}>Redeem cash rewards here</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Redeem Code')}>
          <Text style={styles.cardTitle}>Redeem Code</Text>
          <Text style={styles.cardDetails}>Use your redeem code here</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Exchange')}>
          <Text style={styles.cardTitle}>Exchange</Text>
          <Text style={styles.cardDetails}>Exchange rewards for points or items</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 16,
    color: '#555',
  },
});

export default RewardScreen;
