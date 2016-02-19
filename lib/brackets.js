const BRACKETS     = ['⧙', '⧘'];
const PREFIX_REGEX = new RegExp(`^${BRACKETS[0]}.*?${BRACKETS[1]}`);

export const brackets = BRACKETS;

export function stripPrefix(text) {
  return text.replace(PREFIX_REGEX, '');
}

export function wrap(text) {
  return `${BRACKETS[0]}${text}${BRACKETS[1]}`;
}
