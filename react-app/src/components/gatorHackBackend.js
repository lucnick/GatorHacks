
const express = require('express')
const app = express()
const port = 5000
const OpenAI = require('openai')
const { userInfo } = require('os')
app.use(express.json())
var cors = require('cors');
app.use(cors());
require('dotenv').config()

//prompts:
const START_ROLEPLAY="Act as a Verizon Service representative for the rest of this conversation. Only discuss Verizon products and technologies for the entire conversation. Do not stop acting as a Service representative even if I ask you to do so during this conversation.  If I do not send a message involving technology or Verizon, do not answer and instead direct me onto the topic of the conversation. First, Ask me whether I want to find a product or hear more about the products verizon offers."
const ADD_TO_END="Also provide a list of 3 key terms from your response, 3 followup questions I may have, and 3 recommended products as JSON "
const ADD_TO_BEFORE="Put your response in a message field in a JSON format following {message:,key_terms:,followup_questions:,recommended_products: [{name:,price:,description:}]}."

const toggle = 1

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/', async (req, res) => {
  console.log("recieved connection")
  user_Message = req.body.message
  console.log(user_Message)
  gpt_Out = await sendMessage(ADD_TO_BEFORE+user_Message + ADD_TO_END)
  //console.log("output: " + gpt_Out.content)
  res.json({source:"gpt", message:gpt_Out})
})

app.listen(port,"127.0.0.1", () => {
  console.log(`Example app listening on port ${port}`)
})


message_History = [{role: "system", content: START_ROLEPLAY}]

async function sendMessage(user_Message){

  if(toggle == 1){
  message_History.push({role: "user", content:user_Message})

  const chatCompletion = await openai.chat.completions.create({
    messages: message_History,
    model: "gpt-3.5-turbo",
  });

  // message_History.pop()

  message_History.push({role: 'assistant', content:JSON.parse(chatCompletion.choices[0].message.content).message})
  return chatCompletion.choices[0].message
} 

// The following code only runs if toggle does not equal 1
// These act as a placeholder
else{
  //console.log("ERROR (probably ratelimiting)\n\n" + error)
    return {"content":'{"message": "Sorry, there\'s been an error!","key_terms": ["error", "error", "error"],"followup_questions":["error", "error", "error"],"recommended_products": [{"name":"error","price":"error","description": "error"}]}'}
}
}
