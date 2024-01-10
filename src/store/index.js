import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./authentication";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}
const reducer = combineReducers({
  auth,
});


const persistedReducer = persistReducer(persistConfig, reducer)



const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store)


export {store,persistor}