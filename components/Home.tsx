import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { auth } from './Firebaseconfig';
import SignUp from './Register';
import SignIn from './Login';
import { signUp } from './Firebaseconfig';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async (email, password, userData) => {
    try {
      // Sign up the user
      await signUp(email, password, userData);

      // Get the current user after signing up
      const currentUser = auth.currentUser;

      // Update state to reflect user login
      setUser(currentUser);
    } catch (error) {
      console.log('Error signing up user:', error);
      // Handle error gracefully
    }
  };
  
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // User logged out successfully
        setUser(null); // Clear user state
      })
      .catch((error) => {
        console.log('Error signing out:', error);
        // Handle sign-out error gracefully
      });
  };
  

  return (
  <ScrollView>
    <View style={styles.container}>
      {user ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>You are logged in as:</Text>
          <Text>{user.email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text><SignIn /></Text>
          <Text style={styles.text}>Or...</Text>
          <Text><SignUp onSignUp={handleSignUp} /></Text>
        </>
        
      )}
    </View>
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  userInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;
