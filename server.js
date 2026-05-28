require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

app.post("/chat", async (req, res) => {

    try {

        const completion =
        await client.chat.completions.create({

           model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "user",
                    content: req.body.message
                }
            ]

        });

        res.json({
            reply:
            completion.choices[0].message.content
        });

    } catch (error) {

        console.log(error);

        res.json({
            reply:
            "⚠️ AI error occurred"
        });

    }

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});