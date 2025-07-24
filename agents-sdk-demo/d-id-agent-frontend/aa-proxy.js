import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const {
  AA_API_URL,
  AA_MODEL_NAME,
  AA_BOT_NAME,
  AA_TOKEN,
  PORT = 3001,
} = process.env;

const app = express();
app.use(express.json());

app.post('/api/aa-chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  try {
    const aaRes = await fetch(AA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AA_TOKEN}`,
      },
      body: JSON.stringify({
        model: AA_MODEL_NAME,
        bot: AA_BOT_NAME,
        message,
      }),
    });

    const data = await aaRes.json();
    if (!aaRes.ok) {
      return res.status(aaRes.status).json({ error: data });
    }

    const reply = data.reply || data.response || data.message || '';
    res.json({ reply });
  } catch (err) {
    console.error('Automation Anywhere API error:', err);
    res.status(500).json({ error: 'Failed to contact Automation Anywhere API' });
  }
});

app.listen(PORT, () => {
  console.log(`AA proxy listening on port ${PORT}`);
});
