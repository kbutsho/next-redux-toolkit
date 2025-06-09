"use client"

import { Provider } from "react-redux";
import { persistor, store } from "../store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from "react";

const ReduxProvider = ({ children }) => {
    useEffect(() => {
        persistor.purge();
    }, [])
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default ReduxProvider;