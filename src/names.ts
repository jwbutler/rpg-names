import random from './random';
import { toTitleCase } from './string';
import {
  vowels,
  isConsonant,
  isValidFinalConsonantPair,
  isValidInitialConsonantPair,
  randomConsonant
} from './language';

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
            patterns.push(pattern.filter(s => s !== null));
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

const checkWordArray = (phonemes: string[]) => {
  if (isConsonant(phonemes[0])) {
    if (isConsonant(phonemes[1])) {
      if (isConsonant(phonemes[2])) {
        if (!isValidInitialConsonantPair(phonemes[1], phonemes[2])) {
          return false;
        } else if (!isValidFinalConsonantPair(phonemes[0], phonemes[1])) {
          return false;
        }
      }
      if (!isValidInitialConsonantPair(phonemes[0], phonemes[1])) {
        return false;
      }
    }
  }

  const lastIndex = phonemes.length - 1;
  if (isConsonant(phonemes[lastIndex]) && isConsonant(phonemes[lastIndex - 1])) {
    if (!isValidFinalConsonantPair(phonemes[lastIndex - 1], phonemes[lastIndex])) {
      return false;
    }
  }

  for (let i = 0; i <= lastIndex - 2; i++) {
    if (isConsonant(phonemes[i]) && isConsonant(phonemes[i + 1]) && isConsonant(phonemes[i + 2])) {
      if (!isValidInitialConsonantPair(phonemes[i + 1], phonemes[i+2])) {
        return false;
      } else if ((i === lastIndex - 2) && !isValidInitialConsonantPair(phonemes[i], phonemes[i+1])) {
        return false;
      }
    }
  }
  return true;
};

const generateWordArray = (vowelPatterns: string[][], numConsonants: number = 3): string[] => {
  const validVowelPatterns: string[][] = [];
  const root: string[] = generateConsonantArray(numConsonants);
  for (let vowelPattern of vowelPatterns) {
    const wordArray = addVowels(root, vowelPattern);
    if (checkWordArray(wordArray)) {
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
