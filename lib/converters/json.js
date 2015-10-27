export function convert(native) {
  const json      = createGroup('canvas');

  let nodeStack   = [json];
  let currentNode = nodeStack[nodeStack.length - 1];

  lineLoop: for (const line of native) {
    while (nodeStack.length >= 0) {
      if (nodeContainsLine(currentNode, line)) {
        appendLine(currentNode, line);
        continue lineLoop;
      }

      if (nodeContainsNestedLine(currentNode, line)) {
        const newNodes = appendGroupForLine(currentNode, line);
        nodeStack = nodeStack.concat(newNodes);
        currentNode = nodeStack[nodeStack.length - 1];
        appendLine(currentNode, line);
        continue lineLoop;
      }

      if (currentNode.type === 'canvas') {
        const newGroup = createGroupFromLine(line);
        json.content.push(newGroup);
        currentNode = newGroup;
        nodeStack.push(newGroup);
        appendLine(currentNode, line);
        continue lineLoop;
      }

      nodeStack.pop();
      currentNode = nodeStack[nodeStack.length - 1] || json;
    }

    if (!nodeStack.length) {
      nodeStack = [json];
    }
  }

  return json;
}

function appendGroupForLine(node, line) {
  const nodeLevel = getNodeLevel(node);
  const lineLevel = line.level;

  let currentNode = node;
  const nodeStack = [];

  let i = nodeLevel;
  while (i < lineLevel) {
    const group = createGroup(line.groupType);
    group.meta = { level: i + 1 };
    nodeStack.push(group);
    currentNode.content.push(group);
    currentNode = group;
    i++;
  }

  return nodeStack;
}

function appendLine(node, line) {
  node.content.push(line.toJSON());
}

function createGroup(type) {
  return {
    content: [],
    type   : type,
  };
}

function createGroupFromLine(line) {
  const group = createGroup(line.groupType);

  if (line.isNesting) {
    group.meta = { level: line.level };
  }

  return group;
}

function getNodeLevel(node) {
  if (node.type === 'canvas') {
    return -1;
  }

  if (!node.meta || typeof node.meta.level !== 'number') {
    return Infinity;
  }

  return node.meta.level;
}

function nodeContainsLine(node, line) {
  const sameType = node.type === line.groupType;

  if (line.isNesting) {
    return sameType && line.level === getNodeLevel(node);
  }

  return sameType;
}

function nodeContainsNestedLine(node, line) {
  const nodeLevel = getNodeLevel(node);

  if (!line.isNesting) {
    return false;
  }

  if (node.type !== 'canvas' && node.type !== line.groupType) {
    return false;
  }

  return nodeLevel < line.level;
}
