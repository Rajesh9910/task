"use client"
import { socketServer } from '@/lib/helpers';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { io } from 'socket.io-client';

const initialState = {
    tasks: [],
    usersState: [],
    messageState: []
};


const reducer = (state, action) => {
    switch (action.type) {
        case 'Update_Tasks':
            return { ...state, tasks: action.payload };
        case "Add_User":
            const existingUserIndex = state.usersState.findIndex(user => user._id === action.payload._id);
            if (existingUserIndex !== -1) {
                const updatedUsersState = [...state.usersState];
                updatedUsersState[existingUserIndex] = action.payload;
                return { ...state, usersState: updatedUsersState };
            } else {
                return { ...state, usersState: [...state.usersState, action.payload] };
            }
        case "Add_Message":
            const existingMessageIndex = state.messageState.findIndex(message => message.id === action.payload.id);
            if (existingMessageIndex !== -1) {
                const updatedMessageState = [...state.messageState];
                updatedMessageState[existingMessageIndex] = action.payload;
                return { ...state, messageState: updatedMessageState };
            } else {
                return { ...state, messageState: [...state.messageState, action.payload] };
            }
        default:
            return state;
    }
};


const StoreContext = createContext();

let socket = null;

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        socket = io(socketServer)
        return () => {
            if (socket) {
                socket.disconnect()
            }
        }
    }, [])

    return (
        <StoreContext.Provider value={{ state, dispatch, socket }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
