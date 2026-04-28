import express, {type Request, type Response } from 'express';
import { validateCardNumber } from './index.js';

const app = express();
app.use(express.json());

app.post('/validate-card', (req: Request, res: Response) => {
    let { cardNum } = req.body;
    const isValid = validateCardNumber(cardNum);
    res.status(200).json({ valid: isValid });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});