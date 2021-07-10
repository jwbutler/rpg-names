const toTitleCase = (s: string) => {
  if (s.length === 0) {
    return s;
  }
  const [first, ...rest] = [...s];
  return `${first.toUpperCase()}${rest.join('')}`;
}

export { toTitleCase };
