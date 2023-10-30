import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function ChatsPage() {
    const [chats, setChats] = useState([])
    const fetchChat = async () => {
        const data = await axios.get('http://localhost:8080/api/chats');
        setChats(data.data);
    }
    useEffect(() => {
        fetchChat();
        console.log(user);
    }, [])

    return (
        <div>
            {chats.map((item) => {
                <h1>{item.chatName}</h1>
            })}
        </div>
    )
}
