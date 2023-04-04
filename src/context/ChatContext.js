import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from "../firebase/firebase";
import {AuthContext} from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext);
    const STATE = {
        user: {},
        chatId: "null"
    }

    const chatReducer = (state, action) => {
        switch (action.type){
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, STATE);

    return (
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
}
