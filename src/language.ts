type Frequency = 'LOW' | 'MEDIUM' | 'HIGH';

const phonemeFrequency = {
  'LOW':    0.10,
  'MEDIUM': 0.30,
  'HIGH':   0.60
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
    .map(([consonant, frequency]) => [consonant, phonemeFrequency[frequency]])
);

const vowels = [
  'a', // as in 'bat'
  'e', // as in 'get'
  'i', // as in 'pit'
  'o', // as in 'pot'
  'u'  // as in 'put'
]

const isConsonant = (phoneme: string) => Object.keys(consonants).includes(phoneme);
const isVowel = (phoneme: string) => vowels.includes(phoneme);

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
  isVowel,
  randomConsonant
};
