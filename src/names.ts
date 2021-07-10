import random from './random';
import { toTitleCase } from './string';
import {
  consonants,
  vowels,
  cleanup_shifts,
  isConsonant,
  isValidFinalConsonantPair,
  isValidInitialConsonantPair,
  isVowel,
  isVowelOrConsonant
} from './language';

const word_to_word_array = (word: string, cleanup_shifts: Record<string, string>) => {
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
      } else if (isVowelOrConsonant(cluster)) {
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
const generate_consonant_array = (num_consonants: number): string[] => {
  const consonant_array: string[] = [];
  for (let n = 0; n < num_consonants; n++) {
    consonant_array.push(random.choice(consonants));
  }
  return consonant_array;
}

const generate_vowel_patterns = (min_v: number, max_v: number) => {
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

const check_word_array = (phonemes: string[], consonants: string[]) => {
  if (consonants.includes(phonemes[0])) {
    if (consonants.includes(phonemes[1])) {
      if (consonants.includes(phonemes[2])) {
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

  const wordLength = phonemes.length;
  if (isConsonant(phonemes[wordLength - 1]) && isConsonant(phonemes[wordLength - 2])) {
    if (!isValidFinalConsonantPair(phonemes[wordLength - 2], phonemes[wordLength - 1])) {
      return false;
    }
  }

  for (let i = 0; i < phonemes.length - 2; i++) {
    if (isConsonant(phonemes[i]) && isConsonant(phonemes[i + 1]) && isConsonant(phonemes[i + 2])) {
      if (!isValidInitialConsonantPair(phonemes[i + 1], phonemes[i+2])) {
        return false;
      } else if ((i + 2) === wordLength - 1 && !isValidInitialConsonantPair(phonemes[i], phonemes[i+1])) {
        return false;
      }
    }
  }
  return true;
}

const generate_word_array = (vowel_patterns: string[][], num_consonants: number = 3): string[] => {
  const valid_vowel_patterns: string[][] = [];
  const root: string[] = generate_consonant_array(num_consonants);
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
    return generate_word_array(vowel_patterns); // zomg recursion
  }
}

const generate_word = (min_root_length: number, max_root_length: number) => {
  // Basically just a helper function for generate_word_array
  const vowel_patterns = generate_vowel_patterns(min_root_length, max_root_length);
  const word_array = generate_word_array(vowel_patterns);
  return toTitleCase(word_array.join(''));
}

/**
 * AKA Triconsonant + Suffix
 */
const generate_name_with_suffix = (suffixes: string[], min_root_length=1, max_root_length=2) => {
  const vowel_patterns = generate_vowel_patterns(min_root_length, max_root_length);
  const word_array = generate_word_array(vowel_patterns);
  const suffix = random.choice(suffixes);
  const suffix_array = word_to_word_array(suffix, cleanup_shifts);

  return toTitleCase(`${word_array.join('')}${suffix_array.join('')}`);
}

const female_name_suffixes = ['ea', 'ia', 'isa', 'ana', 'iana', 'ela', 'ika', 'ina']
const last_name_suffixes = ['az', 'ak', 'ar', 'ach', 'an', 'ev', 'og', 'ot', 'op', 'iz', 'it', 'im', 'ask']

const generateFullName = () => {
  const minRootLength = 1;
  const maxRootLength = 2;
  const first_name = generate_word(minRootLength, maxRootLength);
  const last_name = generate_name_with_suffix(last_name_suffixes);
  return `${first_name} ${last_name}`;
}

export { generateFullName };
