const toHTML = require('hast-util-to-html')

module.exports = () => tree => {
  function dfs(node) {
    const jsxChildren = node.children ? node.children.filter(dfs) : []

    if (jsxChildren.length > 0 || node.type === 'root') {
      for (const child of node.children) {
        if (
          child.type === 'element' &&
          child.children.length > 0 &&
          !jsxChildren.includes(child)
        ) {
          // Use dangerouslySetInnerHTML to replace MDXTag
          const html = child.children.map(toHTML).join('')
          child.properties.dangerouslySetInnerHTML = { __html: html }
          child.children.splice(0, child.children.length)
        }
      }

      return true
    } else if (
      node.type === 'jsx' ||
      node.type === 'import' ||
      node.type === 'export'
    ) {
      return true
    }

    return false
  }

  dfs(tree)
  return tree
}
