function validateCardNumber(cardNumber: string): boolean {
    let digits: number[] = cardNumber.split('').map(p => Number(p));
    // Reverse the digits
    digits.reverse();
    // Double digits on the odd position
    for (let i: number = 1; i < digits.length; i += 2) {
        digits[i]! *= 2;
    }
    // Subtract 9 from numbers over 9
    const adjusted: number[] = digits.map(value => value > 9 ? value - 9 : value);
    // Sum all the digits
    const sum: number = adjusted.reduce((acc, n) => acc + n, 0);
    return sum % 10 === 0;
}

export { validateCardNumber };
