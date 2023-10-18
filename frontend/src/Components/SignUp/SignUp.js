import { useToast, FormControl, FormLabel, Input, InputGroup, VStack, Button, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router";
export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false);
    const [pic, setPic] = useState('');
    const [loading, setLoading] = useState('');
    const [picLoading, setPicLoading] = useState(false);
    const toast = useToast();
    const history = useNavigate();
    const handleShowPass = () => setShow(!show);
    const postDetail = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            return;
        }
        if (pics.type === "image/png" || pics.type === "image/jpeg") {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', "chat-app");
            data.append('cloud_name', "dxtz2g7ga");

            axios.post('https://api.cloudinary.com/v1_1/dxtz2g7ga/image/upload', data)
                .then(res => res.data)
                // .then((res) => res.json())
                .then(data => {
                    setPic(data.url.toString());
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false)
                })
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            return;
        }
    }
    const handleSubmit = async () => {
        setPicLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.post(
                "http://localhost:8080/api/user/register",
                {
                    name,
                    email,
                    password,
                    pic,
                },
                config
            );

            if (response.data) {
                console.log("data", response.data);
            } else {
                console.log("not data");
            }
            toast({
                title: "Đăng ký thành công!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            setPicLoading(false);
            history.push("/chats");
        } catch (error) {
            if (error.response && error.response.data) {
                toast({
                    title: "Đăng ký thất bại",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
            setPicLoading(false);
        }
    }

    return (
        <VStack spacing={'5px'} color={'white'}>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Enter your name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input placeholder='Enter your password'
                        type={show ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width={'4.5rem'}>
                        <Button h="1.75rem" size="sm" onClick={handleShowPass}>
                            {show ? "hide" : "show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input placeholder='Enter password'
                        type={show ? 'text' : 'password'}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width={'4.5rem'}>
                        <Button h="1.75rem" size="sm" onClick={handleShowPass}>
                            {show ? "hide" : "show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic' isRequired>
                <FormLabel>Upload Picture</FormLabel>
                <Input type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetail(e.target.files[0])}
                />
            </FormControl>
            <Button isLoading={loading} bgColor={"#bde3f8"} width={"100%"} marginTop={"15px"} onClick={handleSubmit}>Submit</Button>

        </VStack>
    )
}
