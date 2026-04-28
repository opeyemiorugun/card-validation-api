const cardNumber: string = "17893729974";

let digits: number[] = cardNumber.split('').map(p => Number(p));

// Reverse the digits
digits.reverse();
// Double digits on the odd position
for (let i: number = 1; i < digits.length; i+=2) {
    digits[i]! *= 2;
}
const digit: number[] = digits.map(value => value > 9 ? value - 9 : value);
let sum: number = 0;
for (const n of digit) {
    sum += n;
}
sum = sum % 10
if (sum === 0) {
    console.log("Valid");
}
else{
    console.log("Not Valid");
}
console.log(digits);
console.log(digit);
console.log(sum);