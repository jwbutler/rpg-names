import random from './random';
import { toTitleCase } from './string';
import {
  vowels,
  randomConsonant,
} from './language';
import { validatePhonemes } from './validation';

const CONSONANT_PLACEHOLDER = 'C';

/**
 * Returns a length-3 array of consonant strings.
 */
const generateConsonantArray = (numConsonants: number): string[] => {
  const consonantArray: string[] = [];
  for (let i = 0; i < numConsonants; i++) {
    consonantArray.push(randomConsonant());
  }
  return consonantArray;
};

const generateVowelPatterns = (minVowels: number, maxVowels: number) => {
  const targetNumVowels = random.randint(minVowels, maxVowels)
  const patterns: string[][] = []
  const vowelsOrNull = [...vowels, null];
  for (const v1 of vowelsOrNull) {
    for (const v2 of vowelsOrNull) {
      for (const v3 of vowelsOrNull) {
        for (const v4 of vowelsOrNull) {
          const pattern = [v1, CONSONANT_PLACEHOLDER, v2, CONSONANT_PLACEHOLDER, v3, CONSONANT_PLACEHOLDER, v4];
          const numVowels = pattern.filter(s => s !== CONSONANT_PLACEHOLDER && s !== null).length;
          if (numVowels === targetNumVowels) {
            patterns.push(pattern.filter(s => s !== null) as string[]); // really typescript?
          }
        }
      }
    }
  }
  return patterns;
};

const addVowels = (consonantArray: string[], vowelPattern: string[]): string[] => {
  let consonantIndex = 0;
  const word: string[] = [...vowelPattern];
  for (let patternIndex = 0; patternIndex < vowelPattern.length; patternIndex++) {
    if (word[patternIndex] === CONSONANT_PLACEHOLDER) {
      word[patternIndex] = consonantArray[consonantIndex];
      consonantIndex += 1;
    }
  }
  return word;
};

const generateWordArray = (vowelPatterns: string[][], numConsonants: number = 3): string[] => {
  const validVowelPatterns: string[][] = [];
  const root: string[] = generateConsonantArray(numConsonants);
  for (let vowelPattern of vowelPatterns) {
    const wordArray = addVowels(root, vowelPattern);
    if (validatePhonemes(wordArray)) {
      validVowelPatterns.push(vowelPattern);
    }
  }
  if (validVowelPatterns.length > 0) {
    const vowelPattern = random.choice(validVowelPatterns);
    return addVowels(root, vowelPattern);
  } else {
    return generateWordArray(vowelPatterns); // zomg recursion
  }
};

const generateWord = (minRootLength: number, maxRootLength: number) => {
  const vowelPatterns = generateVowelPatterns(minRootLength, maxRootLength);
  const wordArray = generateWordArray(vowelPatterns);
  return toTitleCase(wordArray.join(''));
};

const generateFullName = () => {
  const firstName = generateWord(1, 3);
  const lastName = generateWord(2, 4);
  return `${firstName} ${lastName}`;
};

export { generateFullName };
