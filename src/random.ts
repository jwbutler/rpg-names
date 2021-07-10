// Polyfill for Python's random module

/**
 * @param max inclusive
 */
const randint = (min: number, max: number): number => {
  if (min > max) {
    throw 'Fuck';
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const choice = <T> (list: T[]): T => {
  if (list.length === 0) {
    throw 'Fuck';
  }
  const i = randint(0, list.length - 1);
  return list[i];
}

export default { randint, choice };
