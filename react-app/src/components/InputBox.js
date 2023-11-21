import React, { useState, useEffect} from 'react';
import axios from 'axios';

var userInput_real = ''
const InputBox = ({ handleNewMessage }) => {

    const [userInput, setUserInput] = useState('');
    const [terms, setTerms] = useState([]);

    useEffect(() => {
      userInput_real = userInput;
    }, [userInput]);

    // Handles when the user submits
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };
    
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        sendToBackend();
      }
    };

    const sendToBackend = async (keyTerm) => {
      let message_to_send = ''

      // Handles rendering user message immediately
      if(keyTerm != null){
        await handleNewMessage({
          sentBy: 'user',
          text: 'Tell me more about ' + keyTerm,
      });
      message_to_send = 'Tell me more about ' + keyTerm
      }else{  // When using the text input
        await handleNewMessage({
          sentBy: 'user',
          text: userInput,
      });
      message_to_send = userInput
      }
      

      axios.post('http://127.0.0.1:5000', {
      source: "react",
      message: message_to_send
  }).then (async response => {
    
    //Handles what the AI returns
      var message = JSON.parse(response.data.message.content).message //AI message.
      setTerms(JSON.parse(response.data.message.content).key_terms)
      
      // console.log("AI message:" + message)   For testing

      await handleNewMessage({
        sentBy: 'app',
        text: message,
        recs: JSON.parse(response.data.message.content).recommended_products,
        followups: JSON.parse(response.data.message.content).followup_questions,
        terms: JSON.parse(response.data.message.content).key_terms
    })
          
      });
      setUserInput('')  // Clears the previous input



    // SENDS TO BACKEND - Justin and Case LOOK HERE
    const backendUrl = 'http://localhost:5000'; // This should be the express port number

    axios.post(`${backendUrl}/endpoint`, { userInput })
      .then((response) => {
        console.log('Backend response:', response.data);    // used in testing, console in window
      })
      .catch((error) => {
        console.error('Error sending data to backend:', error); // should display the error in console if rendering fails
      });
    };


  // Making a pretty-looking input box

  const inputStyle = {
    backgroundColor: '#fffff',
    backgroundColor: 'white',
    border: '3px solid transparent',
    boxShadow: "0px 4px 4px #00000040",

    display: "flex",
    alignItems: "flex-start",
    position: 'fixed',

    marginLeft: '22vw',
    borderRadius: '10vw',
    padding: "2vh",
    width: "40vw",
    marginBottom: "1vw",
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'transparent',
    position: 'fixed',

    width: '5vw',
    height: '3.5vw',
    borderRadius: '20px',
    marginLeft: '56.4vw',
    marginTop: '0.1vw',
    fontSize: '30px', // font size for emoji
  }

  const keyTermStyle1 = {
    backgroundColor: 'white',
    border: '3px solid transparent',
    boxShadow: "0px 4px 4px #00000040",
    position: 'fixed',

    width: '12vw',
    height: '4vw',
    borderRadius: '20px',
    marginLeft: '22vw',
    marginBottom: '1vw'
  }

  const keyTermStyle2 = {
    backgroundColor: 'white',
    border: '3px solid transparent',
    boxShadow: "0px 4px 4px #00000040",
    position: 'fixed',

    width: '12vw',
    height: '4vw',
    borderRadius: '20px',
    marginLeft: '35vw',
    marginBottom: '1vw'
  }

  const keyTermStyle3 = {
    backgroundColor: 'white',
    border: '3px solid transparent',
    boxShadow: "0px 4px 4px #00000040",
    position: 'fixed',

    width: '12vw',
    height: '4vw',
    borderRadius: '20px',
    marginLeft: '48vw',
    marginBottom: '1vw'
  }


  return (
    <div>
    <div class="row">
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter here"
        style={inputStyle}
      />

      <button
      style={buttonStyle}
      className={"#fffff"} // send-button
      onClick={() => sendToBackend(userInput)}>
      🔍</button>

    </div>
      <br></br>
      <br></br>
      <br></br>
    
      <button // key term button 1
        style={keyTermStyle1}
        className={"#fffff"} // send-button
        onClick={async () => {
          sendToBackend(terms[0])
          console.log(terms[0])
        }
        }>
        {terms[0]}</button>
        <button // key term button 2
        style={keyTermStyle2}
        className={"#fffff"} // send-button
        onClick={async () => {
          sendToBackend(terms[1])
        }
        }>
        {terms[1]}</button>
      <button // key term button 3
        style={keyTermStyle3}
        className={"#fffff"} // send-button
        onClick={async () => {
          sendToBackend(terms[2])
        }
        }>
        {terms[2]}</button>
    </div>


  );
};

export default InputBox;