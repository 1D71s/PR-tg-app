import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Замените на ваш корневой reducer

const store = configureStore({
    reducer: rootReducer,
});

export default store;
