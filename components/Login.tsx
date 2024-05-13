import React, { useState } from "react";
import { signInWithEmailAndPassword, Auth } from "firebase/auth";
import { auth } from "./Firebaseconfig";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const signIn = () => {
    signInWithEmailAndPassword(auth as Auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message); // Update error state to display in the app
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In to your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button onPress={signIn} title="Log In" />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SignIn;
