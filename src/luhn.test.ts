import { describe, it, expect } from 'vitest';
import { validateCardNumber, getCardType } from './luhn.js';

describe('validateCardNumber', () => {
    // Valid card
    it('should return true for a valid card number',() => {
        const result = validateCardNumber('4532015112830366');
        expect(result).toBe(true);
    });

    // Invalid card
    it('should return false for an invalid card number',() => {
        const result = validateCardNumber('1234567890123456');
        expect(result).toBe(false);
    });

    // Doubling step
    it('correctly doubles digits at odd positions', () => {
        const result = validateCardNumber('18');
        expect(result).toBe(true);
    });

    // Subtract 9 step
    it('subtracts 9 from double digit that exceed 9', () => {
        const result = validateCardNumber('91');
        expect(result).toBe(true);
    });

    // Base case
    it('returns true for a single zero', () => {
        const result = validateCardNumber('0');
        expect(result).toBe(true);
    });

});

describe('getCardType', () => {
    it('should return Visa for card numbers starting with 4', () => {
        expect(getCardType('4532015112830366')).toBe('Visa');
    });
    it('should return MasterCard for card numbers starting with 51-55', () => {
        expect(getCardType('5425233430109903')).toBe('MasterCard');
    });
    it('should return Unknown for card numbers that do not match known patterns', () => {
        expect(getCardType('1234567890123456')).toBe('Unknown');
    });
});