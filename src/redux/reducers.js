import {combineReducers} from 'redux';

const initialNightModeState={
    isDark:false,
    mode:'light'
};

const nightModeReducer=(state=initialNightModeState,action)=>{
    switch(action.type){
        case 'ACTION_TOGGLE':
            return {
                mode:!state.isDark,
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


export default rootReducer=combineReducers({
    nightMode:nightModeReducer,
    activeMenu:activeMenuReducer,
});