
// IMPORTS

// Base Libraries and Files
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import {animated, useSprings} from "react-spring"
import "bootstrap/dist/css/bootstrap.min.css";

// CSS
import './App.css';
import './components/ShadowMessage.css'

// Components
import ShadowMessage from './components/ShadowMessage';
import InputBox from './components/InputBox';
import LinkBox from './components/LinkBox'

// Animation State Definitions
const AnimationStates = {
  Idle: 0,
  Thinking: 1,
  Concerned: 2,
  RightBrowUp: 3,
  LeftBrowUp: 4,
  LookUpRight: 5,
  LookDownRight: 6,
  LookRight: 7,
  RaiseBrows: 8,
};

let lastAnimationState = AnimationStates.Idle;

function getRandomAnimationState() {
  const states = Object.values(AnimationStates);
  let state = states[Math.floor(Math.random() * states.length)];

  while (state === lastAnimationState) {
    state = states[Math.floor(Math.random() * states.length)];
  }
  
  lastAnimationState = state;
  return state;
}


function App() {


  const Verizy = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
      setAnimationState(state) {
        setState(state);
      }
    }));

    function RightEye(props) {
      return (<g {...props}>
        <circle
          cx="140.5"
          cy="202.5"
          r="32"
          fill="#fff"
          stroke="#000"
          strokeWidth="3"
        ></circle>
      </g>);
    }
    
    function RightPupil(props) {
      return (<g {...props}>
        <ellipse cx="140.5" cy="202.5" fill="#000" rx="21" ry="21"></ellipse>
      </g>);
    }
    
    function RightEyebrow(props) {
      return (<g {...props}>
        <path
          fill="#000"
          d="M185.883 177.001c.653-5.116-28.835-21.489-48.379-23.982-19.545-2.492-23.779 4.186-22.088 9.874 1.692 5.687 23.826 1.221 42.025 5.414 18.199 4.194 27.79 13.809 28.442 8.694z"
        ></path>
      </g>);
    }
    
    function LeftEye(props) {
      return (<g {...props}>
          <circle
            cx="54.5"
            cy="205.5"
            r="32"
            fill="#fff"
            stroke="#000"
            strokeWidth="3"
          ></circle>
      </g>);
    }
    
    function LeftPupil(props) {
      return (<g {...props}>
        <ellipse cx="55" cy="205.5" fill="#000" rx="21" ry="21"></ellipse>
      </g>);
    }
    
    function LeftEyebrow(props) {
      return (<g {...props}>
        <path
          fill="#000"
          d="M10.108 177.001c-.652-5.116 28.836-21.489 48.38-23.982 19.544-2.492 23.779 4.186 22.088 9.874-1.692 5.687-23.826 1.221-42.025 5.414-18.199 4.194-27.79 13.809-28.443 8.694z"
        ></path>
      </g>);
    }

    function BaseCheck(props) {
      return (<g {...props}>
        <path
          fill="#AB0801"
          stroke="#000"
          strokeWidth="3"
          d="M212.902 2.367L98.125 248.97l-45.137-96.734-.404-.866H2.65l.988 2.131 69.617 150.131.403.869h49.066l.403-.869 139.233-300 .989-2.131H213.306l-.404.867z"
        ></path>
      </g>)
    }

    function HighlightCheck(props) {
      return (<g {...props}>
        <path
          fill="#D42B1D"
          stroke="#000"
          d="M213.673 2.789L97.943 250.872 51.87 152.376l-.134-.288H25.216l.33.711 59.227 127.412.134.289h26.538l.134-.289 128.874-277 .331-.711h-26.976l-.135.289z"
        ></path>
      </g>)
    }

    function SetAnimationState(state) {
      setState(state);
    }

    function SetRandomAnimation() {
      setState(getRandomAnimationState());
    }

    // sets animation state to random every 2.5 seconds
    window.setInterval(SetRandomAnimation, 2500);

    const [animState, setState] = useState(AnimationStates.Idle);

    const svgEyes = [
      <RightEye key="righteye"/>,
      <LeftEye key="lefteye"/>,
    ];

    // Animation state handler for the whites in Verizy eyes
    const eyeSprings = useSprings(svgEyes.length, svgEyes.map((_, index) => {
      switch (animState) {
        case AnimationStates.Idle:
        return {
          to: {transform: 'translate3d(0px, 0px, 0px)'},
        };
        case AnimationStates.Thinking:
        return {
          to: {transform: 'translate3d(0px, 0px, 0px)'},
        };
        case AnimationStates.Concerned:
        return {
          to: {transform: 'translate3d(7px, 4px, 0px)'},
        };
        case AnimationStates.RightBrowUp:
        return {
          to: {transform: 'translate3d(0px, 3px, 0px)'},
        };
        case AnimationStates.LeftBrowUp:
        return {
          to: {transform: 'translate3d(0px, 3px, 0px)'},
        };
        case AnimationStates.LookUpRight:
        return {
          to: {transform: 'translate3d(5px, -10px, 0px)'},
        };
        case AnimationStates.LookDownRight:
        return {
          to: {transform: 'translate3d(5px, 10px, 0px)'},
        };
        case AnimationStates.LookRight:
        return {
          to: {transform: 'translate3d(10px, 0px, 0px)'},
        };
        case AnimationStates.RaiseBrows:
        return {
          to: {transform: 'translate3d(0px, 0px, 0px)'},
        }
      }
    }));
  
  // Apply animation to eyes
  const animatedEyes = eyeSprings.map((animatedStyle, index) => {
    return <animated.g key={index} style={{transformOrigin: 'center', transformBox: 'fill-box', ...animatedStyle}}>{svgEyes[index]}</animated.g>
  });

  const svgPupils = [
    <RightPupil key="rightpupil"/>,
    <LeftPupil key="leftpupil"/>,
  ]

  // Animation state handler for the pupils in Verizy eyes
  const pupilSprings = useSprings(svgPupils.length, svgPupils.map((obj, index) => {
    switch (animState) {
      case AnimationStates.Idle:
      return {
        to: {transform: 'translate3d(0px, 0px, 0px)'},
      };
      case AnimationStates.Thinking:
      return {
        to: {transform: 'translate3d(-5px, -5px, 0px)'},
      };
      case AnimationStates.Concerned:
      return {
        to: {transform: 'translate3d(10px, 0px, 0px)'},
      };
      case AnimationStates.RightBrowUp:
      return {
        to: {transform: 'translate3d(0px, 5px, 0px)'},
      };
      case AnimationStates.LeftBrowUp:
      return {
        to: {transform: 'translate3d(0px, 5px, 0px)'},
      };
      case AnimationStates.LookUpRight:
      return {
        to: {transform: 'translate3d(7px, -12px, 0px)'},
      };
      case AnimationStates.LookDownRight:
      return {
        to: {transform: 'translate3d(7px, 12px, 0px)'},
      };
      case AnimationStates.LookRight:
      return {
        to: {transform: 'translate3d(15px, 0px, 0px)'},
      };
      case AnimationStates.RaiseBrows:
      return {
        to: {transform: 'translate3d(0px, 0px, 0px)'},
      }
    }
  }));
  
  // Apply animation to eyeballs
  const animatedPupils = pupilSprings.map((animatedStyle, index) => {
    return <animated.g key={index} style={{transformOrigin: 'center', transformBox: 'fill-box', ...animatedStyle}}>{svgPupils[index]}</animated.g>
  });

  const svgEyebrows = [
    <RightEyebrow key="righteyebrow"/>,
    <LeftEyebrow key="lefteyebrow"/>,
  ]

  // Animation state handler for the Verizy eyebrows
  const eyebrowSprings = useSprings(svgEyebrows.length, svgEyebrows.map((obj, index) => {
    switch (animState) {
      case AnimationStates.Idle:
      return {
        to: {transform: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
      };
      case AnimationStates.Thinking:
      return {
        to: {transform: `translate3d(-10px, -10px, 0px) rotate(${(index == 0 ? 0 : 1) * -25}deg) `},
        delay: 150,
      };
      case AnimationStates.Concerned:
      return {
        to: {transform: `translate3d(${(index == 1 ? -1 : 1) * 5}px, -5px, 0px) rotate(${(index == 1 ? 1 : -1) * -10}deg)`},
        delay: 150,
      };
      case AnimationStates.RightBrowUp:
      return {
        to: {transform: `translate3d(0px, -10px, 0px) rotate(${(index == 1 ? 0 : 1) * 20}deg)`},
        delay: 150,
      };
      case AnimationStates.LeftBrowUp:
      return {
        to: {transform: `translate3d(0px, -10px, 0px) rotate(${(index == 1 ? 1 : 0) * -20}deg)`},
        delay: 150,
      };
      case AnimationStates.LookUpRight:
      return {
        to: {transform: `translate3d(5px, -10px, 0px) rotate(5deg)`},
        delay: 150,
      };
      case AnimationStates.LookDownRight:
      return {
        to: {transform: `translate3d(5px, 5px, 0px) rotate(5deg)`},
        delay: 150,
      };
      case AnimationStates.LookRight:
      return {
        to: {transform: 'translate3d(10px, 0px, 0px)  rotate(0deg)'},
        delay: 150,
      };
      case AnimationStates.RaiseBrows:
      return {
        to: {transform: 'translate3d(0px, -10px, 0px) rotate(0deg)'},
      }
    }
  }));

  // Apply animation to eyeballs
  const animatedEyebrows = eyebrowSprings.map((animatedStyle, index) => {
    return <animated.g key={index} style={{transformOrigin: 'center', transformBox: 'fill-box', ...animatedStyle}}>{svgEyebrows[index]}</animated.g>
  });

  const svgChecks = [
    <BaseCheck key="basecheck"/>,
    <HighlightCheck key="highlightcheck"/>,
  ]

  // Animation state handler for checks
  const checkSprings = useSprings(svgChecks.length, svgChecks.map((obj, index) => {
    switch (animState) {
      case AnimationStates.Idle:
      return {
        to: {transform: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
      };
      case AnimationStates.Thinking:
      return {
        to: {transform: `translate3d(0px, 0px, 0px) rotate(-5deg)`},
      };
      case AnimationStates.Concerned:
      return {
        to: {transform: `translate3d(0px, 0px, 0px) rotate(0deg)`},
      };
      case AnimationStates.RightBrowUp:
      return {
        to: {transform: `translate3d(0px, 0px, 0px) rotate(0deg)`},
      };
      case AnimationStates.LeftBrowUp:
      return {
        to: {transform: `translate3d(0px, 0px, 0px) rotate(0deg)`},
      };
      case AnimationStates.LookUpRight:
      return {
        to: {transform: `translate3d(0px, 0px, 0px) rotate(5deg)`},
      };
      case AnimationStates.LookDownRight:
      return {
        to: {transform: `translate3d(0px, 0px, 0px) rotate(-5deg)`},
      };
      case AnimationStates.LookRight:
      return {
        to: {transform: 'translate3d(10px, 0px, 0px)  rotate(0deg)'},
        delay: 150,
      };
      case AnimationStates.RaiseBrows:
      return {
        to: {transform: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
      }
    }
  }));

  // Apply animation to check
  const animatedChecks = checkSprings.map((animatedStyle, index) => {
    return <animated.g key={index} style={{transformOrigin: 'center', transformBox: 'fill-box', ...animatedStyle}}>{svgChecks[index]}</animated.g>
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="250"
      height="250"
      fill="none"
      viewBox="0 0 350 350"
    >
      {animatedChecks}
      {animatedEyes}
      {animatedPupils}
      {animatedEyebrows}
      
    </svg>
  );
  });

  // ref pointing to Verizy component for animation
  const verizyRef = useRef();



  // VERIZY CODE ENDS ******

  // Establishes the useState "list" that holds values
  const [recs,setRecs] = useState([]);
  const [messages, setMessages] = useState(
    [
    { sentBy: 'app', text:  "Hi, I'm Verizy! Verizon's personal chatbot assistant!" },  // Default starting messages
    { sentBy: 'app', text: "What are you looking for today?" },
    ]
  );
  
  var prev_message = 'test'
  const handleNewMessage = async (message) => {
    if(message.sentBy ==='app'){ //handles messages sent by the APP
    
    await setRecs([...message.recs])
    console.log("recs: " + message.recs)
    }
    //Handles messages sent by the APP and the USER.
    await setMessages([...messages,prev_message, message]);
    prev_message = message
    return 1
  };

  // Handles automatically scrolling down in chat
  const chatContainerRef = useRef(null);


  useEffect(() => {

    // Can be used to manually run VERIZY animation button:
    verizyRef.current.setAnimationState(getRandomAnimationState());

    // Scroll to the bottom of the chat container whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Trigger the scroll whenever messages change


  // Note: the useState magic in the "wrapper" div
  // InputBox calls the function handleNewMessage to add the new message

  return (
    <div>
      <div className="leftcol">
      <div className="chat-box">
        <div ref={chatContainerRef} className="wrapper">
          {messages.map((message, index) => (
            <ShadowMessage key={index} sentBy={message.sentBy} text={message.text} />
          ))}
        </div>

        <div className="input-box">
          <div className="move-verizy" >
            <Verizy ref={verizyRef}/>
          </div>
          <div classname="center">
            <InputBox handleNewMessage={handleNewMessage}/>
          </div>
        </div>
      </div>
      
        <div className="link-box">
        {recs.length > 0 && recs.map(rec => (
        <LinkBox text={rec.name} price={rec.price} desc={rec.description}/>
      ))}
      </div>
    </div>

    </div>
  );
}

export default App;
