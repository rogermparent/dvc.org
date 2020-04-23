const { normalizeSidebar } = require('../../../utils/shared/sidebar')

module.exports = {
  async createSchemaCustomization({
    actions: { createTypes },
    schema: { buildObjectType }
  }) {
    createTypes([
      buildObjectType({
        name: 'JsonFile',
        interfaces: ['Node'],
        fields: {
          content: {
            type: 'JSON'
          },
          sourcePath: 'String!'
        },
        extensions: {
          infer: false
        }
      })
    ])
  },
  async onCreateNode(
    { node, createNodeId, loadNodeContent, actions: { createNode } },
    { models }
  ) {
    if (node.internal.type !== 'File' || node.extension !== 'json') return null

    let parsedContent = JSON.parse(await loadNodeContent(node))

    // Transform content for the sidebar specifically.
    if (node.relativePath === 'docs/sidebar.json') {
      parsedContent = normalizeSidebar({
        data: parsedContent,
        parentPath: ''
      })
    }

    return createNode({
      id: createNodeId(`${node.id} >>> JsonFile`),
      parent: node.id,
      sourcePath: node.relativePath,
      content: parsedContent,
      children: [],
      internal: {
        type: `JsonFile`,
        contentDigest: node.internal.contentDigest
      }
    })
  }
}
