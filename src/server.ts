import express, {type Request, type Response } from 'express';
import { validateCardNumber, getCardType } from './luhn.js';

const app = express();
app.use(express.json());

app.post('/validate-card', (req: Request, res: Response) => {
    let { cardNum } = req.body;
    if (!cardNum) {
        res.status(400).json({ error: 'Card number is required' });
        return;
    }
    if (typeof cardNum !== 'string') {
        res.status(400).json({ error: 'Card number must be a string' });
        return;
    }
    cardNum = cardNum.replace(/[\s-]+/g, ''); // Remove spaces and dashes
    if (!/^\d+$/.test(cardNum)) {
        res.status(400).json({ error: 'Card number must contain only digits' });
        return;
    }
    if (cardNum.length < 13 || cardNum.length > 19) {
        res.status(400).json({ error: 'Card number must be between 13 and 19 digits' });
        return;
    }
    const isValid = validateCardNumber(cardNum);
    const cardType = getCardType(cardNum);
    res.status(200).json({ valid: isValid, type: cardType });
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Card Validation API is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});