import random from './random';
import { toTitleCase } from './string';

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

const cleanup_shifts: Record<string, string> = {
  'dge': 'j',
  'ck':  'k',
  'ph':  'f',
  'qu':  'kw',
  'wh':  'w',
  'c':   'k',
  'x':   'ks'
};

const possible_shifts: Record<string, string[]> = {
  'a':  ['a', 'e', 'o'],
  'b':  ['b', 'p', 'm'],
  'ch': ['ch', 'j', 'sh', 'zh'],
  'd':  ['d', 't', 'th', 'n'],
  'e':  ['a', 'e', 'i'],
  'f':  ['f', 'p', 'th', 'v'],
  'g':  ['g', 'gh', 'h', 'kh', 'k'],
  'gh': ['g', 'gh', 'h', 'kh'],
  'h':  ['h', 'gh', 'kh', 'y', 'g'],
  'i':  ['i', 'e', 'u'],
  'j':  ['j', 'ch', 'sh', 'zh'],
  'k':  ['k', 'kh', 'g'],
  'kh': ['kh', 'g', 'gh', 'h', 'k'],
  'l':  ['l'],
  'm':  ['m', 'b'],
  'n':  ['n', 'd'],
  'o':  ['o', 'a', 'e'],
  'p':  ['p', 'b', 'f'],
  'r':  ['r'],
  's':  ['s', 'z'],
  'sh': ['sh', 'ch', 'j', 'zh'],
  't':  ['t', 'd', 'n', 'th'],
  'th': ['th', 'f', 't'],
  'u':  ['u', 'o'],
  'v':  ['v', 'f', 'w'],
  'w':  ['w', 'v'],
  'y':  ['y', 'g', 'h'],
  'z':  ['z', 's'],
  'zh': ['zh', 'ch', 'j', 'sh']
};

const shifts: Record<string, string> = {};
Object.keys(possible_shifts).forEach(key => {
  shifts[key] = random.choice(possible_shifts[key])
});

