import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Background color changed
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Text color changed
  },
  movieList: {
    alignItems: 'center',
  },
  movieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#EDEDED', // Background color changed
    borderRadius: 15, // Increased border radius
    padding: 20, // Increased padding
    width: '100%',
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 25, // Increased font size
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Text color changed

  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 10,
    borderRadius: 20,
    resizeMode: 'contain',
    marginLeft: 75
  },
  label: {
    fontSize: 15, // Increased font size
    fontWeight: 'bold',
    marginRight: 5,
    color: '#555', // Text color changed
  },
  value: {
    fontSize: 16, // Increased font size
    marginBottom: 5,
    color: '#777', // Text color changed
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingStar: {
    fontSize: 30,
    color: 'black', // Star color changed to gold
    marginRight: 5,
    marginBottom: 7,
  },
  selectedRating: {
    color: '#FFD700', // Star color changed to gold
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10, // Increased border radius
    paddingHorizontal: 15, // Increased horizontal padding
    marginBottom: 5, // Increased margin bottom
    width: '100%',
    height: 40, // Increased height
    fontSize: 15, // Increased font size
    color: '#333', // Text color changed
  },
  submitButton: {
    backgroundColor: 'green', // Button color changed to red
    paddingVertical: 12, // Increased padding
    paddingHorizontal: 20, // Increased padding
    borderRadius: 10, // Increased border radius
    alignItems: 'center',
    marginTop: 10, // Increased margin top
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18, // Increased font size
  },
  deleteButton: {
    backgroundColor: '#E74C3C', // Button color changed to red
    paddingVertical: 12, // Increased padding
    paddingHorizontal: 20, // Increased padding
    borderRadius: 10, // Increased border radius
    alignItems: 'center',
    marginTop: 10, // Increased margin top
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18, // Increased font size
  },
  notLoggedIn: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center', // Centered text
    color: '#555', // Text color changed
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  movieItemContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 200,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
