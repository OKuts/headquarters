import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
    res.json({ message: "Привіт з Node.js + TypeScript!" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Сервер: http://localhost:${PORT}`));