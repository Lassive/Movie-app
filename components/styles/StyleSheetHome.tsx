import { StyleSheet } from 'react-native';

export const HomeStyles = StyleSheet.create({
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
    errorText: {
      color: 'red',
      marginTop: 10,
    },
  });