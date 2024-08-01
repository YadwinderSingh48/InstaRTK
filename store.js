import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postsReducer from './features/postsSlice'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key:'root',
    storage: AsyncStorage,
    version:1
}

const rootReducer = combineReducers({
    posts:postsReducer,
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

export const persistor = persistStore(store);