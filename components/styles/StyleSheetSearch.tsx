import { StyleSheet } from 'react-native';

export const searchstyles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F4F4F4',
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
    },
    input: {
      width: '80%',
      height: 50,
      borderWidth: 2,
      borderColor: '#999',
      paddingHorizontal: 20,
      marginBottom: 20,
      borderRadius: 10,
      fontSize: 18,
      color: '#333',
    },
    button: {
      backgroundColor: '#007bff',
      paddingHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 10,
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    error: {
      color: 'red',
      marginTop: 10,
      fontSize: 16,
    },
    movieContainer: {
      marginTop: 20,
    },
    movieTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    movieItemContainer: {
      marginBottom: 20,
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: "#EDEDED",
      padding: 15
    },
    poster: {
      width: 150,
      height: 200,
      marginBottom: 10,
      borderRadius: 10,
    },
    addButton: {
      backgroundColor: '#28a745',
      paddingHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 10,
      marginTop: 10,
    },
    addButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });