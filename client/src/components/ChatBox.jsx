import React from 'react'

const ChatBox = ({chatBoxRef, nameUserOnChat, message, userProfile, formatterDate, profilePictureUserOnChat }) => {
  return (
    <>
  <div className='chat-box bg-base-secondary border' ref={chatBoxRef}>
    <div className='chat-header bg-base-300 p-4'>
      <p className='text-base font-semibold text-center'>{nameUserOnChat}</p>
    </div>
    <div className='p-4 h-[370px] overflow-y-auto'>

      {message && message.map((msg, i) => (
        <div key={i} className={`chat flex items-start ${msg.SenderId === userProfile.id ? 'justify-end' : 'justify-start'} mb-4`}>
          <div className={`chat-image avatar w-10 rounded-full ${msg.SenderId === userProfile.id ? 'order-2' : 'order-1'}`}>
            <img className='hidden sm:block' src={msg.SenderId === userProfile.id ? userProfile.UserProfile.profilePicture : profilePictureUserOnChat} alt="User Avatar" />
          </div>
          <div className={`chat-bubble p-3 rounded-lg ${msg.SenderId === userProfile.id ? 'bg-base-content text-white' : 'bg-base-secondary text-base-content'}`}>
            {msg.content}
          </div>
          <div className={`chat-footer ml-2 text-sm opacity-50 ${msg.SenderId === userProfile.id ? 'order-1' : 'order-2'}`}>
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