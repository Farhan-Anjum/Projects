import { configureStore } from '@reduxjs/toolkit';

// Reducer functions (you can define them in separate files and import them)
const userReducer = (state = {}, action) => {
  // Reducer logic goes here
  return state;
};

const postsReducer = (state = [], action) => {
  // Reducer logic goes here
  return state;
};

const store = configureStore({
  reducer: {
    // Define your reducers as key-value pairs
    user: userReducer,
    posts: postsReducer,
    // Add more reducers as needed
  }
});

export default store;
