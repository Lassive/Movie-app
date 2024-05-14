import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { ref, push } from "firebase/database";
import { database, auth } from './Firebaseconfig'; // Import auth from Firebaseconfig
import { searchstyles } from './styles/StyleSheetSearch';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //käsittelee elokuvien haun imdb api:sta
  const handleSearch = async () => {
    setIsLoading(true);
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${encodeURIComponent(searchText)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'dbe4db7004msh595639b62467a8cp110216jsn81a832889cf3',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const result = await response.json();
        setMovieData(result);
        setError(null);
      } else {
        throw new Error('Network error');
      }
    } catch (error) {
      setError(error.message);
      setMovieData(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  //käsittelee elokuvan lisäämisen kirjautuneen käyttäjän watchlistiin
  const handleAddMovie = async (movie) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        //tiedot, jotka elokuvasta lisätään
        const movieToAdd = {
          title: movie.l,
          imageUrl: movie.i && movie.i.imageUrl ? movie.i.imageUrl : null,
        };
        //päivittää elokuvadatan tietokantaan
        await push(ref(database, `users/${currentUser.uid}/movies`), movieToAdd);
        setMovieData(prevData => {
          const updatedData = { ...prevData };
          updatedData.d = updatedData.d.map((m, index) => {
            if (m === movie) {
              m.successMessage = 'Movie added successfully!';
            }
            return m;
          });
          return updatedData;
        });
      } else {
        console.log('No user logged in');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={searchstyles.container}>
      <Text style={searchstyles.title}>Search for a Title</Text>
      <TextInput
        style={searchstyles.input}
        placeholder="Enter a title..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={searchstyles.button} onPress={handleSearch}>
        <Text style={searchstyles.buttonText}>Search</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#007bff" />}

      {error && <Text style={searchstyles.error}>{error}</Text>}
      
      {movieData && (
        <View style={searchstyles.movieContainer}> 
          <Text style={searchstyles.title}>Results for: {searchText}</Text>
          {movieData.d.map((movie, index) => (
            <View key={index} style={searchstyles.movieItemContainer}>
              {movie.i && movie.i.imageUrl ? (
                <Image
                  style={searchstyles.poster}
                  source={{ uri: movie.i.imageUrl }}
                />
              ) : (
                <Text style={searchstyles.error}>No Poster Available</Text>
              )}
              <Text style={searchstyles.movieTitle}>{movie.l}</Text>
              <TouchableOpacity style={searchstyles.addButton} onPress={() => handleAddMovie(movie)}>
                <Text style={searchstyles.addButtonText}>Add to your list!</Text>
              </TouchableOpacity>
              {movie.successMessage && <Text>{movie.successMessage}</Text>}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Search;
