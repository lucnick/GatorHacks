import React, { useState } from 'react';
import '../App.css';

const LinkBox = ({text, price, desc}) => {

    const MessageStyle = {
      borderRadius: "20px 20px",
      padding: "15px",
      backgroundColor: ('#e94f4a'),
      width: "20vw",
      maxWidth: "100%", 
      boxShadow: "0px 4px 4px #00000040",
      marginBottom: "2vh",
      marginLeft: "2vh",
      textAlign: 'center',
    }

    const verizonLink = "https://www.verizon.com/onesearch/search?q="+text.split(' ').join('+')+"&ES=shop&src=wireless"

    if(price === undefined){
      price = ""
    }

    if(desc === undefined){
      desc = ""
    }
  return (
    
    <div style={MessageStyle}>
      <h3>{text}</h3>
      <b>{"Pricing: "}</b>{price}
      <div><a href={verizonLink}>View on Verizon Website.</a></div>
    </div>
  );
};

export default LinkBox