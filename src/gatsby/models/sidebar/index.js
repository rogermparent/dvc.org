const { normalizeSidebar } = require('../../../utils/shared/sidebar')

async function createSidebarItem(api, args, parentNode) {
  // Passing a string as args is the same as an object with
  // the "slug" key set as that string.
  if (typeof args === 'string') {
    return createSidebarItem(api, { slug: args }, parentNode)
  }
  // From here, args is always an object.
  const {
    createNodeId,
    createContentDigest,
    actions: { createNode, createParentChildLink }
  } = api
  const { children, ...rest } = args
  const currentId = createNodeId(`${parentNode.id} >>> ${JSON.stringify(args)}`)

  const fields = {
    parent: parentNode.id,
    children: [],
    ...rest,
    source: rest.source || null
  }

  const currentNode = {
    id: currentId,
    ...fields,
    internal: {
      type: 'SidebarItem',
      contentDigest: createContentDigest(fields)
    }
  }

  // Make the current node, link it to the parent, then create children.
  await createNode(currentNode)
  await createParentChildLink({ child: currentNode, parent: parentNode })
  if (children)
    await Promise.all(
      children.map(child => createSidebarItem(api, child, currentNode))
    )
  return currentNode
}

module.exports = {
  async createSchemaCustomization({
    actions: { createTypes },
    schema: { buildObjectType }
  }) {
    createTypes([
      buildObjectType({
        name: 'Sidebar',
        interfaces: ['Node'],
        fields: {
          content: 'JSON',
          sourcePath: 'String!',
          childrenSidebarItem: '[SidebarItem]'
        },
        extensions: {
          infer: false
        }
      }),
      buildObjectType({
        name: 'SidebarItem',
        interfaces: ['Node'],
        fields: {
          source: 'String'
        },
        extensions: {
          childOf: {
            types: ['Sidebar']
          }
        }
      })
    ])
  },
  async onParseJsonFile(api, { content }) {
    const {
      node,
      createNodeId,
      actions: { createNode }
    } = api
    if (node.relativePath !== 'docs/sidebar.json') return null

    const normalizedContent = normalizeSidebar({
      data: content,
      parentPath: ''
    })

    const rootNodeId = createNodeId(`DVCSidebar >>> Root`)

    const rootNode = {
      id: rootNodeId,
      parent: node.id,
      sourcePath: node.relativePath,
      content: normalizedContent,
      children: [],
      internal: {
        type: `Sidebar`,
        // The sidebar root should change whenever sidebar.json does
        contentDigest: node.internal.contentDigest
      }
    }
    await createNode(rootNode)

    // Create all child nodes, with the first level having root as their parent.
    await Promise.all(
      normalizedContent.map(item => createSidebarItem(api, item, rootNode))
    )
  }
}
