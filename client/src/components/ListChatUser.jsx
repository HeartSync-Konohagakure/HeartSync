import React from 'react'
import { MdOutlineMarkChatUnread } from "react-icons/md";

const ListChatUser = ({ userChats, currentChat, idUserOnline }) => {
  return (
    <>
  <div className='flex flex-col max-w-lg'>
    {userChats.map((chat, index) => (
      <div key={index} className="card w-full mb-4 card-side shadow-xl">
        <div className="card-body flex items-center bg-base-200 text-base-content p-4">
          <span className='new-message-user mr-3'><MdOutlineMarkChatUnread /></span>
          <button
            onClick={() => currentChat(chat.id, chat.User.UserProfile.fullname, chat.User.UserProfile.profilePicture, chat.User.id)}
            className='btn bg-base-100 flex-grow'
          >
            {chat.User.UserProfile.fullname}
          </button>
          {idUserOnline.some((onlineUser) => onlineUser.idUserOnline === chat.User.id) && (
            <span className='user-online ml-4'></span>
          )}
        </div>
      </div>
    ))}
  </div>
</>

  )
}

export default ListChatUser