const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());

app.post("/generateResume", async (req, res) => {
  const { jobDescription, userExperience, userSkills } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo",  // Or the latest GPT model
        messages: [
          { role: "system", content: "You are a helpful resume assistant." },
          { role: "user", content: `Generate a resume based on the following job description: ${jobDescription}, and the user's experience: ${userExperience}. Include the skills: ${userSkills}` },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ resume: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating resume");
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
