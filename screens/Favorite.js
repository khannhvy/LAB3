import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';

const Favorite = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const { width } = Dimensions.get('window');
  const numColumns = 3; 

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem('favorites');
        const storedFavorites = favoritesString ? JSON.parse(favoritesString) : [];

        const uniqueFavorites = storedFavorites.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.id === item.id
          ))
        );

        setFavorites(uniqueFavorites);
      } catch (error) {
        console.error('Error fetching favorites', error);
      }
    };

    fetchFavorites();
  }, []);

  const handlePress = (profile) => {
    navigation.navigate('ProfileDetail', { profile });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          </TouchableOpacity>
        )}
        numColumns={numColumns}
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

export default Favorite;
