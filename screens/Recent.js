import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';

const Recent = ({ navigation }) => {
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    const fetchRecentContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem('recentContacts');
        const contacts = storedContacts ? JSON.parse(storedContacts) : [];
        const uniqueContacts = contacts.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.id === item.id
          ))
        );

        setRecentContacts(uniqueContacts);
      } catch (error) {
        console.error('Error fetching recent contacts:', error);
      }
    };

    fetchRecentContacts();
  }, []);

  const handlePress = (profile) => {
    navigation.navigate('ProfileDetail', { profile });
  };

  const handleLongPress = (profileId) => {
    Alert.alert(
      'Xóa khỏi danh sách',
      '',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => deleteContact(profileId),
        },
      ]
    );
  };

  const deleteContact = async (profileId) => {
    try {
      const storedContacts = await AsyncStorage.getItem('recentContacts');
      let contacts = storedContacts ? JSON.parse(storedContacts) : [];
      contacts = contacts.filter(contact => contact.id !== profileId);
      await AsyncStorage.setItem('recentContacts', JSON.stringify(contacts));
      setRecentContacts(contacts);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recentContacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            onLongPress={() => handleLongPress(item.id)} 
            style={styles.itemContainer}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  list: {
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Recent;
