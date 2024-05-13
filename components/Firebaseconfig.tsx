  import { getDatabase } from "firebase/database";
  import { initializeApp } from "firebase/app";
  import { getAuth } from "firebase/auth";
  import { ref, get, child, set } from "firebase/database";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAgTWH51HsyfOYQf8FJq1rxiATf-FijEJI",
    authDomain: "movie-app-4ac62.firebaseapp.com",
    databaseURL: "https://movie-app-4ac62-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "movie-app-4ac62",
    storageBucket: "movie-app-4ac62.appspot.com",
    messagingSenderId: "1030230465491",
    appId: "1:1030230465491:web:5d9650a215b853aceead26"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);
  const getUserProfile = async (userId) => {
    try {
      // Reference to the user node in the database
      const userRef = ref(database, `users/${userId}`);
  
      // Fetch user profile data
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        // If user data exists, return it
        return snapshot.val();
      } else {
        console.log('No profile data found for user');
        return null;
      }
    } catch (error) {
      console.log('Error fetching user profile:', error);
      throw error;
    }
  };
  

  const saveUserProfile = async (userId, userData) => {
    try {
      const userRef = ref(database, `users/${userId}`);
      await set(userRef, userData);
    } catch (error) {
      console.log('Error saving user profile:', error);
      throw error;
    }
  };

  const signUp = async (email, password, userData) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
  
      // Save user profile data to Realtime Database
      await saveUserProfile(userId, userData);
    } catch (error) {
      console.log('Error signing up user:', error);
      throw error;
    }
  };


export { database, app, auth, getUserProfile, saveUserProfile, signUp };








