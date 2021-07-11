type Frequency = 'LOW' | 'MEDIUM' | 'HIGH';

const consonantFrequency = {
  'LOW':    1,
  'MEDIUM': 3,
  'HIGH':   9
}

const consonants: Record<string, Frequency> = {
  'b':  'MEDIUM',
  'ch': 'MEDIUM',
  'd':  'MEDIUM',
  'f':  'MEDIUM',
  'g':  'MEDIUM',
  'gh': 'LOW',
  'h':  'MEDIUM',
  'j':  'MEDIUM',
  'k':  'HIGH',
  'kh': 'LOW', // as in 'loCH'
  'l':  'HIGH',
  'm':  'HIGH',
  'n':  'HIGH',
  'p':  'MEDIUM',
  'r':  'HIGH',
  's':  'HIGH',
  'sh': 'MEDIUM',
  't':  'HIGH',
  'th': 'MEDIUM',
  'v':  'MEDIUM',
  'w':  'MEDIUM',
  'y':  'MEDIUM',
  'z':  'MEDIUM',
  'zh': 'LOW' // as in 'pleaSure'
};

const consonantFrequencyMap = Object.fromEntries(
  Object.entries(consonants)
    .map(([consonant, frequency]) => [consonant, consonantFrequency[frequency]])
);

const vowels = [
  'a', // as in 'bat'
  'e', // as in 'get'
  'i', // as in 'pit'
  'o', // as in 'pot'
  'u'  // as in 'put'
]

// returns the consonants that can follow a consonant to form single-syllable blends.
const nextConsonantsInitial: Record<string, string[]> = {
  'b':  ['l', 'r', 'v', 'w', 'y', 'z', 'zh'],
  'ch': ['r', 'w', 'y'],
  'd':  ['j', 'r', 'v', 'w', 'y', 'z', 'zh'],
  'f':  ['l', 'n', 'r', 'w', 'y'],
  'g':  ['l', 'n', 'r', 'v', 'w', 'y', 'z', 'zh'],
  'gh': ['l', 'n', 'r', 'v', 'w', 'y'],
  'h':  ['r', 'v', 'w', 'y'],
  'j':  ['r', 'w', 'y'],
  'k':  ['l', 'n', 'r', 's', 'sh', 'v', 'w', 'y'],
  'kh': ['l', 'n', 'r', 'v', 'w', 'y'],
  'l':  ['w', 'y'],
  'm':  ['l', 'n', 'r', 'y', 'w'],
  'n':  ['d', 'r', 'w', 'y', 'z'],
  'p':  ['l', 'r', 's', 'sh', 'w', 'y', 'z'],
  'r':  [],
  's':  ['k', 'l', 'm', 'n', 'p', 't', 'v', 'w', 'y'],
  'sh': ['k', 'l', 'm', 'n', 'p', 't', 'w', 'y'],
  't':  ['r', 's', 'sh', 'w', 'y'],
  'th': ['r', 'w'],
  'v':  ['l', 'r', 'w', 'y', 'z'],
  'w':  ['r'],
  'y':  [],
  'z':  ['b', 'd', 'g', 'j', 'k', 'l', 'm', 'r', 'v', 'w', 'y'],
  'zh': ['b', 'd', 'g', 'l', 'k', 'm', 'r', 'v', 'w', 'y']
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
  'v':  ['b', 'd', 'z'],
  'w':  ['b', 'ch', 'd', 'f', 'g', 'j', 'k', 'l', 'p', 's', 'sh', 't', 'th', 'z', 'zh'],
  'y':  ['b', 'ch', 'd', 'f', 'g', 'j', 'k', 'l', 'p', 's', 'sh', 't', 'th', 'z', 'zh'],
  'z':  ['d', 'g', 't'],
  'zh': ['d', 'g', 't']
};

const isConsonant = (phoneme: string) => Object.keys(consonants).includes(phoneme);

const isValidInitialConsonantPair = (first: string, second: string) => nextConsonantsInitial[first].includes(second);
const isValidFinalConsonantPair = (first: string, second: string) => nextConsonantsFinal[first].includes(second);

const randomConsonant = () => {
  const max = Object.values(consonantFrequencyMap).reduce((a, b) => a + b);
  let r = Math.random() * max;
  for (const [consonant, frequency] of Object.entries(consonantFrequencyMap)) {
    if (r < frequency) {
      return consonant;
    }
    r -= frequency;
  }

  throw new Error('fuck');
}

export {
  vowels,
  isConsonant,
  isValidInitialConsonantPair,
  isValidFinalConsonantPair,
  randomConsonant
};
