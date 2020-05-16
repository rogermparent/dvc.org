import React from 'react'
import { graphql } from 'gatsby'
import { Node } from 'unist'
import { getItemByPath } from '../utils/shared/sidebar'

import SEO from '../components/SEO'

import Documentation from '../components/Documentation'

interface IDocHomePageProps {
  data: {
    page: {
      body: string
    }
  }
  pageContext: {
    slug: string
    headings: []
  }
}

const DocHomePage: React.FC<IDocHomePageProps> = ({
  data,
  pageContext: { slug, headings }
}) => {
  const {
    page: { body }
  } = data

  const { label } = getItemByPath(slug)

  return (
    <>
      <SEO title={label} />
      <Documentation body={body} path={slug} headings={headings} />
    </>
  )
}

export default DocHomePage

export const pageQuery = graphql`
  query DocPage($id: String!) {
    page: docsPage(id: { eq: $id }) {
      body
    }
  }
`
