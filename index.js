const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const OPENAI_KEY = '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'; // Replace with your OpenAI API key

app.get('/', (req, res) => {
    res.send('Roblox AI Proxy is running! Use /chat for requests.');
});

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'No prompt provided' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_KEY}`
                }
            }
        );

        const answer = response.data.choices[0].message.content;
        res.json({ response: answer });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to get AI response' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
