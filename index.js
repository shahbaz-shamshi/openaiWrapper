const express = require("express");
const axios = require("axios");
const bodyparser = require('body-parser');

const app = express();

app.listen(3000, aknowledgeListen);

function aknowledgeListen() {
  console.log("app is listen");
}

app.get("/openai", openai);

async function openai(req,res) {
  const topic = req.body;
//   const word = req.query.word;
     console.log(topic);
  const header = {
    Authorization: "Bearer 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",
    "Content-Type": "application/json",
  };

  const data = {
    model: "gpt-3.5-turbo",

    messages: [
      {
        role: "user",
        // content: `write a essay on ${topic}in ${word} word ?`,

        content:`${topic}`
      },
    ],
  };

  const url = "https://api.openai.com/v1/chat/completions";

  try {
    const result = await axios.post(url, data, { headers: header });
    res.send({
      status: 200,
      data: result.data.choices[0].message.content,
    });
  } catch (err) {
    console.log(err);
  }
}
