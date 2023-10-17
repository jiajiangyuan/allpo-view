// 广度优先遍历

export function list(node) {
  let nodes = [];

  nodes.push(node);

  const children = node.children;
  if (children.length) {
    children.forEach((item) => list(item));
  }
  return nodes;
}

export function listRight(node) {
  let nodes = [];
  let queue = [];

  queue.push(node);

  while (queue.length) {
    const curNode = queue.pop();
    if (curNode == null) break;
    const children = curNode.children;
    Array.from(children)
      .reverse()
      .forEach((item) => queue.push(item));
  }

  return nodes;
}
