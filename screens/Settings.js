import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.optionText}>Profile User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => alert('Language settings')}>
        <Text style={styles.optionText}>Language</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => alert('Sign out')}>
        <Text style={styles.optionText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  optionText: {
    fontSize: 18,
  },
});

export default Settings;
