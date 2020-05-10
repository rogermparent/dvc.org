const { imageWrapperClass } = require('gatsby-remark-images/constants')
const unified = require('unified')
const { convertHastToHtml } = require('./convertHast.js')
const { select, selectAll } = require('hast-util-select')
const remove = require('unist-util-remove')
const remark2rehype = require('remark-rehype')

const stripMDX = () => tree =>
  remove(tree, ['import', 'export', 'jsx', 'comment'])

const rootToAbsolute = siteUrl => tree => {
  selectAll('a', tree).forEach(node => {
    if (node.properties.href.startsWith('/')) {
      node.properties.href = siteUrl + node.properties.href
    }
  })
  selectAll('img', tree).forEach(node => {
    if (node.properties.src.startsWith('/')) {
      node.properties.src = siteUrl + node.properties.src
    }
  })
  return tree
}

/*
   All images processed by Gatsby to be responsive are "unwrapped" into
   their fallback 'img' nodes, as RSS doesn't work with the tricks that
   true HTML does.
*/
const unwrapImages = () => tree => {
  selectAll(`.${imageWrapperClass}`, tree).forEach(node => {
    // Set the fallback image as the wrapper's only child, and then
    // give that image the wrapper's original style.
    const fallbackImg = select('img', node)
    node.children = [
      {
        ...fallbackImg,
        properties: {
          ...fallbackImg.properties,
          style: 'max-width: 100%; margin: auto;'
        }
      }
    ]
  })
  return tree
}

function makeFeedHtml(mdxAST, siteUrl) {
  return convertHastToHtml(
    unified()
      .use(stripMDX)
      .use(remark2rehype)
      .use(unwrapImages)
      .use(rootToAbsolute, siteUrl)
      .runSync(mdxAST)
  )
}

module.exports = makeFeedHtml
