import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChatState } from '../../Context/ChatProvider'
import SideDrawer from './SideDrawer';
import MyChat from './MyChat';
import ChatBox from './ChatBox';
import { Box } from '@chakra-ui/react';
export default function ChatsPage() {

    const { user } = ChatState();
    const [chats, setChats] = useState([])


    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box>
                {user && <MyChat />}
                {user && <ChatBox />}
            </Box>
        </div>
    )
}
