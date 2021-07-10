import random from './random';

const consonants = [
  'b', 'ch', 'd',
  'f', 'g', 'gh', 'h', 'j', 'k',
  'kh', // as in 'loCH'
  'l', 'm', 'n', 'p', 'r', 's', 'sh', 't', 'th', 'v', 'w', 'y', 'z',
  'zh' // as in 'pleaSure'
];

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
  'n':  ['r'],
  'p':  ['l', 'r', 's', 'sh', 'w', 'y'],
  'r':  [],
  's':  ['l', 'm', 'n', 'p', 't', 'v', 'w', 'y'],
  'sh': ['l', 'm', 'n', 'p', 't', 'w', 'y'],
  't':  ['r', 's', 'sh', 'w', 'y'],
  'th': ['r', 'w'],
  'v':  ['l', 'r', 'w', 'y'],
  'w':  ['r'],
  'y':  [],
  'z':  ['d', 'g', 'l', 'm', 'r', 'v', 'y'],
  'zh': ['b', 'd', 'g', 'l', 'm', 'r', 'v', 'w']
}

const nextConsonantsFinal: Record<string, string[]> = {
  'b':  ['v', 'z', 'zh'],
  'ch': ['t'],
  'd':  ['z', 'zh'],
  'f':  ['s'],
  'g':  ['z', 'zh'],
  'gh': ['z', 'zh'],
  'h':  [],
  'j':  [],
  'k':  ['s', 'sh', 't'],
  'kh': ['s', 't'],
  'l':  ['d', 'g', 'gh', 'k', 'kh', 's', 'sh', 't', 'z', 'zh'],
  'm':  ['d', 'y', 'z', 'zh'],
  'n':  ['d', 'g', 's', 't', 'z', 'zh'],
  'p':  ['s', 't', 'sh'],
  'r':  ['d', 'g', 'gh', 'k', 'kh', 't', 's', 'sh', 'z', 'zh'],
  's':  ['k', 'kh', 'p', 't'],
  'sh': ['k', 'kh', 'p', 't'],
  't':  ['s'],
  'th': ['k', 'p', 't'],
  'v':  ['b', 'd', 'z'],
  'w':  ['b', 'd', 'f', 'g', 'j', 'k', 'p', 's', 'sh', 't', 'th', 'z', 'zh'],
  'y':  ['b', 'd', 'f', 'k', 'g', 'j', 's', 'sh', 't', 'th', 'z', 'zh'],
  'z':  ['d', 'g', 'gh'],
  'zh': ['d', 'g', 'gh']
};

const isConsonant = (phoneme: string) => consonants.includes(phoneme);

const isValidInitialConsonantPair = (first: string, second: string) => nextConsonantsInitial[first].includes(second);
const isValidFinalConsonantPair = (first: string, second: string) => nextConsonantsFinal[first].includes(second);

const randomConsonant = () => random.choice(consonants);

export {
  vowels,
  isConsonant,
  isValidInitialConsonantPair,
  isValidFinalConsonantPair,
  randomConsonant
};
