import { assert } from 'chai';

import trimString from '../core/helpers/trimString.js';


describe('trimString', () => {
  it('should remove vowels from a string', () => {
    const result = trimString('Hello World', /[aeiou]/ig);
    assert.strictEqual(result, 'hll wrld');
  });

  it('should return an empty string if input is an empty string', () => {
    const result = trimString('', /[aeiou]/ig);
    assert.strictEqual(result, '');
  });

  it('should handle non-string input gracefully', () => {
    const result = trimString(123, /[aeiou]/ig);
    assert.strictEqual(result, '123');
  });
});
