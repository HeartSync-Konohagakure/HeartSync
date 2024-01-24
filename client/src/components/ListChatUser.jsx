import React from 'react'

const ListChatUser = ({ userChats, currentChat, idUserOnline }) => {
  return (
    <>
      <figure className='flex flex-col max-w-lg'>
        {userChats.map((chat, index) => (
          <div key={index} className="card  w-40 card-side shadow-xl">
            <div className="card-body bg-base-200 text-base-content">
              <span className='new-message-user m-3'></span>
              <button onClick={() => {
                currentChat(chat.id, chat.User.UserProfile.fullname, chat.User.UserProfile.profilePicture, chat.User.id)
              }} className='btn bg-base-100'>
                {chat.User.UserProfile.fullname}
              </button>
              {idUserOnline.some((onlineUser) => onlineUser.idUserOnline === chat.User.id) && (
                <span className='user-online mt-8 mx-4'></span>
              )}
            </div>
          </div>
        ))}
      </figure>
    </>

  )
}

export default ListChatUser