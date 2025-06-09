// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../features/counterSlice"

// export const store = configureStore({
//     reducer: {
//         counter: counterReducer
//     }
// })


import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import cartReducer from '../features/cartSlice';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    counter: counterReducer,
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
