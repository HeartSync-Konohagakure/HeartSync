import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileFetch } from "../store/appSlice"
import socket from '../socket';
import ListMatches from '../components/ListMatches';
import ListChatUser from '../components/ListChatUser';
import NoSelectedChat from '../components/NoSelectedChat';
import ChatBox from '../components/ChatBox';
import InputEmoji from "react-input-emoji"
const Matches = () => {

  let chatBoxRef = useRef()
  let [matchesData, setMatchesData] = useState([])
  let [loadingMsg, setLoadingMsg] = useState(true)

  let dispatch = useDispatch()
  let { userProfile } = useSelector((state) => state.appReducer)

  let [userChats, setUserChats] = useState([])
  let [currentChatId, setCurrentChatId] = useState(null)
  let [message, setMessage] = useState([])
  let [nameUserOnChat, setNameUserOnChat] = useState(null)
  let [profilePictureUserOnChat, setProfilePictureUserOnChat] = useState(null)
  let [idUserConversation, setIdUserConversation] = useState(null)

  let [isAddtoChatListCalled, setIsAddtoChatListCalled] = useState(false)
  let [matchId, setMatchId] = useState(null)
  let [newTextMessage, setNewTextMessage] = useState('')

  let [idUserOnline, setIdUserOnline] = useState([])

  function formatterDate(dateString) {
    try {
      const parsedDate = new Date(dateString);
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
      return parsedDate.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  }

  async function showMatches() {
    try {
      let { data } = await axios({
        method: 'get',
        url: "http://localhost:3000/users/matches",
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token,
        },
      });
      setMatchesData(data.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      });
    }
  }

  async function findChat() {
    try {
      let { data } = await axios({
        method: 'get',
        url: "http://localhost:3000/chat/find",
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token,
        },
      });
      setUserChats(data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      });
    }
  }

  async function addtoChatList(idUser) {
    try {
      await axios({
        method: 'post',
        url: `http://localhost:3000/chat/${idUser}`,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token,
        },
      })
      setIsAddtoChatListCalled(false)
      setMatchId(idUser)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      });
    }
  }

  async function currentChat(ChatId, nameUser, profilePicture, idUserOnConversation) {
    setCurrentChatId(ChatId)
    setIdUserConversation(idUserOnConversation)
    setNameUserOnChat(nameUser)
    setProfilePictureUserOnChat(profilePicture)
  }

  async function exportMessage(currentChatId) {
    try {
      setLoadingMsg(true)
      let { data } = await axios({
        method: 'get',
        url: `http://localhost:3000/message/${currentChatId}`,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token,
        },
      })
      setMessage(data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      });
    } finally {
      setLoadingMsg(false)
    }
  }

  async function sendMessage() {
    try {
      let newText = await axios({
        method: 'post',
        url: `http://localhost:3000/message`,
        data: {
          ReceiverId: idUserConversation,
          content: newTextMessage,
          ChatId: currentChatId
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token,
        },
      })
      socket.emit("message:new", newText)
      setNewTextMessage('')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      })
    }
  }

  useEffect(() => {
    if (isAddtoChatListCalled === null) {
      addtoChatList(matchId)
      setIsAddtoChatListCalled(true)
    }
  }, [isAddtoChatListCalled])

  useEffect(() => {
    if (currentChatId !== null) {
      exportMessage(currentChatId)
    }
    dispatch(userProfileFetch())
  }, [currentChatId])

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [message])

  useEffect(() => {
    socket.auth = {
      access_token: localStorage.access_token
    }
    socket.connect()

    socket.on("user:online", (userOnline) => {
      setIdUserOnline(userOnline)
    })
    socket.on("message:update", (newText) => {
      setMessage(current => {
        return [...current, newText.data]
      })
    })

    showMatches()
    findChat()

    return () => {
      socket.off("user:online")
      socket.off("message:update")
    }
  }, [matchId]);

  return (
    <>

      <section>
        <div className="m-10">
          <div className="mockup-window border bg-base-200 p-10">
            <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl text-primary-500">
              Link Up
            </h2>
          </div>
        </div>

        <ListMatches matchesData={matchesData} addtoChatList={addtoChatList} />

        <div className="m-10 ">
          <div className="card  lg:card-side mt-4 shadow-xl">

            <ListChatUser userChats={userChats} currentChat={currentChat} idUserOnline={idUserOnline} />

            {userChats.length > 0 && (
              <div className="card-body bg-base-200">
                {currentChatId === null ? (
                  <NoSelectedChat />
                ) : loadingMsg ? (
                  <h1 className='text-center'><span className="loading loading-bars loading-md"></span></h1>
                ) : (
                  <ChatBox
                      chatBoxRef={chatBoxRef}
                      nameUserOnChat={nameUserOnChat}
                      message={message}
                      userProfile={userProfile}
                      formatterDate={formatterDate}
                      profilePictureUserOnChat={profilePictureUserOnChat}
                    />
                  )}
                  {currentChatId !== null ? (
                    <InputEmoji
                      type="text"
                      value={newTextMessage}
                      onEnter={sendMessage}
                      onChange={setNewTextMessage}
                    />
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </section>
    </>
  );
}

export default Matches