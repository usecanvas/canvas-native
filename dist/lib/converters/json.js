'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.convert = convert;

function convert(native) {
  var json = createGroup('canvas');

  var nodeStack = [json];
  var currentNode = nodeStack[nodeStack.length - 1];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    lineLoop: for (var _iterator = native[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;

      while (nodeStack.length >= 0) {
        if (nodeContainsLine(currentNode, line)) {
          appendLine(currentNode, line);
          continue lineLoop;
        }

        if (nodeContainsNestedLine(currentNode, line)) {
          var newNodes = appendGroupForLine(currentNode, line);
          nodeStack = nodeStack.concat(newNodes);
          currentNode = nodeStack[nodeStack.length - 1];
          appendLine(currentNode, line);
          continue lineLoop;
        }

        if (currentNode.type === 'canvas') {
          var newGroup = createGroupFromLine(line);
          json.content.push(newGroup);
          currentNode = newGroup;
          nodeStack.push(newGroup);
          appendLine(currentNode, line);
          continue lineLoop;
        }

        currentNode = nodeStack.pop() || json;
      }

      if (!nodeStack.length) {
        nodeStack = [json];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return json;
}

function appendGroupForLine(node, line) {
  var nodeLevel = getNodeLevel(node);
  var lineLevel = line.level;

  var currentNode = node;
  var nodeStack = [];

  var i = nodeLevel;
  while (i < lineLevel) {
    var group = createGroup(line.groupType);
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
    type: type
  };
}

function createGroupFromLine(line) {
  var group = createGroup(line.groupType);

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
  var sameType = node.type === line.groupType;

  if (line.isNesting) {
    return sameType && line.level === getNodeLevel(node);
  }

  return sameType;
}

function nodeContainsNestedLine(node, line) {
  var nodeLevel = getNodeLevel(node);

  if (!line.isNesting) {
    return false;
  }

  if (node.type !== 'canvas' && node.type !== line.groupType) {
    return false;
  }

  return nodeLevel < line.level;
}