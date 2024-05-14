import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, getUserProfile } from './Firebaseconfig';
import { profilestyles } from './styles/StyleSheetProfile';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  //tarkistaa, kuka käyttäjä on sisäänkirjautunut
  const fetchUserProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userProfile = await getUserProfile(currentUser.uid);
        setUser(userProfile);
      } else {
        //jos kukaan ei ole kirjautunut, niin user arvo on null
        setUser(null);
      }
    } catch (error) {
      console.log('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchUserProfile();
    });
    return () => unsubscribe();
  }, []);

  //navigointi listaan
  const goToMovieList = () => {
    navigation.navigate('List');
  };

  //jos käyttäjää ei löydy, niin profiilia ei voi näyttää
  if (!user) {
    return (
      <View style={profilestyles.container}>
        <Text>Please log in to see your profile.</Text>
      </View>
    );
  }

  return (
    <View style={profilestyles.container}>
      <Text style={profilestyles.title}>Profile</Text>
      <View style={profilestyles.profileInfo}>
        <Text style={profilestyles.label}>Name:</Text>
        <Text style={profilestyles.value}>{user.name}</Text>
        <Text style={profilestyles.label}>Bio:</Text>
        <Text style={profilestyles.value}>{user.bio}</Text>
      </View>

      <TouchableOpacity style={profilestyles.button} onPress={goToMovieList}>
        <Text style={profilestyles.buttonText}>Go to your list!</Text>
      </TouchableOpacity>
    </View>
  );
}


export default Profile;
