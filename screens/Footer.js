import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Recent')}>
                <Icon name="history" size={30} color="#3498DB" />
                <Text style={styles.footerText}>Recent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Favorites')}>
                <Icon name="star" size={30} color="#f39c12" />
                <Text style={styles.footerText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('User')}>
                <Icon name="person" size={30} color="#f39c12" />
                <Text style={styles.footerText}>User</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        height: 70, 
    },
    footerItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 17, 
        marginTop: 4,
    },
});

export default Footer;
