import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from './Footer'; 

const User = ({ navigation }) => {
  const user = {
    name: 'John Doe',
    phone: '123-456-7890',
    avatar: 'https://randomuser.me/api/portraits/women/96.jpg', 
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon name="settings" size={40} color="#000000" />
      </TouchableOpacity>
      <View style={styles.avatarContainer}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'space-between', 
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dcdcdc',
  },
  infoContainer: {
    alignItems: 'center',
    flex:2,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    color: '#1E90FF',
  },
});

export default User;
