const {
  parentResolverPassthrough,
  parentPassthrough
} = require('gatsby-plugin-parent-resolvers')

module.exports = {
  body: {
    type: 'String!',
    resolve: parentResolverPassthrough()
  },
  html: {
    type: 'String!',
    resolve: parentPassthrough()
  },
  timeToRead: {
    type: 'String!',
    resolve: parentResolverPassthrough()
  }
}
