import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { getDatabase, ref, onValue, remove, push } from "firebase/database";
import { auth } from './Firebaseconfig';
import { styles } from './styles/StyleSheetList';

const List = () => {
  const [userMovieData, setUserMovieData] = useState(null);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  
  //näyttää kirjautuneen käyttäjän katselulistan hakemalla sen databasesta käyttäjäkohtaisesti
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        const userId = user.uid;
        const db = getDatabase();
        const userMoviesRef = ref(db, `users/${userId}/movies`);

        onValue(userMoviesRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserMovieData(snapshot.val());
          } else {
            console.log("No movie data available for the user");
          }
        });
      } else {
        setLoggedIn(false); //resetoi elokuvadatan kun käyttäjä kirjautuu ulos
        setUserMovieData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userMovieData) {
      const initialRatings = {};
      Object.keys(userMovieData).forEach(movieId => {
        initialRatings[movieId] = 0; //asettaa elokuvan arvostelun 0:ksi defaulttina
      });
      setRatings(initialRatings);
    }
  }, [userMovieData]);

  //elokuvien poiston käsittely
  const deleteMovie = (movieId) => {
    const userId = auth.currentUser.uid;
    const db = getDatabase();
    const movieRef = ref(db, `users/${userId}/movies/${movieId}`);

    remove(movieRef)
      .then(() => {
        console.log('Movie deleted successfully');
        setUserMovieData((prevData) => {
          const newData = { ...prevData };
          delete newData[movieId];
          return newData;
        });
      })
      .catch((error) => {
        console.error('Error deleting movie:', error);
      });
  };

  //arvosteluiden lisäyksen käsittely
  const submitRating = (movieId, rating, comment) => {
    const userId = auth.currentUser.uid;
    const db = getDatabase();
    const ratingRef = ref(db, `users/${userId}/movies/${movieId}/ratings`);

    push(ratingRef, {
      rating: rating,
      comment: comment
    })
    .then(() => {
      console.log('Rating submitted successfully');
    })
    .catch((error) => {
      console.error('Error submitting rating:', error);
    });
  };

  //arvostelun muutosten käsittely
  const handleRatingChange = (movieId, rating) => {
    setRatings({ ...ratings, [movieId]: rating });
  };

  //kommentin muutoksen käsittely
  const handleCommentChange = (movieId, comment) => {
    setComments({ ...comments, [movieId]: comment });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Your List</Text>
        {!loggedIn && (
          <Text style={styles.notLoggedIn}>Please log in to see your list</Text>
        )}
        {loggedIn && userMovieData && (
          <View style={styles.movieList}>
            {Object.keys(userMovieData).map((movieId) => (
              <View key={movieId} style={styles.movieContainer}>
                <View style={styles.movieInfo}>
                  <Text style={styles.movieTitle}>{userMovieData[movieId].title}</Text>
                  <Image
                    style={styles.image}
                    source={{ uri: userMovieData[movieId].imageUrl }}
                  />
                  
                  {userMovieData[movieId].ratings ? (
                    <View>
                      <Text style={styles.label}>Your Rating:</Text>
                      {Object.keys(userMovieData[movieId].ratings).map((ratingId) => (
                        <View key={ratingId}>
                          <Text style={styles.value}>Rating: {userMovieData[movieId].ratings[ratingId].rating} stars</Text>
                          <Text style={styles.value}>Comment: {userMovieData[movieId].ratings[ratingId].comment}</Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View>
                      <View style={styles.ratingContainer}>
                        <Text style={styles.label}>Rate this movie:</Text>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <TouchableOpacity
                            key={value}
                            onPress={() => handleRatingChange(movieId, value)}
                          >
                            <Text style={[styles.ratingStar, ratings[movieId] >= value && styles.selectedRating]}>★</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                      <TextInput
                        style={styles.commentInput}
                        placeholder="Leave a comment..."
                        onChangeText={(text) => handleCommentChange(movieId, text)}
                      />
                      <TouchableOpacity
                        onPress={() => submitRating(movieId, ratings[movieId], comments[movieId])}
                        style={styles.submitButton}
                      >
                        <Text style={styles.submitButtonText}>Submit Rating</Text>
                        
                      </TouchableOpacity>
                      
                    </View>
                    
                  )}
                  <TouchableOpacity onPress={() => deleteMovie(movieId)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                </View>
                
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default List;
