"use client"
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    tasks: [],
};


const reducer = (state, action) => {
    switch (action.type) {
        case 'Update_Tasks':
            return { ...state, tasks: action.payload };
        default:
            return state;
    }
};


const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
