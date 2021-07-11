import { isConsonant, isVowel } from './language';

// returns the consonants that can follow a consonant to form single-syllable blends.
const nextConsonantsInitial: Record<string, string[]> = {
  'b':  ['l', 'r', 'v', 'w', 'y', 'z', 'zh'],
  'ch': ['r', 'w', 'y'],
  'd':  ['j', 'r', 'v', 'w', 'y', 'z', 'zh'],
  'f':  ['l', 'n', 'r', 'w', 'y'],
  'g':  ['l', 'n', 'r', 'v', 'w', 'y', 'z', 'zh'],
  'gh': [],
  'h':  ['l', 'r', 'v', 'w', 'y'],
  'j':  ['r', 'w', 'y'],
  'k':  ['l', 'n', 'r', 's', 'sh', 'v', 'w', 'y'],
  'kh': ['l', 'n', 'r', 'v', 'w', 'y'],
  'l':  ['w', 'y'],
  'm':  ['y', 'w'],
  'n':  ['d', 'r', 'w', 'y', 'z'],
  'p':  ['l', 'r', 's', 'sh', 'w', 'y'],
  'r':  [],
  's':  ['k', 'l', 'm', 'n', 'p', 't', 'v', 'w', 'y'],
  'sh': ['k', 'l', 'm', 'n', 'p', 't', 'w', 'y'],
  't':  ['r', 's', 'sh', 'w', 'y'],
  'th': ['r', 'w'],
  'v':  ['l', 'r', 'w', 'y'],
  'w':  ['r'],
  'y':  [],
  'z':  ['l', 'm', 'r', 'v', 'w', 'y'],
  'zh': ['l', 'm', 'r', 'v', 'w', 'y']
}

const nextConsonantsFinal: Record<string, string[]> = {
  'b':  ['d', 'v', 'z', 'zh'],
  'ch': ['t'],
  'd':  ['z', 'zh'],
  'f':  ['s', 't'],
  'g':  ['z', 'zh'],
  'gh': ['z', 'zh'],
  'h':  [],
  'j':  [],
  'k':  ['s', 'sh', 't'],
  'kh': ['s', 't'],
  'l':  ['ch', 'd', 'f', 'g', 'gh', 'k', 'kh', 's', 'sh', 't', 'th', 'z', 'zh'],
  'm':  ['d', 'z', 'zh'],
  'n':  ['ch', 'd', 'g', 's', 'sh', 't', 'th', 'z', 'zh'],
  'p':  ['s', 'sh', 't'],
  'r':  ['ch', 'd', 'f', 'g', 'gh', 'k', 'kh', 's', 'sh', 't', 'th', 'z', 'zh'],
  's':  ['k', 'kh', 'p', 't'],
  'sh': ['k', 'kh', 'p', 't'],
  't':  ['s'],
  'th': ['k', 'p', 't'],
  'v':  ['d', 'z'],
  'w':  ['b', 'ch', 'd', 'f', 'g', 'j', 'k', 'l', 'p', 's', 'sh', 't', 'th', 'z', 'zh'],
  'y':  ['b', 'ch', 'd', 'f', 'g', 'j', 'k', 'l', 'p', 's', 'sh', 't', 'th', 'z', 'zh'],
  'z':  ['d', 'g', 't'],
  'zh': ['d', 'g', 't']
};

const isValidInitialConsonantPair = (first: string, second: string) => nextConsonantsInitial[first].includes(second);
const isValidFinalConsonantPair = (first: string, second: string) => nextConsonantsFinal[first].includes(second);

const validateInitialPhonemes = (phonemes: string[]): boolean => {
  if (isConsonant(phonemes[0])) {
    if (isConsonant(phonemes[1])) {
      if (!isValidInitialConsonantPair(phonemes[0], phonemes[1])) {
        return false;
      }
    }
  }
  return true;
}

const validateFinalPhonemes = (phonemes: string[]): boolean => {
  const lastIndex = phonemes.length - 1;
  if (isConsonant(phonemes[lastIndex - 1]) && isConsonant(phonemes[lastIndex])) {
    if (!isValidFinalConsonantPair(phonemes[lastIndex - 1], phonemes[lastIndex])) {
      return false;
    }
  }
  return true;
}

function validateTriconsonants(phonemes: string[]): boolean {
  const lastIndex = phonemes.length - 1;
  for (let i = 0; i <= lastIndex - 2; i++) {
    const [a, b, c] = phonemes.slice(i, i + 3);
    if (isConsonant(a) && isConsonant(b) && isConsonant(c)) {
      if (!isValidFinalConsonantPair(a, b)) {
        return false;
      }
      if (!isValidInitialConsonantPair(b, c)) {
        return false;
      }
    }
  }
  return true;
}

function validateMedials(phonemes: string[]): boolean {
  const lastIndex = phonemes.length - 1;
  for (let i = 0; i <= lastIndex - 2; i++) {
    const [a, b, c] = phonemes.slice(i, i + 3);
    if (isConsonant(a) && isConsonant(b) && isVowel(c)) {
      if (!isValidInitialConsonantPair(a, b)) {
        return false;
      }
    }
  }
  return true;
}

const validatePhonemes = (phonemes: string[]) => {
  if (!validateInitialPhonemes(phonemes)) return false;
  if (!validateFinalPhonemes(phonemes)) return false;
  if (!validateTriconsonants(phonemes)) return false;
  if (!validateMedials(phonemes)) return false;
  return true;
};

export {
  validatePhonemes,
  // the rest are only exported for tests
  validateInitialPhonemes,
  validateFinalPhonemes,
  validateTriconsonants,
  validateMedials,
};
