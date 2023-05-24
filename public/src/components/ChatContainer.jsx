import React, { useRef } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import Logout from './Logout';
import Calls from './Calls'
import Messages from './Messages';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import {BsCameraVideo} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom';
import AudioCall from './AudioCalls';
import { v4 as uuid } from 'uuid';
export default function ChatContainer({currentChat,currentUser,socket}) {

    const [messages,setMessages] = useState([]);
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const navigate = useNavigate();

    const scrollRef = useRef();
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)

    useEffect(()=>
    {
        async function fun()
        {
            if(currentChat)
            {
            const response = await axios.post(getAllMessagesRoute,{
                from: currentUser._id,
                to: currentChat._id,
            });

            setMessages(response.data);
        }
        }
        fun();
        
    },[currentChat])
    const handleSendMsg = async (msg) =>
    {
        await axios.post(sendMessageRoute,{
            from: currentUser._id,
            to:currentChat._id,
            message: msg,
        });
        socket.current.emit("send-msg",
        {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({fromSelf:true,message:msg});
        setMessages(msgs);
    };

    useEffect(()=>
    {
        if(socket.current)
        {
            socket.current.on("msg-recieve",(msg)=>
            {
                setArrivalMessage({fromSelf: false,message: msg});
            });
        }
    },[]);

    useEffect(()=>
    {
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage]);

    useEffect(()=>
    {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    },[messages]);


   function video()
   {
      navigate("/call");
   }
   useEffect(()=>
   {
   const userdata = {
     meetingid: small_id,
     count: 1
   }
   
   const items = JSON.parse(localStorage.getItem('data'));
   console.log("checking",items);
   if(!items)
   {
    localStorage.setItem('data', JSON.stringify(userdata));
    console.log("chats",small_id);
   }
 },[currentChat]);
  return (
    <>
    {
        currentChat && (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                <img src=
                    {`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt="avatar" />
                </div>
                <div className="username">
                    <h3>
                        {currentChat.username}
                    </h3>
                </div>
            </div>
            <Logout />
            {/* <BsCameraVideo onClick={video} className = 'vid-icon'/> */}
            <Calls
            user = {currentUser}/>
            <AudioCall/>
        </div>
        <div className="chat-messages">
            {
                messages.map((message)=>
                {
                    return (
                        <div ref={scrollRef} key= {uuidv4()}>
                            <div className={`message ${message.fromSelf ? "sended": "recieved"}`}>
                                <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>    
                    )
                })
            }
        </div>
        <ChatInput handleSendMsg = {handleSendMsg}/>
    </Container>
  )}
  </>
  );
}

const Container = styled.div`
padding-top: 1rem;
display:grid ;
grid-template-rows: 10% 78% 12%;
gap: 0.1rem;
overflow:hidden;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .vid-icon {
      width: 2.5rem;
      height: 2.5rem ;
      background-color:#9a86f3 ;
      border:none ;
      border-radius: 0.5rem ;
      cursor: pointer;
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
          grid-auto-rows:15% 70% 15% ;
        }
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }`;