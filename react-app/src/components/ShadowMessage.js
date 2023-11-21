import React from 'react';
import './ShadowMessage.css'


const ShadowMessage = ({sentBy, text}) => {

    let color = (sentBy === "user") ? '#ffffff' : '#e94f4a';
    let marginLeft = (sentBy === "user") ? 'auto' : '0';
    let borderRadius = (sentBy === "user") ? '20px 20px 0px 20px': '20px 20px 20px 0'

  const MessageStyle = {

    backgroundColor: color,
    marginLeft: marginLeft,
    borderRadius: borderRadius,

    padding: "15px",
    width: "max-content",
    maxWidth: "calc(60% - 50px)",
    boxShadow: "0px 4px 4px #00000040",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "20px",
    
    wordBreak: 'break-word',  // Allow text to break between words
    overflowWrap: 'break-word',  // Allow text to wrap within words
    }

  return ( 
    <div style={MessageStyle}>
        {text}
    </div>
  );
};

export default ShadowMessage;