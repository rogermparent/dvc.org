import React from 'react'
import { graphql } from 'gatsby'
import { Node } from 'unist'

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

  return (
    <>
      <SEO title={label} />
      <Documentation body={body} path={slug} headings={headings} />
    </>
  )
}

export default DocHomePage

export const pageQuery = graphql`
  query DocHomePage($id: String!) {
    page: docsPage(id: { eq: $id }) {
      body
    }
  }
`