// returns the consonants that can follow a consonant to form single-syllable blends.
const next_consonants_initial: Record<string, string[]> = {
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

const next_consonants_final: Record<string, string[]> = {
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

const word_to_word_array = (word: string, consonants: string[], vowels: string[], cleanup_shifts: Record<string, string>) => {
  const word_array: string[] = [];
  let letter_index = 0;
  let length = word.length;
  while (letter_index < word.length) {
    while (letter_index + length - 1 < word.length) {
      const cluster = word.slice(letter_index, letter_index + length).toLowerCase();
      if (Object.keys(cleanup_shifts).includes(cluster)) {
        word_array.push(cleanup_shifts[cluster]);
        letter_index += length;
        length = word.length;
      } else if ([...consonants, vowels].includes(cluster)) {
        word_array.push(cluster);
        letter_index += length;
        length = word.length;
      } else if (length === 1) {
        word_array.push(cluster);
        letter_index += length;
        length = word.length;
      } else {
        length -= 1;
      }
    }
    length -= 1;
  }
  return word_array;
}

/**
 * Returns a length-3 array of consonant strings.
 */
const generate_consonant_array = (consonants: string[], num_consonants: number): string[] => {
  const consonant_array: string[] = [];
  for (let n = 0; n < num_consonants; n++) {
    consonant_array.push(random.choice(consonants));
  }
  return consonant_array;
}

const generate_vowel_patterns = (vowels: string[], min_v: number, max_v: number) => {
  const num_v = random.randint(min_v, max_v)
  const patterns: string[][] = []
  const vowelsOrEmpty = [...vowels, ''];
  vowelsOrEmpty.forEach(v_1 => {
    vowelsOrEmpty.forEach(v_2 => {
      vowelsOrEmpty.forEach(v_3 => {
        vowelsOrEmpty.forEach(v_4 => {
          let pattern = [v_1, 'C', v_2, 'C', v_3, 'C', v_4];
          const num_vowels = pattern.filter(s => s !== 'C' && s !== '').length;
          pattern = pattern.filter(s => s !== '');
          if (num_vowels === num_v) {
            patterns.push(pattern);
          }
        });
      });
    });
  });
  return patterns;
}

const add_vowels = (consonant_array: string[], vowel_pattern: string[]): string[] => {
  let consonant_index = 0;
  const word: string[] = [...vowel_pattern];
  for (let pattern_index = 0; pattern_index < vowel_pattern.length; pattern_index++) {
    if (word[pattern_index] === 'C') {
      word[pattern_index] = consonant_array[consonant_index];
      consonant_index += 1;
    }
  }
  return word;
}

const check_word_array = (word_array: string[], consonants: string[]) => {
  const word = word_array.join('');
  if (consonants.includes(word_array[0])) {
    if (consonants.includes(word_array[1])) {
      if (consonants.includes(word_array[2])) {
        if (!next_consonants_initial[word_array[1]].includes(word_array[2])) {
          // print word, 'bad initial cluster [experimental]'
          return false;
        } else if (!next_consonants_final[word_array[0]].includes(word_array[1])) {
          // print word, 'bad initial triphthong [experimental]'
          return false;
        }
      }
      if (!next_consonants_initial[word_array[0]].includes(word_array[1])) {
        // print word, 'bad initial cluster'
        return false;
      }
    }
  }

  if (consonants.includes(word_array[word_array.length - 1])) {
    if (consonants.includes(word_array[word_array.length - 2]) && !next_consonants_final[word_array[word_array.length - 2]].includes(word_array[word_array.length - 1])) {
      // print word, 'bad final cluster'
      return false;
    }
  }

  for (let i = 0; i < word_array.length - 2; i++) {
    if (consonants.includes(word_array[i])) {
      if (consonants.includes(word_array[i + 1]) && consonants.includes(word_array[i+2])) {
        if (!next_consonants_initial[word_array[i + 1]].includes(word_array[i+2])) {
          const cluster = word_array.slice(i, i + 3).join('');
          // print word, 'bad middle cluster', cluster
          return false;
        } else if ((i + 2) === word_array.length - 1 && !next_consonants_initial[word_array[i]].includes(word_array[i+1])) {
          const cluster = word_array.slice(i, i + 3).join('');
          // print word, 'bad final cluster [experimental]', cluster
          return false;
        }
      }
    }
  }
  return true;
}

const generate_word_array = (consonants: string[], vowels: string[], vowel_patterns: string[][], num_consonants: number = 3): string[] => {
  const valid_vowel_patterns: string[][] = [];
  const root: string[] = generate_consonant_array(consonants, num_consonants);
  for (let vp of vowel_patterns) {
    const word_array = add_vowels(root, vp);
    if (check_word_array(word_array, consonants)) {
      valid_vowel_patterns.push(vp);
    }
  }
  if (valid_vowel_patterns.length > 0) {
    const vowel_pattern = random.choice(valid_vowel_patterns);
    return add_vowels(root, vowel_pattern);
  } else {
    return generate_word_array(consonants, vowels, vowel_patterns); // zomg recursion
  }
}

const generate_word = (consonants: string[], vowels: string[], min_root_length: number = 1, max_root_length: number = 2) => {
  // Basically just a helper function for generate_word_array
  const vowel_patterns = generate_vowel_patterns(vowels, min_root_length, max_root_length);
  const word_array = generate_word_array(consonants, vowels, vowel_patterns);
  return toTitleCase(word_array.join(''));
}

/**
 * AKA Triconsonant + Suffix
 */
const generate_name_with_suffix = (consonants, vowels, suffixes: string[], min_root_length=1, max_root_length=2) => {
  const vowel_patterns = generate_vowel_patterns(vowels, min_root_length, max_root_length);
  const word_array = generate_word_array(consonants, vowels, vowel_patterns);
  const suffix = random.choice(suffixes);
  const suffix_array = word_to_word_array(suffix, consonants, vowels, cleanup_shifts);

  return toTitleCase(`${word_array.join('')}${suffix_array.join('')}`);
}

const female_name_suffixes = ['ea', 'ia', 'isa', 'ana', 'iana', 'ela', 'ika', 'ina']
const last_name_suffixes = ['az', 'ak', 'ar', 'ach', 'an', 'ev', 'og', 'ot', 'op', 'iz', 'it', 'im', 'ask']

const generateFullName = () => {
  const first_name = generate_word(consonants, vowels);
  const last_name = generate_name_with_suffix(consonants, vowels, last_name_suffixes);
  return `${first_name} ${last_name}`;
}

export { generateFullName };
