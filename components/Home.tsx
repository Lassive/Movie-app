import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { auth } from './Firebaseconfig';
import SignUp from './Register';
import SignIn from './Login';
import { signUp } from './Firebaseconfig';
import { HomeStyles } from './styles/StyleSheetHome';

const Home = () => {
  const [user, setUser] = useState(null);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async (email, password, userData) => {
    try {
      await signUp(email, password, userData);
      const currentUser = auth.currentUser;
      setUser(currentUser);
    } catch (error) {
      console.log('Error signing up user:', error);
      setPasswordError(error.message);
    } 
  };
  
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log('Error signing out:', error);
      });
  };

  return (
    <ScrollView>
      <View style={HomeStyles.container}>
        {user ? (
          <View style={HomeStyles.userInfoContainer}>
            <Text style={HomeStyles.userInfoText}>You are logged in as:</Text>
            <Text>{user.email}</Text>
            <TouchableOpacity style={HomeStyles.logoutButton} onPress={handleLogout}>
              <Text style={HomeStyles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <SignIn />
            <Text style={HomeStyles.text}>Or...</Text>
            <SignUp onSignUp={handleSignUp} />
            {passwordError ? (
              <Text style={HomeStyles.errorText}>{passwordError}</Text>
            ) : null}
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default Home;
