import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

const Call = ({ route, navigation }) => {
  const { profile } = route.params;
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEndCall = async () => {
    const callTime = formatTime(seconds);

    Toast.show({
      type: 'success',
      position: 'top',
      text1: `Cuộc gọi đã kết thúc sau ${callTime}`,
      visibilityTime: 3000,
    });

    try {
      const storedContacts = await AsyncStorage.getItem('recentContacts');
      const recentContacts = storedContacts ? JSON.parse(storedContacts) : [];

      const updatedContacts = [...recentContacts, { ...profile, callTime }];

      await AsyncStorage.setItem('recentContacts', JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Error saving recent contact:', error);
    }

    navigation.goBack();
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {profile.avatar ? (
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />
        )}
      </View>
      <Text style={styles.header}>Calling {profile.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Phone: {profile.phone}</Text>
        <Text style={styles.infoText}>Thời gian gọi: {formatTime(seconds)}</Text>
      </View>
      <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
        <Icon name="call-end" size={30} color="#ffffff" />
        <Text style={styles.endCallText}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498DB',
  },
  avatarContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dcdcdc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#ffffff',
  },
  endCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
  },
  endCallText: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 18,
  },
});

export default Call;
