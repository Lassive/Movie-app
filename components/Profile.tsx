import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, getUserProfile } from './Firebaseconfig';

const Profile = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [user, setUser] = useState(null);

  // Function to fetch user profile information from Firebase
  const fetchUserProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userProfile = await getUserProfile(currentUser.uid);
        setUser(userProfile);
      } else {
        // If there is no user logged in, set user state to null
        setUser(null);
      }
    } catch (error) {
      console.log('Error fetching user profile:', error);
      // Handle error gracefully, e.g., setUser(null) or display an error message
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount

    // Subscribe to changes in authentication state
    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchUserProfile(); // Call fetchUserProfile when authentication state changes
    });

    return () => unsubscribe(); // Clean up subscription on component unmount
  }, []);

  // Function to navigate to List tab
  const goToMovieList = () => {
    navigation.navigate('List'); // Navigate to List tab
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please log in to see your profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.value}>{user.bio}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={goToMovieList}>
        <Text style={styles.buttonText}>Go to your list!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileInfo: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
