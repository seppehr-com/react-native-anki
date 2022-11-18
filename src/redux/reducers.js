import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer } from 'redux-persist';

const initialNightModeState={
    isDark:false,
    mode:'light'
};

const nightModeReducer=(state=initialNightModeState,action)=>{
    switch(action.type){
        case 'ACTION_TOGGLE':
            return {
                isDark:!state.isDark,
                mode:!state.isDark?'dark':'light'
            };
        default:
            return state;
    }
}

const activeMenuReducer=(state='Decks',action)=>{
    switch(action.type){
        case 'ACTION_SET_ACTIVE':
            return action.payload;
        default:
            return state;
    }
}


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['bookmarks']
};

const rootReducer=combineReducers({
    nightMode:nightModeReducer,
    activeMenu:activeMenuReducer,
});
export default persistedReducer =persistReducer(persistConfig,rootReducer);