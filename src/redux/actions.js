export const toggleDarkMode=()=>({
    type:'ACTION_TOGGLE',
});

export const setActive=(menu)=>({
    type:'ACTION_SET_ACTIVE',
    payload:menu,
});