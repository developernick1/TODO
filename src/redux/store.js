import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const Store = configureStore({
    reducer: rootReducer,
})

export default Store;



// import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';
// import { name as appName } from '../../app.json';
// import reducers from './reducers';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const persistConfig = {
//     key: `${appName}-storage`,
//     storage: AsyncStorage,
//     whitelist: ["userDetails"]
// }

// const persist = persistReducer(persistConfig, reducers)
// // const crateStoreWithMIddleware = applyMiddleware(thunk)(configureStore);

// export const Store = configureStore(persist);
// export const persistor = persistStore(Store)

