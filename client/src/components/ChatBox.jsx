import React from 'react'

const ChatBox = ({chatBoxRef, nameUserOnChat, message, userProfile, formatterDate, profilePictureUserOnChat }) => {
  return (
    <>
      <div className='chat-box bg-base-secondary border' ref={chatBoxRef}>
        <div className='chat-header bg-base-300'>
          <p className='text-base text-center'>{nameUserOnChat}</p>
        </div>
        <div className='p-4  h-[570px]'>

          {message && message.map((msg, i) => (
            <div key={i} className={`chat ${msg.SenderId === userProfile.id ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img className='hidden sm:block' src={msg.SenderId === userProfile.id ? userProfile.UserProfile.profilePicture : profilePictureUserOnChat} />
                </div>
              </div>
              <div className="chat-bubble">{msg.content}</div>
              <div className="chat-footer opacity-50">
                {msg.SenderId === userProfile.id && (
                  <span>Delivered </span>
                )}
                {formatterDate(msg.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  )
}

export default ChatBox