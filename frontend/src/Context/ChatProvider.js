import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const ChatContext = createContext();
export default function ChatProvider({ children }) {
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [chats, setChats] = useState();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) {
            navigate('/');
        }
    }, [navigate])
    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}
