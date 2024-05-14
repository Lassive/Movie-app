import { StyleSheet } from "react-native";

export const loginstyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      height: 40,
      width: "100%",
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    error: {
      color: "red",
      marginTop: 10,
    },
  });