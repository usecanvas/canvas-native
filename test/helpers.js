export function trim(text) {
  const lines = text.split('\n');
  const white = lines[0].match(/^( *)/)[1].length;

  return lines
    .map(line => line.replace(new RegExp(`^ {${white}}`), ''))
    .join('\n');
}
