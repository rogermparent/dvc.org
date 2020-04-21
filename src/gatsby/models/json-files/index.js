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
          }
        },
        extensions: {
          infer: false
        }
      })
    ])
  },
  async onCreateNode({
    node,
    createNodeId,
    loadNodeContent,
    actions: { createNode }
  }) {
    if (node.internal.type !== 'File' || node.extension !== 'json') return null

    const parsedContent = JSON.parse(await loadNodeContent(node))
    return createNode({
      id: createNodeId(`${node.id} >>> JsonFile`),
      parent: node.id,
      content: parsedContent,
      children: [],
      internal: {
        type: `JsonFile`,
        contentDigest: node.internal.contentDigest
      }
    })
  }
}
