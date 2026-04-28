import { describe, it, expect } from 'vitest';
import { validateCardNumber } from './luhn.js';

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

})