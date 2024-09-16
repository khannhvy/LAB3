import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactList from './screens/ContactList';
import Recent from './screens/Recent';
import Favorite from './screens/Favorite';
import ProfileDetail from './screens/ProfileDetail'; 
import Call from './screens/Call';
import Toast from 'react-native-toast-message';
import User from './screens/User';
import Settings from './screens/Settings';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ContactList"
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate('ContactList')}
            >
              <Icon name="home" size={30} color="#000" />
            </TouchableOpacity>
          ),
          headerShown: true, // Hiển thị tiêu đề nếu cần
        })}
      >
        <Stack.Screen name="ContactList" component={ContactList} />
        <Stack.Screen name="Recent" component={Recent} />
        <Stack.Screen name="Favorites" component={Favorite} />
        <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
        <Stack.Screen name="Call" component={Call} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Settings" component={Settings} /> 
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
