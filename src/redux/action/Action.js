// Actions
export const LOGIN = 'LOGIN';
export const SAVE = 'SAVE';

// Action Creator
export const login = data => ({
    type:LOGIN,
    payload:data,
})

export const saveData = data => ({
    type:SAVE,
    payload:data
})