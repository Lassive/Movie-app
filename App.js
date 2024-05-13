import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "./components/Home";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Firebaseconfig from "./components/Firebaseconfig";
import List from './components/List';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            }
            else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search';
            }
            else if (route.name === 'List') {
              iconName = focused ? 'albums-outline' : 'albums-outline';
            }
            else if (route.name === 'Profile') {
              iconName = focused ? 'person-outline' : 'person-outline';
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="List" component={List} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
