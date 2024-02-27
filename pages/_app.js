import '../styles/globals.css';
import Head from 'next/head';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import session from '../reducers/session';

const reducers = combineReducers({ session });

const persistConfig = { key: 'hackatweet', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });

 const persistor = persistStore(store);


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Head>
        <meta charSet="UTF-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Hackatweet</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="social media" />
      </Head>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
