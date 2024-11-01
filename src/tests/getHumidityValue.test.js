import { describe, it, expect } from 'vitest';
import { getHumidityValue } from '../helpers';

describe('getHumidityValue', () => {
  it('returns "Dry and comfortable" for humidity <= 55', () => {
    expect(getHumidityValue(50)).toBe('Dry and comfortable');
  });

  it('returns "A bit uncomfortable, sticky feeling" for humidity between 55 and 65', () => {
    expect(getHumidityValue(60)).toBe('A bit uncomfortable, sticky feeling');
  });

  it('returns "Lots of moisture, uncomfortable air" for humidity > 65', () => {
    expect(getHumidityValue(70)).toBe('Lots of moisture, uncomfortable air');
  });
});
