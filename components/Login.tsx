import React, { useState } from "react";
import { signInWithEmailAndPassword, Auth } from "firebase/auth";
import { auth } from "./Firebaseconfig";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { loginstyles } from "./styles/StyleSheetLogin";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  //käsittelee kirjautumisen spostilla ja salasanalla
  const signIn = () => {
    signInWithEmailAndPassword(auth as Auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <View style={loginstyles.container}>
      <Text style={loginstyles.title}>Log In to your Account</Text>
      <TextInput
        style={loginstyles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={loginstyles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button onPress={signIn} title="Log In" />
      {error ? <Text style={loginstyles.error}>{error}</Text> : null}
    </View>
  );
};



export default SignIn;
