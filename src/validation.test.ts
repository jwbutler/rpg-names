import { validateInitialPhonemes, validateMedials, validatePhonemes } from './validation';

it('rejects invalid initial consonant pairs', () => {
  expect(validateInitialPhonemes(['z', 'k', 'a', 'r'])).toEqual(false);
});

it('rejects invalid initial consonant pairs mid-word', () => {
  expect(validateMedials(['i', 'r', 'e', 's', 'z', 'u'])).toEqual(false);
});

export {};
