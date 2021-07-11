// Polyfill for Python's random module

/**
 * @param max inclusive
 */
const randint = (min: number, max: number): number => {
  if (min > max) {
    throw new Error(`Invalid parameters for random.randint: min must not be greater than max! (${min} > ${max})`);
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const choice = <T> (list: T[]): T => {
  if (list.length === 0) {
    throw new Error('Invalid parameters for random.choice(): Cannot pick from an empty list');
  }
  const i = randint(0, list.length - 1);
  return list[i];
}

const random = {
  choice,
  randint,
  random: Math.random
};

export default random;
