import express, {type Request, type Response } from 'express';
import { validateCardNumber, getCardType } from './luhn.js';

const app = express();
app.use(express.json());

app.post('/validate-card', (req: Request, res: Response) => {
    let { cardNum } = req.body;
    if (!cardNum) {
        return res.status(400).json({ error: 'Card number is required' });
    }
    cardNum = cardNum.replace(/[\s-]+/g, ''); // Remove spaces and dashes
    if (!/^\d+$/.test(cardNum)) {
        return res.status(400).json({ error: 'Card number must contain only digits' });
    }
    if (cardNum.length < 13 || cardNum.length > 19) {
        return res.status(400).json({ error: 'Card number must be between 13 and 19 digits' });
    }
    const isValid = validateCardNumber(cardNum);
    const cardType = getCardType(cardNum);
    res.status(200).json({ valid: isValid, type: cardType });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});