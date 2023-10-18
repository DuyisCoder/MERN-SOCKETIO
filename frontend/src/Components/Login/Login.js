
import { useToast, FormControl, FormLabel, Input, InputGroup, VStack, Button, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const handleShowPass = () => setShow(!show);
    const [loading, setLoading] = useState(false);

    const history = useNavigate();
    const postDetail = (pics) => {

    }
    const toast = useToast();
    const handleSubmit = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.post(
                "http://localhost:8080/api/user/login",
                {
                    email,
                    password,
                },
                config
            );

            if (response.data) {
                console.log("data", response.data);
            } else {
                console.log("not data");
            }
            toast({
                title: "Đăng nhập thành công!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            setLoading(false);
            history('/chats')
        } catch (error) {
            if (error.response && error.response.data) {
                toast({
                    title: "Đăng nhập thất bại!",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
            setLoading(false);
        }
    }

    return (
        <VStack spacing={'5px'} color={'white'}>

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input placeholder='Enter your password'
                        type={show ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width={'4.5rem'}>
                        <Button h="1.75rem" size="sm" onClick={handleShowPass}>
                            {show ? "hide" : "show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button isLoading={loading} bgColor={"#bde3f8"} width={"100%"} marginTop={"15px"} onClick={handleSubmit}>Submit</Button>
            <Button
                variant={'solid'}
                colorScheme='red'
                width={'100%'}
                onClick={() => {
                    setEmail("guest@example.com")
                    setPassword("123456")
                }}

            >Get Guest User Credentials</Button>
        </VStack >
    )
}
