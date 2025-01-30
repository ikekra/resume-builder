app.post("/generate-resume", async (req, res) => {
  try {
    const { name, email, experience, skills } = req.body;

    const prompt = `
      Generate a professional resume for:
      - Name: ${name}
      - Email: ${email}
      - Work Experience: ${experience}
      - Skills: ${skills}
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );

    res.json({ resume: response.data.choices[0].message.content });
  } catch (error) {
    console.error("❌ OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error generating resume. Check server logs." });
  }
});
