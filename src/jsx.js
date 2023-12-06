const svgNS = 'http://www.w3.org/2000/svg';

export const fragment = 'fragment';

/**
 * @typedef DOMTree
 * @property {string} tagName
 * @property {Record<string, string>} attribs
 * @property {...DOMTree[]} children
 */

/**
 * Create a DOM tree
 * @param {string} tagName 
 * @param {Record<string, string>} attribs 
 * @param  {...DomTree[]} children 
 * @returns {DOMTree} the DOM tree structure
 */
export function h(tagName, attribs, ...children) {
  return {
    tagName, attribs, children
  };
}

/**
 * Render tree structure
 * @param {Element} node 
 * @param {DOMTree} tree 
 */
export function renderTree(node, tree) {
  const namespace = tree.tagName === 'svg' ? svgNS : node.namespaceURI;
  let el;
  if (tree.tagName === fragment) {
    el = new DocumentFragment();
  } else {
    el = document.createElementNS(namespace, tree.tagName);
    for (const [attrib, value] of Object.entries(tree.attribs || {})) {
      el.setAttribute(attrib, value);
    }
  }
  for (const child of tree.children) {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
      continue;
    }
    renderTree(el instanceof DocumentFragment ? node : el, child);
  }

  node.appendChild(el);
}