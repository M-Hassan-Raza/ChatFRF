import React, { useState, useEffect } from 'react';
import loader from '../assets/loader.gif';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Position } from 'monaco-editor';
import styled from 'styled-components';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;

.loader {
max-inline-size: 100%;
}

.title-container {
h1 {
color: white;
}
}

.avatars {
display: flex;
gap: 2rem;

css
Copy code
.avatar {
  border: 0.4rem solid transparent;
  padding: 0.4rem;
  border-radius: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;

  img {
    height: 6rem;
    transition: 0.5s ease-in-out;
  }
}

.selected {
  border: 0.4rem solid #4e0eff;
}
}

.submit-btn {
background-color: #4e0eff;
color: white;
padding: 1rem 2rem;
border: none;
font-weight: bold;
cursor: pointer;
border-radius: 0.4rem;
font-size: 1rem;
text-transform: uppercase;

css
Copy code
&:hover {
  background-color: #4e0eff;
}
}
};

export default function SetAvatar() {
const api = https://api.multiavatar.com/4645646;
const navigate = useNavigate();
const [avatars, setAvatars] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [selectedAvatar, setSelectedAvatar] = useState(undefined);

const toastOptions = {
position: "bottom-right",
autoClose: 8000,
pauseOnHover: true,
draggable: true,
theme: "dark",
};

useEffect(() => {
async function fData() {
if (!localStorage.getItem("chat-app-user")) {
navigate("/login");
}
}

scss
Copy code
fData();
}, []);

const setProfilePicture = async () => {
if (selectedAvatar === undefined) {
toast.error("Please Select an avatar", toastOptions);
} else {
const user = await JSON.parse(localStorage.getItem("chat-app-user"));
const { data } = await axios.post(${setAvatarRoute}/${user._id}, {
image: avatars[selectedAvatar],
});
console.log("wow");
if (data.isSet) {
user.isAvatarImageSet = true;
user.avatarImage = data.image;
localStorage.setItem("chat-app-user", JSON.stringify(user));
navigate("/");
} else {
toast.error("Error Setting Avatar. Please Try Again", toastOptions);
}
}
};

useEffect(() => {
async function fetchData() {
const data = [];
for (let i = 0; i < 4; i++) {
const image = await axios.get(
${api}/${Math.round(Math.random() * 1000)}
);
const buffer = new Buffer(image.data);