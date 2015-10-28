import Scanner from '../scanner';

export default function format(native) {
  const result  = [];
  const scanner = new Scanner(native);

  for (const [prev, current, next] of scanner) {
    result.push(current.toMarkdown(prev, next));
  }

  return result.join('\n');
}