import { StyleSheet } from "react-native";


export const profilestyles = StyleSheet.create({
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
  