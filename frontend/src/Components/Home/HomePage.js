import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Homepage() {

    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            navigate('/chats');
        }
    }, [navigate])

    return (
        <Container maxW="xl" centerContent>
            <Box
                display="flex"
                justifyContent="center"
                p={3}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="Work sans">
                    Chat App
                </Text>
            </Box>
            <Box bg="#ccc" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Tabs isFitted variant="unstyled">
                    <TabList mb="1em">
                        <Tab _selected={{ borderRadius: "10px", color: 'white', bg: 'black' }} >Login</Tab>
                        <Tab _selected={{ borderRadius: "10px", color: 'black', bg: 'white' }}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
}

export default Homepage;