import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const mapContact = contact => {
    const {
        name, picture, phone, cell, email,
    } = contact;
    return {
        id: uuidv4(),
        name: `${name.first} ${name.last}`,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() >= 0.5,
    };
};

const fetchContacts = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
        const contactData = await response.json();
        return contactData.results.map(mapContact);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return [];
    }
};

const fetchUserContact = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
        const contactData = await response.json();
        return mapContact(contactData.results[0]);
    } catch (error) {
        console.error("Error fetching user contact:", error);
        return null;
    }
};

const fetchRandomContact = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const contactData = await response.json();
        return mapContact(contactData.results[0]);
    } catch (error) {
        console.error("Error fetching random contact:", error);
        return null;
    }
};

export { fetchContacts, fetchUserContact, fetchRandomContact };
