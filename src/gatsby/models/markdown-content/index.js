const runOnModels = require('../../utils/models')

/*
  Markdown Content Model.

  This is a special Model that handles any Markdown node that's transformed into
  a site page (for us, the Blog and Docs). When present, this Model will call
  all other Models with a function named "onCreateMarkdownContentNode" exposed.

  onCreateMarkdownContentNode is a modified version of onCreateNode, but it only
  runs on MarkdownRemark nodes that come from a gatsby-source-filesystem
  instance named "content" and also passes down the parent File node that it
  already had to fetch.

  To implement a Model that uses this Model, just export
  "onCreateMarkdownContentNode" where you would otherwise export "onCreateNode".
  You can access everything passed down by this Model through the third
  positional argument.

  On that same token, to add to this Model's logic in the future there's some
  simple patterns to follow:

  1. If you want to perform an action on all content pages regardless of type,
     just add the logic within the if statements used to filter nodes (I've
     marked it with a comment)

  2. If you want to pass data generated by the same code to all content pages
     but have the Model handle what is done with that data, get that data in the
     same place as pattern 1 and then pass it in the childApi object where any
     interested Models can then use that data in their
     "onCreateMarkdownContentNode" calls.

  3. 1 and 2 can be combined to perform an action and let the child know the
     action's result.
*/

/** onCreateMarkdownContentNode
  (api: Object<GatsbyAPI>, childApi: Object<MarkdownContentApi>)
  1. api: The whole Gatsby API from onCreateNode.
  2. childApi: An object containing data passed from the markdownContent model
     to child API calls. It takes the following shape:
     {
       models: Array<ModelDefinition>
         The received models passed through for if a child transformer wants to use them.
       parentNode: Object<GatsbyNode>
         The current node's parent node (almost certainly a File), since we already have it.
     }
*/

module.exports = {
  async onCreateNode(api, { models }) {
    const { node, getNode } = api
    if (node.internal.type === 'MarkdownRemark') {
      const parentNode = getNode(node.parent)
      const { sourceInstanceName } = parentNode
      // Only operate on MarkdownRemark nodes from the file instance named "content".
      if (sourceInstanceName === 'content') {
        // Do any actions to matching content nodes within this scope.

        // Any data that isn't the Gatsby API should be passed through this object.
        const markdownContentApi = {
          parentNode
        }

        // Run our custom API hook on all models.
        return runOnModels(
          models,
          'onCreateMarkdownContentNode',
          api,
          markdownContentApi
        )
      }
    }
    return null
  }
}
