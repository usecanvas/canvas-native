import Scanner from '../scanner';

export function convert(native) {
  const json    = createGroup('canvas');
  const scanner = new Scanner(native);

  let currentNode = json;

  for (const [, current, ] of scanner) {
    const groupType = current.groupType;

    if (!nodeContainsLine(currentNode, current)) {
      if (groupType === 'canvas') {
        currentNode = json;
      } else {
        const newGroup = createGroup(groupType);
        json.content.push(newGroup);
        currentNode = newGroup;
      }
    }

    currentNode.content.push(current.toJSON());
  }

  return json;
}

function createGroup(type) {
  return {
    content: [],
    type   : type,
  };
}

function nodeContainsLine(node, line) {
  return node.type === line.groupType;
}
