import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchContacts } from '../utility/api';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Hoặc '@expo/vector-icons'
import Footer from './Footer';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const getContacts = async () => {
            const data = await fetchContacts();
            setContacts(data);
            setLoading(false);
        };
        getContacts();
    }, []);

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    const handlePress = (profile) => {
        navigation.navigate('ProfileDetail', { profile });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
            {item.avatar ? (
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
            ) : (
                <View style={styles.avatar} />
            )}
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
            {/* <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Recent')}>
                    <Icon name="history" size={24} color="#3498DB" />
                    <Text style={styles.footerText}>Recent</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Favorites')}>
                    <Icon name="star" size={24} color="#f39c12" />
                    <Text style={styles.footerText}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('User')}>
                    <Icon name="person" size={24} color="#f39c12" />
                    <Text style={styles.footerText}>User</Text>
                </TouchableOpacity>
            </View> */}
             <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#dcdcdc',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    phone: {
        fontSize: 14,
        color: '#888888',
    },
    list: {
        paddingBottom: 20,
    },
    // footerContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     paddingVertical: 24,
    //     borderTopWidth: 1,
    //     borderTopColor: '#ddd',
    //     backgroundColor: '#fff',
    // },
    // footerItem: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // footerText: {
    //     fontSize: 16,
    //     marginLeft: 8,
    // },
});

export default ContactList;
