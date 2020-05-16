const {
  parentResolverPassthrough,
  parentPassthrough
} = require('gatsby-plugin-parent-resolvers')

module.exports = {
  body: {
    type: 'String!',
    resolve: parentResolverPassthrough()
  },
  mdxAST: {
    type: 'JSON!',
    resolve: parentResolverPassthrough()
  },
  html: {
    type: 'String!',
    resolve: parentResolverPassthrough()
  },
  timeToRead: {
    type: 'String!',
    resolve: parentResolverPassthrough()
  },
  template: 'String'
}
