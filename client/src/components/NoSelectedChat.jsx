import React from 'react';

const NoSelectedChat = () => {
  const backgroundStyle = {
    
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    textAlign: 'center',
  };

  const textContainerStyle = {
    border: '2px solid #ffffff', 
    padding: '10px', 
  };

  return (
    <>
      <div style={backgroundStyle}>
        <div style={textContainerStyle}>
          <p>Please select a chat to start chatting</p>
        </div>
      </div>
    </>
  );
};

export default NoSelectedChat;
