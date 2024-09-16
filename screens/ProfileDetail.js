import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Footer from './Footer';

const ProfileDetail = ({ route, navigation }) => {
  const { profile } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem('favorites');
        const favorites = favoritesString ? JSON.parse(favoritesString) : [];
        setIsFavorite(favorites.some(item => item.id === profile.id));
      } catch (error) {
        console.error('Error checking favorite status', error);
      }
    };

    checkFavoriteStatus();
  }, [profile.id]);

  const handleToggleFavorite = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];

      if (isFavorite) {
        const updatedFavorites = favorites.filter(item => item.id !== profile.id);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        // Toast.show({
        //   type: 'success',
        //   position: 'top',
        //   text1: 'Đã xóa khỏi danh sách yêu thích',
        //   visibilityTime: 2000, 
        // });
      } else {
        favorites.push(profile);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        // Toast.show({
        //   type: 'success',
        //   position: 'top',
        //   text1: 'Đã thêm vào  danh sách yêu thích',
        //   visibilityTime: 2000, 
        // });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite status', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        {profile.avatar ? (
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />
        )}
          <Text style={styles.name}>{profile.name}</Text>
        
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.contactContainer}>
          <Icon name="phone-android" size={20} color="#555555" />
          <Text style={styles.contactText}>{profile.cell}</Text>
        </View>
        <View style={styles.contactContainer}>
          <Icon name="phone" size={20} color="#555555" />
          <Text style={styles.contactText}>{profile.phone}</Text>
        </View>
        <View style={styles.contactContainer}>
          <Icon name="email" size={20} color="#555555" />
          <Text style={styles.contactText}>{profile.email}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Call', { profile })}>
            <Icon name="call" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(`mailto:${profile.email}`)}>
            <Icon name="email" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite}>
            <View style={[
              { borderColor: isFavorite ? "#FFD700" : "#cccccc" }
            ]}>
              <Icon 
                name={isFavorite ? "star" : "star-border"} 
                size={30} 
                color={isFavorite ? "#FFD700" : "#000000"} 
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 4,
    backgroundColor: '#ffffff',
    
  },
  avatarContainer: {
    flexGrow: 2,
    alignItems: 'center',
    backgroundColor: '#63B8FF',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    paddingTop:80,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dcdcdc',
  },
  infoContainer: {
    flexGrow:3,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    elevation: 1,
    marginVertical: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  contactText: {
    fontSize: 18,
    color: '#555555',
    marginLeft: 10,
    textAlign: 'left',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 16,
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default ProfileDetail;
